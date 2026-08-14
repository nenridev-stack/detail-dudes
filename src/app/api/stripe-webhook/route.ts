import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { sendBookingConfirmation, sendBookingNotificationToOwner } from '@/lib/email';
import type { BookingEmailData } from '@/lib/email';
import { forwardToWebhook } from '@/lib/webhook';
import { createCalendarEvent } from '@/lib/googleCalendar';
import { appendBookingToSheet } from '@/lib/googleSheets';
import type Stripe from 'stripe';

/**
 * POST /api/stripe-webhook
 *
 * Stripe calls this ONLY after successful payment.
 * This is the ONLY place where booking data gets saved to:
 *   1. Google Sheets (with photo URLs + ✓ PAID status)
 *   2. Google Calendar (with photo URLs in description)
 *   3. Owner notification email (with photo thumbnails)
 *   4. Customer confirmation email (with photo thumbnails)
 *
 * Nothing saves before payment — no duplicates, no "Pending" rows.
 */
export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get('stripe-signature');

  if (!webhookSecret || !signature) {
    console.error('[Stripe Webhook] Missing webhook secret or signature header');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (session.payment_status !== 'paid') {
    console.warn('[Stripe Webhook] Session completed but not paid:', session.id);
    return NextResponse.json({ received: true });
  }

  const meta = session.metadata;
  if (!meta) {
    console.error('[Stripe Webhook] Session missing metadata:', session.id);
    return NextResponse.json({ received: true });
  }

  // Extract photo URLs from individual metadata keys
  const photoUrls = [
    meta.photoUrl1,
    meta.photoUrl2,
    meta.photoUrl3,
    meta.photoUrl4,
    meta.photoUrl5,
  ].filter((url): url is string => !!url && url.length > 0);

  console.log('[Stripe Webhook] Payment confirmed. Photo URLs:', photoUrls);

  const emailData: BookingEmailData = {
    vehicleSize: meta.vehicleSize,
    servicePackage: meta.servicePackage,
    addOns: meta.addOns ? meta.addOns.split(',').filter(Boolean) : [],
    estimatedPrice: Number(meta.estimatedPrice) || 0,
    preferredDate: meta.preferredDate,
    timeSlot: meta.timeSlot,
    photosCount: Number(meta.photosCount) || 0,
    photoUrls,
    contact: {
      fullName: meta.fullName,
      email: meta.email,
      phone: meta.phone,
      address: meta.address,
      notes: meta.notes || undefined,
    },
  };

  // 1. Google Calendar
  try {
    await createCalendarEvent(emailData);
    console.log('[Stripe Webhook] Calendar event created');
  } catch (error) {
    console.error('[Stripe Webhook] Calendar failed:', error);
  }

  // 2. Google Sheets (✓ PAID since payment is confirmed)
  try {
    await appendBookingToSheet(emailData, {
      depositPaid: true,
      stripeSessionId: session.id,
    });
    console.log('[Stripe Webhook] Sheet row appended');
  } catch (error) {
    console.error('[Stripe Webhook] Sheets failed:', error);
  }

  // 3. Owner notification email
  try {
    await sendBookingNotificationToOwner(emailData, { depositPaid: true });
    console.log('[Stripe Webhook] Owner email sent');
  } catch (error) {
    console.error('[Stripe Webhook] Owner email failed:', error);
  }

  // 4. Customer confirmation email
  try {
    await sendBookingConfirmation(meta.email, emailData, { depositPaid: true });
    console.log('[Stripe Webhook] Customer email sent');
  } catch (error) {
    console.error('[Stripe Webhook] Customer email failed:', error);
  }

  // 5. Optional n8n webhook
  try {
    await forwardToWebhook({
      ...emailData,
      depositPaid: true,
      stripeSessionId: session.id,
      amountPaidUsd: (session.amount_total || 0) / 100,
    });
  } catch (error) {
    console.error('[Stripe Webhook] n8n forward failed:', error);
  }

  return NextResponse.json({ received: true });
}
