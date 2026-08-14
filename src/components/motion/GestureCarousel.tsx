'use client';

import { ReactNode, Children, useRef, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GestureCarouselProps {
  children: ReactNode;
  className?: string;
  /** Width of each item in pixels. Default 300 */
  itemWidth?: number;
  /** Gap between items in pixels. Default 16 */
  gap?: number;
}

/**
 * Drag-to-scroll horizontal carousel with momentum and snap-to-item behavior.
 * Uses framer-motion's drag gesture with horizontal constraints.
 * Only animates transform (translateX) for compositor performance.
 *
 * Validates: Requirements 12.4, 12.5
 */
export function GestureCarousel({
  children,
  className,
  itemWidth = 300,
  gap = 16,
}: GestureCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const childCount = Children.count(children);
  const totalWidth = childCount * (itemWidth + gap) - gap;

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const threshold = itemWidth / 4;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let newIndex = currentIndex;

    if (offset < -threshold || velocity < -500) {
      newIndex = Math.min(currentIndex + 1, childCount - 1);
    } else if (offset > threshold || velocity > 500) {
      newIndex = Math.max(currentIndex - 1, 0);
    }

    setCurrentIndex(newIndex);
  }

  if (prefersReducedMotion) {
    return (
      <div className={className} style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: `${gap}px` }}>
          {Children.map(children, (child) => (
            <div style={{ minWidth: `${itemWidth}px`, flexShrink: 0 }}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const containerWidth = containerRef.current?.offsetWidth ?? 0;
  const maxDrag = -(totalWidth - containerWidth);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: 'hidden', cursor: 'grab' }}
    >
      <motion.div
        style={{ display: 'flex', gap: `${gap}px` }}
        drag="x"
        dragConstraints={{ left: maxDrag, right: 0 }}
        dragElastic={0.1}
        dragMomentum
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * (itemWidth + gap)) }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {Children.map(children, (child) => (
          <div style={{ minWidth: `${itemWidth}px`, flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
