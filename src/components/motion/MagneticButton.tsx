'use client';

import { ReactNode, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Magnetic pull strength. Default 0.3 */
  strength?: number;
}

/**
 * Mouse-tracking magnetic effect button. When hovering, the element
 * subtly follows the mouse cursor position relative to its center.
 * Snaps back with spring physics on mouse leave.
 * Only animates transform (translate) for compositor performance.
 *
 * Validates: Requirements 12.3, 12.4, 12.5
 */
export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(0, { stiffness: 300, damping: 20 });
  const springY = useSpring(0, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || prefersReducedMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    springX.set(deltaX);
    springY.set(deltaY);
  }

  function handleMouseLeave() {
    springX.set(0);
    springY.set(0);
    setIsHovered(false);
  }

  function handleMouseEnter() {
    setIsHovered(true);
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
      onMouseEnter={handleMouseEnter}
      style={{ x: springX, y: springY }}
      animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
