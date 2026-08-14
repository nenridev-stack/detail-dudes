import { google } from 'googleapis';
import { getGoogleAuth } from './google-auth';
import type { BookingEmailData } from './email';

const CALENDAR_ID = (process.env.GOOGLE_CALENDAR_ID || 'd0cb528d7239f0ebc0b41362b84797217e5df3fa07e0c466e9a5cc0eea46036e@group.calendar.google.com').trim();

/**
 * Creates a Google Calendar event for a confirmed booking.
 * Includes customer name, service, vehicle type, address as location,
 * and full booking details in the description.
 */
export async function createCalendarEvent(data: BookingEmailData): Promise<string | null> {
  try {
    const auth = getGoogleAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    // Get the hour for this time slot
    const hour = SLOT_START_HOURS[data.timeSlot];
    const startHour = hour !== undefined ? hour : 9; // Default 9 AM if unknown

    // Build datetime strings directly — NO Date object to avoid timezone issues
    // Format: YYYY-MM-DDTHH:MM:SS (Google Calendar uses timeZone param to interpret)
    const startDateTimeStr = `${data.preferredDate}T${startHour.toString().padStart(2, '0')}:00:00`;
    const endHour = startHour + 2; // 2-hour service duration
    const endDateTimeStr = `${data.preferredDate}T${endHour.toString().padStart(2, '0')}:00:00`;

    const event = {
      summary: `🚗 Detailing: ${data.contact.fullName} - ${data.servicePackage.replace(/-/g, ' ')}`,
      location: data.contact.address,
      description: `
Customer: ${data.contact.fullName}
Phone: ${data.contact.phone}
Email: ${data.contact.email}
Address: ${data.contact.address}

Vehicle: ${data.vehicleSize}
Service: ${data.servicePackage.replace(/-/g, ' ')}
Add-ons: ${data.addOns.length > 0 ? data.addOns.map(a => a.replace(/-/g, ' ')).join(', ') : 'None'}
Estimated Price: $${data.estimatedPrice}
Photos: ${data.photosCount} uploaded
${data.photoUrls && data.photoUrls.length > 0 ? `\nPhoto Links:\n${data.photoUrls.map((url, i) => `  ${i + 1}. ${url}`).join('\n')}` : ''}
${data.contact.notes ? `\nNotes: ${data.contact.notes}` : ''}
      `.trim(),
      start: {
        dateTime: startDateTimeStr,
        timeZone: 'America/Chicago',
      },
      end: {
        dateTime: endDateTimeStr,
        timeZone: 'America/Chicago',
      },
      colorId: '9', // Blue
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 60 },
          { method: 'email', minutes: 120 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: event,
    });

    console.log('[Google Calendar] Event created:', response.data.id);
    return response.data.id || null;
  } catch (error) {
    console.error('[Google Calendar] Failed to create event:', error);
    return null;
  }
}

/**
 * Check available slots for a given date by querying the calendar's
 * freebusy information. Returns which of the standard time slots are free.
 */
export async function getAvailableSlots(date: string): Promise<string[]> {
  // These match the start hours of our booking slots
  const SLOT_HOURS = [8, 10, 12, 14, 16];

  try {
    const auth = getGoogleAuth();
    const calendar = google.calendar({ version: 'v3', auth });

    // Query freebusy for the full business day in Chicago timezone
    // Use RFC3339 format with explicit timezone offset for Chicago (CDT = -05:00)
    const timeMin = `${date}T06:00:00-05:00`;
    const timeMax = `${date}T20:00:00-05:00`;

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        timeZone: 'America/Chicago',
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busySlots = response.data.calendars?.[CALENDAR_ID]?.busy || [];
    
    console.log(`[Available Slots] Date: ${date}, Busy periods:`, busySlots);

    if (busySlots.length === 0) {
      // No events at all — all slots are available
      return SLOT_HOURS.map((h) => {
        if (h === 12) return '12:00 PM';
        if (h > 12) return `${h - 12}:00 PM`;
        return `${h}:00 AM`;
      });
    }

    // Filter out hours that overlap with busy periods
    const available = SLOT_HOURS.filter((hour) => {
      // Create Chicago-time boundaries for this slot
      const slotStartMs = new Date(`${date}T${hour.toString().padStart(2, '0')}:00:00-05:00`).getTime();
      const slotEndMs = new Date(`${date}T${(hour + 2).toString().padStart(2, '0')}:00:00-05:00`).getTime();

      // Check if this slot overlaps with any busy period
      const isBooked = busySlots.some((busy) => {
        const busyStartMs = new Date(busy.start!).getTime();
        const busyEndMs = new Date(busy.end!).getTime();
        return slotStartMs < busyEndMs && slotEndMs > busyStartMs;
      });

      return !isBooked;
    });

    // Return as "H:00 AM/PM" format
    return available.map((h) => {
      if (h === 12) return '12:00 PM';
      if (h > 12) return `${h - 12}:00 PM`;
      return `${h}:00 AM`;
    });
  } catch (error) {
    console.error('[Google Calendar] Failed to check availability:', error);
    // On error, return all slots (fail open)
    return ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];
  }
}

/**
 * Map slot IDs to actual start hours for Calendar event creation.
 */
const SLOT_START_HOURS: Record<string, number> = {
  'morning': 8,
  'mid-morning': 10,
  'afternoon': 12,
  'mid-afternoon': 14,
  'late-afternoon': 16,
  // Legacy format support (if slots use "X:00 AM/PM" format)
  '8:00 AM': 8,
  '9:00 AM': 9,
  '10:00 AM': 10,
  '11:00 AM': 11,
  '12:00 PM': 12,
  '1:00 PM': 13,
  '2:00 PM': 14,
  '3:00 PM': 15,
  '4:00 PM': 16,
};

/**
 * Parse a date string (YYYY-MM-DD) and time slot ID into a formatted
 * datetime string for Google Calendar (YYYY-MM-DDTHH:MM:SS).
 * Returns the string directly — NOT a Date object — to avoid timezone shifts.
 */
function parseBookingDateTime(dateStr: string, timeSlot: string): Date {
  const hour = SLOT_START_HOURS[timeSlot];
  
  if (hour !== undefined) {
    // Return a Date that represents the local time in the business timezone.
    // We construct it as a plain date string without timezone info so that
    // when paired with the timeZone parameter in the Calendar API, it works correctly.
    const dateTimeStr = `${dateStr}T${hour.toString().padStart(2, '0')}:00:00`;
    // Parse as components to avoid timezone interpretation issues
    const [yearStr, monthStr, dayStr] = dateStr.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1; // 0-indexed
    const day = parseInt(dayStr, 10);
    const d = new Date(year, month, day, hour, 0, 0);
    return d;
  }

  // Fallback: try parsing as "H:MM AM/PM" format
  const match = timeSlot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match) {
    let h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    const period = match[3].toUpperCase();
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    const [yearStr, monthStr, dayStr] = dateStr.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const day = parseInt(dayStr, 10);
    return new Date(year, month, day, h, m, 0);
  }

  // Ultimate fallback: 9 AM
  console.warn(`[Google Calendar] Could not parse time slot "${timeSlot}", defaulting to 9 AM`);
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);
  return new Date(year, month, day, 9, 0, 0);
}
