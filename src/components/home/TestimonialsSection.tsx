'use client';

import { motion } from 'framer-motion';
import { reviews } from '@/data/reviews';
import { ScrollReveal } from '@/components/motion';

/**
 * Sección de testimonios con tarjetas de vidrio oscuro, bordes azules,
 * comillas brillantes y estrellas doradas sobre fondo oscuro.
 */
export function TestimonialsSection() {
  const displayReviews = reviews.slice(0, 6);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111111]">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de Sección */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-3">
              Testimonios
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Reseñas reales de clientes reales que confían en nosotros con sus vehículos.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid Desktop / Scroll Móvil */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <ReviewCard
                name={review.customerName}
                rating={review.rating}
                text={review.text}
                service={review.serviceReceived}
              />
            </motion.div>
          ))}
        </div>

        {/* Scroll horizontal móvil */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
          {displayReviews.map((review) => (
            <div key={review.id} className="min-w-[300px] flex-shrink-0">
              <ReviewCard
                name={review.customerName}
                rating={review.rating}
                text={review.text}
                service={review.serviceReceived}
              />
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 mt-8 md:hidden">
          ← Desliza para ver más →
        </p>
      </div>
    </section>
  );
}

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
  service: string;
}

function ReviewCard({ name, rating, text, service }: ReviewCardProps) {
  const excerpt =
    text.length > 140 ? text.slice(0, 140).trimEnd() + '…' : text;

  return (
    <div className="relative rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 border-l-4 border-l-accent-500 h-full flex flex-col transition-all duration-200 hover:border-white/20">
      {/* Comilla decorativa — brillo azul */}
      <span
        className="absolute top-4 right-5 text-5xl leading-none text-accent-500/20 font-serif pointer-events-none select-none"
        aria-hidden="true"
        style={{ textShadow: '0 0 15px rgba(59,130,246,0.3)' }}
      >
        &ldquo;
      </span>

      {/* Calificación con estrellas — ámbar/dorado */}
      <div
        className="flex items-center gap-0.5 mb-4"
        role="img"
        aria-label={`${rating} de 5 estrellas`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-amber-400' : 'text-gray-700'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Texto de la reseña */}
      <p className="text-gray-300 flex-1 mb-5 text-sm leading-relaxed">
        &ldquo;{excerpt}&rdquo;
      </p>

      {/* Información del cliente */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-sm font-bold text-white">{name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{service}</p>
      </div>
    </div>
  );
}
