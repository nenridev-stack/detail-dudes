'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CountUpProps {
  /** Target number to count up to */
  end: number;
  /** Animation duration in milliseconds. Default 2000 */
  duration?: number;
  /** Optional suffix appended to the number (e.g. "+", "%") */
  suffix?: string;
  /** Optional prefix prepended to the number (e.g. "$") */
  prefix?: string;
  className?: string;
}

/**
 * Animated number counter that counts from 0 to the target value when
 * the element enters the viewport. Uses requestAnimationFrame for smooth
 * 60fps counting. Only changes text content — no transform/opacity needed.
 *
 * Validates: Requirements 12.4
 */
export function CountUp({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className,
}: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;

    if (prefersReducedMotion) {
      setDisplayValue(end);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, end, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
