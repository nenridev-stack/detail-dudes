import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/validation';
import { getStripeClient, DEPOSIT_AMOUNT_USD } from '@/lib/stripe';
import { BUSINESS_INFO } from '@/lib/constants';

/**
 * POST /api/create-checkout-session
 *
 * Validates the booking payload, creates a Stripe Checkout Session.
 * All booking data (including Cloudinary photo URLs) is stored in Stripe metadata.
 * The actual save to sheets/calendar/email happens ONLY after payment confirms
 * (in the stripe-webhook route).
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON in request body.' },
      { status: 400 }
    );
  }

  const result = bookingSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    return NextResponse.json(
      { success: false, message: 'Validation failed.', errors: fieldErrors },
      { status: 400 }
    );
  }

  const payload = result.data;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  console.log('[Checkout] Photos received:', payload.photos.length, 'URLs');

  try {
    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${BUSINESS_INFO.name} — Booking Deposit`,
              description:
                'Depósito reembolsable para confirmar tu cita. El precio final se confirma después de la inspección del vehículo.',
            },
            unit_amount: DEPOSIT_AMOUNT_USD * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        vehicleSize: payload.vehicleSize,
        servicePackage: payload.servicePackage,
        addOns: payload.addOns.join(','),
        estimatedPrice: String(payload.estimatedPrice),
        preferredDate: payload.preferredDate,
        timeSlot: payload.timeSlot,
        photosCount: String(payload.photos.length),
        photoUrl1: payload.photos[0] || '',
        photoUrl2: payload.photos[1] || '',
        photoUrl3: payload.photos[2] || '',
        photoUrl4: payload.photos[3] || '',
        photoUrl5: payload.photos[4] || '',
        fullName: payload.contact.fullName,
        email: payload.contact.email,
        phone: payload.contact.phone,
        address: payload.contact.address.slice(0, 300),
        notes: (payload.contact.notes || '').slice(0, 400),
      },
      customer_email: payload.contact.email,
      success_url: `${appUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/book`,
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    console.error('[Stripe] Failed to create checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        message: `No se pudo iniciar el pago: ${errorMessage}. Por favor intenta de nuevo o contáctanos directamente.`,
        fallbackContact: {
          phone: BUSINESS_INFO.phone,
          email: BUSINESS_INFO.email,
        },
      },
      { status: 503 }
    );
  }
}
