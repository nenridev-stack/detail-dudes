import { Resend } from 'resend';

const DEPOSIT_LABEL = process.env.DEPOSIT_AMOUNT_USD || '50';

// Lazy initialization to avoid env validation during client-side imports
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('Missing required environment variable: RESEND_API_KEY');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const BUSINESS_NAME = 'PrimeAura Detailing';
const BUSINESS_EMAIL = 'nenridev@gmail.com'; // Hardcoded until domain is verified on Resend
// Resend requires sending from a verified domain or onboarding@resend.dev for testing
const FROM_EMAIL = 'PrimeAura Detailing <onboarding@resend.dev>';

export interface BookingEmailData {
  vehicleSize: string;
  servicePackage: string;
  addOns: string[];
  estimatedPrice: number;
  preferredDate: string;
  timeSlot: string;
  contact: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    notes?: string;
  };
  photosCount: number;
  photoUrls?: string[];
}

interface EmailOptions {
  depositPaid?: boolean;
}

/**
 * Send booking confirmation to the CUSTOMER
 */
export async function sendBookingConfirmation(
  customerEmail: string,
  data: BookingEmailData,
  options: EmailOptions = {}
): Promise<void> {
  const resend = getResendClient();
  const { depositPaid = false } = options;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; font-weight: bold; margin: 0; color: #fff;">${BUSINESS_NAME}</h1>
        <p style="color: #999; font-size: 14px; margin-top: 8px;">Detallamiento Profesional de Autos</p>
      </div>
      
      <div style="background: ${depositPaid ? '#0f2a1a' : '#111'}; border: 1px solid ${depositPaid ? '#1a4a2e' : '#222'}; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
        <h2 style="font-size: 20px; color: ${depositPaid ? '#10b981' : '#3b82f6'}; margin: 0 0 10px;">${depositPaid ? 'Appointment Confirmed! ✓' : 'Booking Received ✓'}</h2>
        <p style="color: #999; font-size: 14px; margin: 0;">
          ${depositPaid
            ? `Thanks, ${data.contact.fullName}! Your $${DEPOSIT_LABEL} deposit was received. See you on <strong style="color:#fff;">${data.preferredDate}</strong> at <strong style="color:#fff;">${data.timeSlot}</strong>.`
            : `Thank you, ${data.contact.fullName}. We've received your booking request.`}
        </p>
      </div>

      <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
        <h3 style="font-size: 16px; color: #fff; margin: 0 0 16px; border-bottom: 1px solid #222; padding-bottom: 12px;">Booking Details</h3>
        <table style="width: 100%; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #999;">Vehicle:</td><td style="padding: 8px 0; color: #fff; text-align: right; text-transform: capitalize;">${data.vehicleSize}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Service:</td><td style="padding: 8px 0; color: #fff; text-align: right; text-transform: capitalize;">${data.servicePackage.replace(/-/g, ' ')}</td></tr>
          ${data.addOns.length > 0 ? `<tr><td style="padding: 8px 0; color: #999;">Add-ons:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.addOns.map(a => a.replace(/-/g, ' ')).join(', ')}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #999;">Date:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.preferredDate}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Time:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.timeSlot}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Service Address:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.contact.address}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Photos:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.photosCount} uploaded</td></tr>
          <tr style="border-top: 1px solid #222;"><td style="padding: 12px 0; color: #999; font-weight: bold;">Estimated Price:</td><td style="padding: 12px 0; color: #3b82f6; text-align: right; font-weight: bold; font-size: 18px;">$${data.estimatedPrice}</td></tr>
        </table>
      </div>

      <div style="background: #0c1a2e; border: 1px solid #1e3a5f; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="font-size: 14px; color: #3b82f6; margin: 0 0 8px;">What happens next?</h3>
        <ul style="color: #999; font-size: 13px; padding-left: 16px; margin: 0; line-height: 1.8;">
          ${depositPaid
            ? `<li>Your appointment is locked in for <strong style="color: #fff;">${data.preferredDate} at ${data.timeSlot}</strong></li>
               <li>We'll come to <strong style="color: #fff;">${data.contact.address}</strong></li>
               <li>Final price is confirmed on-site after inspection (deposit applied to total)</li>
               <li>Questions? Call/text <strong style="color: #fff;">${data.contact.phone}</strong>... we'll reach out if anything changes</li>`
            : `<li>We'll review your photos and vehicle details</li>
               <li>We'll call you at <strong style="color: #fff;">${data.contact.phone}</strong> to confirm final pricing</li>
               <li>Final price may vary based on vehicle condition</li>`}
        </ul>
      </div>

      ${data.contact.notes ? `
      <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="font-size: 14px; color: #999; margin: 0 0 8px;">Your Notes:</h3>
        <p style="color: #fff; font-size: 14px; margin: 0;">${data.contact.notes}</p>
      </div>` : ''}

      ${data.photoUrls && data.photoUrls.length > 0 ? `
      <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="font-size: 14px; color: #3b82f6; margin: 0 0 12px;">📷 Your Uploaded Photos (${data.photoUrls.length})</h3>
        <div>
          ${data.photoUrls.map((url, i) => `
            <a href="${url}" target="_blank" style="display: inline-block; margin: 4px; width: 100px; height: 75px; border-radius: 6px; overflow: hidden; border: 1px solid #333;">
              <img src="${url}" alt="Photo ${i + 1}" style="width: 100%; height: 100%; object-fit: cover;" />
            </a>
          `).join('')}
        </div>
      </div>` : ''}

      <div style="text-align: center; padding: 20px 0; border-top: 1px solid #222;">
        <p style="color: #666; font-size: 12px; margin: 0;">${BUSINESS_NAME}</p>
        <p style="color: #444; font-size: 11px; margin-top: 4px;">This is an automated confirmation. Do not reply to this email.</p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: customerEmail,
    subject: depositPaid
      ? `Appointment Confirmed for ${data.preferredDate} - ${BUSINESS_NAME}`
      : `Booking Received - ${BUSINESS_NAME}`,
    html,
  });

  if (error) {
    throw new Error(`Failed to send booking confirmation email: ${error.message}`);
  }
}

