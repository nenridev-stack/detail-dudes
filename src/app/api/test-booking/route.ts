import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmation, sendBookingNotificationToOwner } from '@/lib/email';
import type { BookingEmailData } from '@/lib/email';
import { createCalendarEvent } from '@/lib/googleCalendar';
import { appendBookingToSheet } from '@/lib/googleSheets';

/**
 * POST /api/test-booking
 *
 * TEST ONLY — simulates what the Stripe webhook does after payment.
 * Directly processes a booking: creates calendar event, appends to sheets,
 * sends emails. Use this to test the full flow without Stripe.
 *
 * DELETE THIS ROUTE BEFORE GOING TO PRODUCTION.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const emailData: BookingEmailData = {
      vehicleSize: body.vehicleSize || 'sedan',
      servicePackage: body.servicePackage || 'basic-wash',
      addOns: body.addOns || [],
      estimatedPrice: body.estimatedPrice || 49,
      preferredDate: body.preferredDate || '2026-08-01',
      timeSlot: body.timeSlot || 'morning',
      photosCount: body.photoUrls?.length || 0,
      photoUrls: body.photoUrls || [],
      contact: body.contact || {
        fullName: 'Test Customer',
        email: 'test@test.com',
        phone: '(555) 123-4567',
        address: '123 Test St, Texas',
      },
    };

    console.log('\n========================================');
    console.log('[TEST BOOKING] Processing with data:');
    console.log('  photoUrls:', emailData.photoUrls);
    console.log('  photosCount:', emailData.photosCount);
    console.log('  timeSlot:', emailData.timeSlot);
    console.log('  preferredDate:', emailData.preferredDate);
    console.log('========================================\n');

    const results: Record<string, string> = {};

    // 1. Google Calendar
    try {
      const eventId = await createCalendarEvent(emailData);
      results.calendar = eventId ? `✓ Event created: ${eventId}` : '✗ No event ID returned';
      console.log('[TEST] Calendar:', results.calendar);
    } catch (error) {
      results.calendar = `✗ Error: ${error instanceof Error ? error.message : 'Unknown'}`;
      console.error('[TEST] Calendar error:', error);
    }

    // 2. Google Sheets
    try {
      await appendBookingToSheet(emailData, { depositPaid: true, stripeSessionId: 'TEST_SESSION' });
      results.sheets = '✓ Row appended';
      console.log('[TEST] Sheets:', results.sheets);
    } catch (error) {
      results.sheets = `✗ Error: ${error instanceof Error ? error.message : 'Unknown'}`;
      console.error('[TEST] Sheets error:', error);
    }

    // 3. Owner email
    try {
      await sendBookingNotificationToOwner(emailData, { depositPaid: true });
      results.ownerEmail = '✓ Sent';
      console.log('[TEST] Owner email:', results.ownerEmail);
    } catch (error) {
      results.ownerEmail = `✗ Error: ${error instanceof Error ? error.message : 'Unknown'}`;
      console.error('[TEST] Owner email error:', error);
    }

    // 4. Customer email
    try {
      await sendBookingConfirmation(emailData.contact.email, emailData, { depositPaid: true });
      results.customerEmail = '✓ Sent';
      console.log('[TEST] Customer email:', results.customerEmail);
    } catch (error) {
      results.customerEmail = `✗ Error: ${error instanceof Error ? error.message : 'Unknown'}`;
      console.error('[TEST] Customer email error:', error);
    }

    console.log('\n[TEST] All results:', results);

    return NextResponse.json({ success: true, results, emailData });
  } catch (error) {
    console.error('[TEST BOOKING] Fatal error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
