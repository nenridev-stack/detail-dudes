'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * High-quality hero car image with blue glow reflection effect.
 * Slides in from the right with Framer Motion animation.
 * Replaces the old hand-drawn SVG silhouette.
 */
export function CarSilhouette() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Main car image */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
        <Image
          src="/brand/heroSectionImage.jfif"
          alt="Detallamiento profesional de autos"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
          priority
        />
      </div>

      {/* Blue glow reflection effect below the car */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-16 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(59,130,246,0.3) 0%, rgba(59,130,246,0.1) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
