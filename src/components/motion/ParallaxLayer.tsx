'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /** Speed multiplier. Negative = moves slower than scroll. Default -0.3 */
  speed?: number;
}

/**
 * Creates a parallax offset using useScroll + useTransform.
 * Negative speed makes the layer move slower than the scroll (classic parallax).
 * Only animates transform (translateY) for compositor performance.
 *
 * Validates: Requirements 12.4, 12.5
 */
export function ParallaxLayer({
  children,
  className,
  speed = -0.3,
}: ParallaxLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
