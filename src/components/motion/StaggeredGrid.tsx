'use client';

import { ReactNode, Children } from 'react';
import { motion } from 'framer-motion';
import { variants } from '@/lib/motion-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StaggeredGridProps {
  children: ReactNode;
  className?: string;
  /** Delay between consecutive items in seconds. Default 0.1 (100ms) */
  staggerDelay?: number;
}

/**
 * Orchestrated stagger container that animates children sequentially
 * with a configurable delay (default 100ms) when entering the viewport.
 * Each child fades up individually.
 *
 * Validates: Requirements 12.2, 12.4, 12.5
 */
export function StaggeredGrid({
  children,
  className,
  staggerDelay = 0.1,
}: StaggeredGridProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={variants.fadeUp}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
