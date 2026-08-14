import { google } from 'googleapis';
import { getGoogleAuth } from './google-auth';
import type { BookingEmailData } from './email';

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '13GDCFGXYdeOb8l1gZkwXpiko2Kb8BpLhh0VJISWVhD4';

/**
 * Appends a booking row to the Google Sheet.
 * Automatically adds headers if Row 1 is empty.
 * Columns: Timestamp | Name | Email | Phone | Address | Vehicle | Service | Add-ons | Price | Date | Time | Photos | Notes | Payment Status | Stripe Ref
 */
export async function appendBookingToSheet(
  data: BookingEmailData,
  options: { depositPaid?: boolean; stripeSessionId?: string } = {}
): Promise<void> {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Check if headers exist, add them if not
    try {
      const existing = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1:O1',
      });

      if (!existing.data.values || existing.data.values.length === 0 || !existing.data.values[0][0]) {
        const headers = [
          'Timestamp', 'Name', 'Email', 'Phone', 'Address',
          'Vehicle', 'Service', 'Add-ons', 'Price', 'Date',
          'Time', 'Photos', 'Notes', 'Payment Status', 'Stripe Ref',
        ];

        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: 'Sheet1!A1:O1',
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [headers] },
        });
        console.log('[Google Sheets] Headers added to row 1');
      }
    } catch (headerError) {
      console.error('[Google Sheets] Could not check/add headers:', headerError);
    }

    // Build photos cell: count + Cloudinary URLs (one per line)
    const photosCell = data.photoUrls && data.photoUrls.length > 0
      ? `${data.photosCount} uploaded\n${data.photoUrls.join('\n')}`
      : String(data.photosCount);

    const row = [
      new Date().toISOString(),
      data.contact.fullName,
      data.contact.email,
      data.contact.phone,
      data.contact.address || '',
      data.vehicleSize,
      data.servicePackage.replace(/-/g, ' '),
      data.addOns.map(a => a.replace(/-/g, ' ')).join(', ') || 'None',
      `$${data.estimatedPrice}`,
      data.preferredDate,
      data.timeSlot,
      photosCell,
      data.contact.notes || '',
      options.depositPaid ? '✓ PAID' : 'Pending',
      options.stripeSessionId || '',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:O',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

    console.log('[Google Sheets] Booking row appended successfully');
  } catch (error) {
    console.error('[Google Sheets] Failed to append booking row:', error);
  }
}

/**
 * Initializes the sheet with headers if it's empty.
 * Call this once manually or on first deployment.
 */
export async function initializeSheetHeaders(): Promise<void> {
  try {
    const auth = getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Check if headers already exist
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1:O1',
    });

    if (existing.data.values && existing.data.values.length > 0) {
      return; // Headers already exist
    }

    const headers = [
      'Timestamp', 'Name', 'Email', 'Phone', 'Address',
      'Vehicle', 'Service', 'Add-ons', 'Price', 'Date',
      'Time', 'Photos', 'Notes', 'Payment Status', 'Stripe Ref',
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1:O1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [headers],
      },
    });

    console.log('[Google Sheets] Headers initialized');
  } catch (error) {
    console.error('[Google Sheets] Failed to initialize headers:', error);
  }
}
