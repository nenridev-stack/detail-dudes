'use client';

import { motion } from 'framer-motion';

/**
 * StarRating — Renders filled/unfilled star icons with a fill animation.
 * Accepts a rating from 1–5 and renders 5 stars accordingly.
 *
 * Validates: Requirement 8.2
 */
interface StarRatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

export function StarRating({ rating, size = 'md', animate = true }: StarRatingProps) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < rating;
        return (
          <motion.svg
            key={i}
            className={`${sizeMap[size]} ${filled ? 'text-warning-500' : 'text-neutral-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
            initial={animate ? { scale: 0, opacity: 0 } : false}
            animate={animate ? { scale: 1, opacity: 1 } : undefined}
            transition={
              animate
                ? { delay: i * 0.08, type: 'spring', stiffness: 300, damping: 15 }
                : undefined
            }
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        );
      })}
    </div>
  );
}
