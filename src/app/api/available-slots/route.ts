import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots } from '@/lib/googleCalendar';

/**
 * GET /api/available-slots?date=2026-07-20
 *
 * Returns available time slots for a given date by checking
 * Google Calendar for existing events/busy periods.
 */
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: 'Invalid date parameter. Use YYYY-MM-DD format.' },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(date);
    return NextResponse.json({ date, availableSlots: slots });
  } catch (error) {
    console.error('[Available Slots] Error:', error);
    // Fail open — return all slots if calendar check fails
    return NextResponse.json({
      date,
      availableSlots: [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
      ],
    });
  }
}
