'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { variants } from '@/lib/motion-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps children with a fade-and-rise animation triggered when the element
 * enters the viewport at 20% visibility. Fires once per element per page load.
 * Respects prefers-reduced-motion — renders children without animation wrapper.
 *
 * Validates: Requirements 12.1, 12.4, 12.5
 */
export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
