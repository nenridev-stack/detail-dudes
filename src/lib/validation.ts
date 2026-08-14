import { z } from 'zod';

// ============================================================
// Date Validation Helpers
// ============================================================

/**
 * Checks if a date string represents a time at least 24 hours in the future.
 */
export function isAtLeast24HoursInFuture(dateStr: string): boolean {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const now = new Date();
  const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  return date >= twentyFourHoursFromNow;
}

/**
 * Checks if a date string represents a time within 90 days from now.
 */
export function isWithin90Days(dateStr: string): boolean {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const now = new Date();
  const ninetyDaysFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  return date <= ninetyDaysFromNow;
}

/**
 * Checks if a date string is a valid booking date (at least 24h in future AND within 90 days).
 */
export function isValidBookingDate(dateStr: string): boolean {
  return isAtLeast24HoursInFuture(dateStr) && isWithin90Days(dateStr);
}

// ============================================================
// Zod Schemas
// ============================================================

export const vehicleSizeSchema = z.enum(['sedan', 'suv', 'truck']);

export const servicePackageIdSchema = z.enum(['basic-wash', 'full-detail', 'ceramic-coating']);

export const contactSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name must be 100 characters or less'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone number is required').max(20, 'Phone number is too long'),
  address: z.string().min(5, 'Please enter the address where we should detail your vehicle').max(300, 'Address must be 300 characters or less'),
  notes: z.string().max(500, 'Notes must be 500 characters or less').optional(),
});

export const bookingSchema = z.object({
  vehicleSize: vehicleSizeSchema,
  photos: z.array(z.string()).max(5, 'Maximum 5 photos allowed'),
  servicePackage: servicePackageIdSchema,
  addOns: z.array(z.string()),
  estimatedPrice: z.number().positive('Estimated price must be positive'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  contact: contactSchema,
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be 200 characters or less'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message must be 2000 characters or less'),
});

// ============================================================
// Type exports inferred from schemas
// ============================================================

export type BookingSchemaType = z.infer<typeof bookingSchema>;
export type ContactFormSchemaType = z.infer<typeof contactFormSchema>;
export type ContactSchemaType = z.infer<typeof contactSchema>;
