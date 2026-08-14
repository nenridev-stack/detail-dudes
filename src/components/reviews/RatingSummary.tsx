'use client';

import { motion } from 'framer-motion';
import type { RatingSummary as RatingSummaryType } from '@/types';
import { StarRating } from './StarRating';

/**
 * RatingSummary — Displays the aggregate rating with animated bar chart
 * distribution. Shows average (1 decimal), total count, and per-star
 * breakdown counts.
 *
 * Validates: Requirement 8.4
 */

interface RatingSummaryProps {
  summary: RatingSummaryType;
}

export function RatingSummary({ summary }: RatingSummaryProps) {
  const maxCount = Math.max(...Object.values(summary.distribution), 1);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        {/* Overall rating */}
        <div className="flex flex-col items-center text-center sm:pr-8 sm:border-r sm:border-white/10">
          <motion.span
            className="text-5xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          >
            {summary.average.toFixed(1)}
          </motion.span>
          <div className="mt-2">
            <StarRating
              rating={Math.round(summary.average) as 1 | 2 | 3 | 4 | 5}
              size="md"
            />
          </div>
          <p className="mt-2 text-sm text-gray-400">
            {summary.totalReviews} {summary.totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Bar chart distribution */}
        <div className="flex-1 space-y-2">
          {([5, 4, 3, 2, 1] as const).map((star) => {
            const count = summary.distribution[star];
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-400 w-6 text-right">
                  {star}
                </span>
                <svg
                  className="h-4 w-4 text-warning-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      delay: (5 - star) * 0.1,
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
