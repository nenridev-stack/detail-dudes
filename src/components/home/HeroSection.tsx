'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CarSilhouette } from './CarSilhouette';

/**
 * Sección hero dramática con fondo negro puro, silueta de auto animada,
 * partículas flotantes, revelación de texto y CTA brillante.
 */
export function HeroSection() {
  const headlineWords = ['Perfección', 'en', 'Cada', 'Detalle'];

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
      {/* Resplandor radial sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/5 rounded-full blur-[150px]" />

      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-6xl mx-auto py-32">
        {/* Insignia de prueba social */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm text-white/80">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            500+ Autos Detallados Este Año
          </span>
        </motion.div>

        {/* Titular principal — revelación palabra por palabra */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[1.05] tracking-tight">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Divisor de gradiente horizontal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent mt-6"
        />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed"
        >
          Cuidado profesional de autos que transforma tu vehículo en una obra de arte.
          Detallamiento de precisión para quienes exigen perfección.
        </motion.p>

        {/* Botón CTA con brillo pulsante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10"
        >
          <Link
            href="/book"
            className="group relative inline-flex items-center justify-center h-14 sm:h-16 px-8 sm:px-10 text-lg font-semibold text-white bg-accent-500 hover:bg-accent-400 rounded-xl shadow-glow-md transition-all duration-300 min-w-[220px] animate-pulse-glow"
          >
            <span className="relative">Obtén tu Cotización →</span>
          </Link>
        </motion.div>

        {/* Silueta del Auto */}
        <div className="mt-16 w-full">
          <CarSilhouette />
        </div>

        {/* Línea de confianza */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-8 text-sm text-gray-500 flex items-center gap-4"
        >
          <span className="flex items-center gap-1 text-amber-400">
            {'★★★★★'}
          </span>
          <span>Calificación 5 Estrellas</span>
          <span className="w-px h-4 bg-white/10" />
          <span>10+ Años de Experiencia</span>
        </motion.p>
      </div>

      {/* Gradiente inferior que se desvanece a negro */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

/** Partículas flotantes — pequeños círculos con animación de movimiento lento */
function FloatingParticles() {
  const particles = [
    { left: '10%', top: '20%', size: 3, delay: 0 },
    { left: '20%', top: '60%', size: 2, delay: 1.5 },
    { left: '35%', top: '15%', size: 2, delay: 3 },
    { left: '45%', top: '80%', size: 3, delay: 0.5 },
    { left: '55%', top: '30%', size: 2, delay: 2 },
    { left: '65%', top: '70%', size: 4, delay: 1 },
    { left: '75%', top: '25%', size: 2, delay: 2.5 },
    { left: '80%', top: '55%', size: 3, delay: 0.8 },
    { left: '90%', top: '40%', size: 2, delay: 3.5 },
    { left: '5%', top: '45%', size: 2, delay: 4 },
    { left: '50%', top: '10%', size: 3, delay: 1.8 },
    { left: '30%', top: '85%', size: 2, delay: 2.2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-float-particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.15,
            animationDelay: `${p.delay}s`,
            animationDuration: `${6 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}
