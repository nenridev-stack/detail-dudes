import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/validation';
import { forwardToWebhook } from '@/lib/webhook';
import { sendBookingConfirmation, sendBookingNotificationToOwner } from '@/lib/email';
import type { BookingEmailData } from '@/lib/email';
import { BUSINESS_INFO } from '@/lib/constants';
import type { BookingResponse } from '@/types';

/**
 * POST /api/booking
 *
 * Accepts a booking payload, validates it server-side with Zod,
 * attempts to forward to the n8n webhook, and sends confirmation emails.
 *
 * The webhook is optional — if it fails, booking still succeeds
 * (emails are sent and success is returned to the user).
 */
export async function POST(request: NextRequest) {
  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<BookingResponse>(
      {
        success: false,
        message: 'Invalid JSON in request body.',
      },
      { status: 400 }
    );
  }

  // Server-side Zod validation
  const result = bookingSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed. Please check your input.',
        errors: fieldErrors,
      },
      { status: 400 }
    );
  }

  const payload = result.data;

  // Forward to n8n webhook — non-blocking, failure doesn't prevent booking
  try {
    const webhookResult = await forwardToWebhook(payload);
    if (!webhookResult.success) {
      console.error('[Booking API] Webhook failed:', webhookResult.message);
    }
  } catch (webhookError) {
    console.error('[Booking API] Webhook error:', webhookError);
    // Continue — webhook failure should not block the booking
  }

  // Build email data
  const emailData: BookingEmailData = {
    vehicleSize: payload.vehicleSize,
    servicePackage: payload.servicePackage,
    addOns: payload.addOns,
    estimatedPrice: payload.estimatedPrice,
    preferredDate: payload.preferredDate,
    timeSlot: payload.timeSlot,
    contact: payload.contact,
    photosCount: payload.photos.length,
  };

  // Send both emails — if one fails, still attempt the other
  try {
    await sendBookingConfirmation(payload.contact.email, emailData);
  } catch (emailError) {
    console.error('[Booking API] Failed to send customer confirmation email:', emailError);
  }

  try {
    await sendBookingNotificationToOwner(emailData);
  } catch (emailError) {
    console.error('[Booking API] Failed to send owner notification email:', emailError);
  }

  // Always return success — the booking is received
  return NextResponse.json<BookingResponse>(
    {
      success: true,
      message:
        "We've received your booking request! We'll review your details and call to confirm pricing within 24 hours.",
    },
    { status: 200 }
  );
}
