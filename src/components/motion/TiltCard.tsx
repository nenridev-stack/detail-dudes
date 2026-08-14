'use client';

import { ReactNode, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees. Default 10 */
  maxTilt?: number;
}

/**
 * 3D perspective tilt card that follows mouse position within the element.
 * Uses rotateX/rotateY transforms for the 3D effect.
 * Resets smoothly with spring physics on mouse leave.
 * Only animates transform for compositor performance.
 *
 * Validates: Requirements 12.3, 12.4, 12.5
 */
export function TiltCard({
  children,
  className,
  maxTilt = 10,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position to -1...1 range
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    // Invert Y for natural tilt direction (mouse up = tilt back)
    rotateX.set(-normalizedY * maxTilt);
    rotateY.set(normalizedX * maxTilt);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}