/**
 * Send booking notification to the BUSINESS OWNER
 */
export async function sendBookingNotificationToOwner(
  data: BookingEmailData,
  options: EmailOptions = {}
): Promise<void> {
  const resend = getResendClient();
  const { depositPaid = false } = options;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 24px; font-weight: bold; margin: 0; color: #fff;">🚗 ${depositPaid ? 'Paid Booking Confirmed!' : 'New Booking Received!'}</h1>
        <p style="color: #999; font-size: 14px; margin-top: 8px;">${BUSINESS_NAME}</p>
      </div>

      ${depositPaid ? `
      <div style="background: #0f2a1a; border: 1px solid #1a4a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
        <h2 style="font-size: 18px; color: #10b981; margin: 0;">✓ $${DEPOSIT_LABEL} Deposit Paid</h2>
        <p style="color: #999; font-size: 13px; margin-top: 6px;">This appointment is confirmed and locked in.</p>
      </div>` : ''}
      
      <div style="background: #0f2a1a; border: 1px solid #1a4a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px; text-align: center;">
        <h2 style="font-size: 18px; color: #10b981; margin: 0;">📞 ${depositPaid ? 'Customer Contact' : 'Call to Confirm'}</h2>
        <a href="tel:${data.contact.phone}" style="display: inline-block; margin-top: 12px; padding: 12px 24px; background: #10b981; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">${data.contact.phone}</a>
      </div>

      <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
        <h3 style="font-size: 16px; color: #fff; margin: 0 0 16px; border-bottom: 1px solid #222; padding-bottom: 12px;">Customer Info</h3>
        <table style="width: 100%; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #999;">Name:</td><td style="padding: 8px 0; color: #fff; text-align: right; font-weight: bold;">${data.contact.fullName}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Email:</td><td style="padding: 8px 0; color: #3b82f6; text-align: right;"><a href="mailto:${data.contact.email}" style="color: #3b82f6;">${data.contact.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Phone:</td><td style="padding: 8px 0; color: #fff; text-align: right;"><a href="tel:${data.contact.phone}" style="color: #10b981;">${data.contact.phone}</a></td></tr>
        </table>
      </div>

      <div style="background: #1a0f0a; border: 1px solid #4a2e1a; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="font-size: 14px; color: #f59e0b; margin: 0 0 8px;">📍 Service Location (Mobile Detailing)</h3>
        <p style="color: #fff; font-size: 15px; margin: 0; font-weight: bold;">${data.contact.address}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.contact.address)}" style="display: inline-block; margin-top: 10px; color: #3b82f6; font-size: 13px; text-decoration: underline;">Open in Google Maps →</a>
      </div>

      <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
        <h3 style="font-size: 16px; color: #fff; margin: 0 0 16px; border-bottom: 1px solid #222; padding-bottom: 12px;">Booking Details</h3>
        <table style="width: 100%; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #999;">Vehicle:</td><td style="padding: 8px 0; color: #fff; text-align: right; text-transform: capitalize;">${data.vehicleSize}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Service:</td><td style="padding: 8px 0; color: #fff; text-align: right; text-transform: capitalize;">${data.servicePackage.replace(/-/g, ' ')}</td></tr>
          ${data.addOns.length > 0 ? `<tr><td style="padding: 8px 0; color: #999;">Add-ons:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.addOns.map(a => a.replace(/-/g, ' ')).join(', ')}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #999;">Date:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.preferredDate}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Time:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.timeSlot}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Photos:</td><td style="padding: 8px 0; color: #fff; text-align: right;">${data.photosCount} uploaded</td></tr>
          <tr style="border-top: 1px solid #222;"><td style="padding: 12px 0; color: #999; font-weight: bold;">Estimated Price:</td><td style="padding: 12px 0; color: #3b82f6; text-align: right; font-weight: bold; font-size: 18px;">$${data.estimatedPrice}</td></tr>
        </table>
      </div>

      ${data.contact.notes ? `
      <div style="background: #1a1a0a; border: 1px solid #333300; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="font-size: 14px; color: #f59e0b; margin: 0 0 8px;">⚠️ Customer Notes:</h3>
        <p style="color: #fff; font-size: 14px; margin: 0;">${data.contact.notes}</p>
      </div>` : ''}

      ${data.photoUrls && data.photoUrls.length > 0 ? `
      <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
        <h3 style="font-size: 14px; color: #3b82f6; margin: 0 0 12px;">📷 Vehicle Photos (${data.photoUrls.length})</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.photoUrls.map((url, i) => `
            <a href="${url}" target="_blank" style="display: inline-block; width: 120px; height: 90px; border-radius: 8px; overflow: hidden; border: 1px solid #333;">
              <img src="${url}" alt="Photo ${i + 1}" style="width: 100%; height: 100%; object-fit: cover;" />
            </a>
          `).join('')}
        </div>
        <p style="color: #666; font-size: 11px; margin-top: 8px;">Click photos to view full size</p>
      </div>` : ''}

      <div style="text-align: center; padding: 20px 0; border-top: 1px solid #222;">
        <p style="color: #666; font-size: 12px; margin: 0;">Automated notification from ${BUSINESS_NAME} website</p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    subject: `${depositPaid ? '✓ PAID' : '🚗 New'} Booking: ${data.contact.fullName} - ${data.servicePackage.replace(/-/g, ' ')} ($${data.estimatedPrice})`,
    html,
  });

  if (error) {
    throw new Error(`Failed to send booking notification to owner: ${error.message}`);
  }
}

/**
 * Send contact form message to business
 */
export async function sendContactMessage(data: { name: string; email: string; subject: string; message: string }): Promise<void> {
  const resend = getResendClient();

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px 20px;">
      <h1 style="font-size: 20px; color: #fff; margin: 0 0 20px;">New Contact Message</h1>
      <div style="background: #111; border: 1px solid #222; border-radius: 12px; padding: 20px;">
        <p style="color: #999; margin: 0 0 4px; font-size: 12px;">From:</p>
        <p style="color: #fff; margin: 0 0 16px;">${data.name} (${data.email})</p>
        <p style="color: #999; margin: 0 0 4px; font-size: 12px;">Subject:</p>
        <p style="color: #fff; margin: 0 0 16px; font-weight: bold;">${data.subject}</p>
        <p style="color: #999; margin: 0 0 4px; font-size: 12px;">Message:</p>
        <p style="color: #fff; margin: 0; white-space: pre-wrap;">${data.message}</p>
      </div>
      <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">Reply directly to: <a href="mailto:${data.email}" style="color: #3b82f6;">${data.email}</a></p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: BUSINESS_EMAIL,
    reply_to: data.email,
    subject: `Contact: ${data.subject} - from ${data.name}`,
    html,
  });

  if (error) {
    throw new Error(`Failed to send contact message: ${error.message}`);
  }
}
