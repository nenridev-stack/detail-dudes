import type { Metadata } from 'next';
import Link from 'next/link';
import { faqCategories } from '@/data/faq';
import Accordion from '@/components/faq/Accordion';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes — Detail Dudes',
  description:
    'Encuentra respuestas a preguntas comunes sobre nuestros servicios de detallamiento automotriz, precios, área de servicio, preparación del vehículo y política de cancelación.',
  openGraph: {
    title: 'Preguntas Frecuentes — Detail Dudes',
    description:
      'Encuentra respuestas a preguntas comunes sobre nuestros servicios de detallamiento automotriz, precios, área de servicio, preparación del vehículo y política de cancelación.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Preguntas Frecuentes — Detail Dudes',
    description:
      'Encuentra respuestas a preguntas comunes sobre nuestros servicios de detallamiento automotriz.',
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black pt-24">
      {/* Encabezado */}
      <section className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-lg text-gray-400">
            ¿Tienes preguntas? Tenemos respuestas. Navega por categoría abajo o
            contáctanos directamente.
          </p>
        </div>
      </section>

      {/* Acordeón de Preguntas */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <Accordion categories={faqCategories} />
      </section>

      {/* Sección CTA */}
      <section className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            ¿Aún tienes preguntas?
          </h2>
          <p className="text-gray-400 mb-8">
            Estamos felices de ayudarte. Contáctanos directamente o reserva tu
            cita hoy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-accent-500 text-accent-400 font-semibold hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Contáctanos
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Reservar Ahora
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
