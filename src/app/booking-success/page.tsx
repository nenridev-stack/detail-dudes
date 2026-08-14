import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingSuccessContent from './BookingSuccessContent';

export const metadata: Metadata = {
  title: 'Booking Confirmed',
  description: 'Your deposit has been received and your appointment is confirmed.',
};

/**
 * Landing page after Stripe Checkout redirect. This page is informational
 * only — the ACTUAL booking confirmation (emails, calendar, sheets) happens
 * server-side via the Stripe webhook, which is the trustworthy source of
 * truth for payment success. This page just polls/displays a friendly message.
 */
export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <BookingSuccessContent />
      </Suspense>
    </main>
  );
}
