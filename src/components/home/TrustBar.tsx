'use client';

import { CountUp, ScrollReveal } from '@/components/motion';

interface TrustStat {
  value: number;
  suffix: string;
  label: string;
}

const TRUST_STATS: TrustStat[] = [
  { value: 10, suffix: '+', label: 'Años de Experiencia' },
  { value: 5000, suffix: '+', label: 'Autos Detallados' },
  { value: 5, suffix: ' Estrellas', label: 'Calificación Promedio' },
  { value: 100, suffix: '%', label: 'Tasa de Satisfacción' },
];

/**
 * Barra de confianza con fondo negro puro, estadísticas brillantes,
 * divisores delgados y líneas de gradiente arriba/abajo.
 */
export function TrustBar() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Línea de gradiente superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />
      {/* Línea de gradiente inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {TRUST_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${
                  index < TRUST_STATS.length - 1 ? 'lg:border-r lg:border-white/10' : ''
                }`}
              >
                <span
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
                  style={{ textShadow: '0 0 20px rgba(59,130,246,0.3)' }}
                >
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </span>
                <span className="mt-3 text-sm sm:text-base text-gray-400 font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
