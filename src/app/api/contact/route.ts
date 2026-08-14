import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { sendContactMessage } from '@/lib/email';
import { BUSINESS_INFO } from '@/lib/constants';

/**
 * POST /api/contact
 *
 * Accepts a contact form submission, validates it server-side with Zod,
 * then sends the message to the business email via Resend.
 *
 * Error handling:
 * - Invalid payload → 400 with field errors
 * - Email send failure → 500 with fallback contact info
 * - Success → 200 with confirmation message
 */
export async function POST(request: NextRequest) {
  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid JSON in request body.',
      },
      { status: 400 }
    );
  }

  // Server-side Zod validation
  const result = contactFormSchema.safeParse(body);

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

  const formData = result.data;

  // Send message via Resend to business email
  try {
    await sendContactMessage(formData);
  } catch (error) {
    console.error('[Contact API] Failed to send contact message:', error);
    return NextResponse.json(
      {
        success: false,
        message:
          'We were unable to send your message at this time. Please try again or contact us directly.',
        fallbackContact: {
          phone: BUSINESS_INFO.phone,
          email: BUSINESS_INFO.email,
        },
      },
      { status: 500 }
    );
  }

  // Success response
  return NextResponse.json(
    {
      success: true,
      message:
        "Thank you for reaching out! We've received your message and will get back to you within 24 hours.",
    },
    { status: 200 }
  );
}
