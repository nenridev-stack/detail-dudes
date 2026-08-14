'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { springConfig } from '@/lib/motion-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Direction = 'left' | 'right' | 'up' | 'down';

interface SlideInProps {
  children: ReactNode;
  className?: string;
  /** Direction from which the element slides in. Default 'left' */
  direction?: Direction;
  /** Distance in pixels. Default 40 */
  distance?: number;
}

function getInitialOffset(direction: Direction, distance: number) {
  switch (direction) {
    case 'left':
      return { x: -distance, y: 0 };
    case 'right':
      return { x: distance, y: 0 };
    case 'up':
      return { x: 0, y: -distance };
    case 'down':
      return { x: 0, y: distance };
  }
}

/**
 * Directional slide entrance animation that triggers when the element
 * enters the viewport. Accepts a direction prop to control the slide origin.
 * Only animates transform and opacity for compositor performance.
 *
 * Validates: Requirements 12.1, 12.4, 12.5
 */
export function SlideIn({
  children,
  className,
  direction = 'left',
  distance = 40,
}: SlideInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = getInitialOffset(direction, distance);

  const slideVariants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: springConfig.gentle,
    },
  };

  return (
    <motion.div
      className={className}
      variants={slideVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
