'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Slider comparativo de antes/después con arrastre.
 * Usa eventos de puntero para soporte táctil + ratón.
 */
export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percent);
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Mira la Diferencia
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Arrastra el deslizador para revelar la transformación.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-col-resize select-none border border-white/10"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            role="slider"
            aria-label="Deslizador de comparación antes y después"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
          >
            {/* Imagen después (fondo completo) */}
            <div className="absolute inset-0">
              <Image
                src="/brand/After-Clean-staringseats.jpeg"
                alt="Auto después del detallamiento profesional - limpio y brillante"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {/* Imagen antes (recortada por posición del slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <Image
                src="/brand/Before-cleaning-staringseats.jpeg"
                alt="Auto antes del servicio de detallamiento profesional"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ minWidth: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100vw' }}
              />
            </div>

            {/* Línea divisora del slider */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Asa del slider */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-gray-700"
                >
                  <path
                    d="M6 10L3 10M3 10L5 8M3 10L5 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 10L17 10M17 10L15 8M17 10L15 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Etiquetas */}
            <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full z-20">
              Antes
            </span>
            <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full z-20">
              Después
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
