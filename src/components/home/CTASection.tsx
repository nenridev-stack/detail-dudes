'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/motion';

/**
 * Sección final CTA con gradiente dramático oscuro a azul marino,
 * partículas de luz flotantes, titular grande y botón CTA con brillo azul.
 */
export function CTASection() {
  return (
    <section className="relative py-28 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[#0a0a1a] to-[#0a1628] overflow-hidden">
      {/* Partículas de luz flotantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[
          { left: '15%', top: '25%', size: 2 },
          { left: '25%', top: '60%', size: 3 },
          { left: '40%', top: '20%', size: 2 },
          { left: '60%', top: '75%', size: 2 },
          { left: '70%', top: '30%', size: 3 },
          { left: '85%', top: '55%', size: 2 },
          { left: '50%', top: '45%', size: 2 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-float-particle"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0.1,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${7 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Desenfoques decorativos */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent-500/5 rounded-full blur-[120px]" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
          >
            ¿Listo para un Acabado de Sala de Exhibición?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Reserva tu cita hoy y experimenta la diferencia
            que hace el detallamiento profesional. Tu vehículo lo merece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/book"
              className="group relative inline-flex items-center justify-center rounded-xl bg-accent-500 px-10 py-4 text-lg font-bold text-white shadow-glow-md hover:shadow-glow-lg hover:bg-accent-400 hover:scale-[1.03] transition-all duration-300 min-w-[220px]"
            >
              <span className="relative">Reserva Tu Detallamiento</span>
            </Link>
          </motion.div>

          {/* Línea de confianza */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-sm text-gray-500"
          >
            Cotizaciones gratis • Sin compromiso • Disponibilidad la misma semana
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
}
