import type { Metadata } from 'next';
import { Suspense } from 'react';
import BookingForm from '@/components/booking/BookingForm';

export const metadata: Metadata = {
  title: 'Reserva Tu Detallamiento',
  description:
    'Programa tu cita de detallamiento automotriz profesional. Elige tu vehículo, paquete de servicio y fecha preferida en nuestro formulario fácil de reserva.',
};

export default function BookPage() {
  return (
    <section className="min-h-[calc(100dvh-4rem)] py-12 md:py-16 pt-24 bg-black">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-2">
          Reserva Tu Detallamiento
        </h1>
        <p className="text-gray-400 text-center mb-10 max-w-lg mx-auto">
          Completa los pasos a continuación para programar tu cita. Revisaremos tu
          solicitud y confirmaremos el precio final.
        </p>

        {/* Suspense boundary para useSearchParams */}
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
