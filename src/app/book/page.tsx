import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingForm from '@/components/booking/BookingForm';

export const metadata: Metadata = {
  title: 'Book Your Detail',
  description:
    'Schedule your professional auto detailing appointment. Choose your vehicle, service package, and preferred date in our easy booking form.',
};

export default function BookPage() {
  return (
    <section className="min-h-[calc(100dvh-4rem)] py-12 md:py-16 pt-24 bg-black">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-2">
          Book Your Detail
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-lg mx-auto">
          Complete the steps below to schedule your appointment. We&apos;ll review your
          request and confirm the final price.
        </p>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </div>
    </section>
  );
}
