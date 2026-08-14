'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Review } from '@/types';
import { StarRating } from './StarRating';
import { variants } from '@/lib/motion-config';

/**
 * ReviewCard — Displays a single customer review with stagger-in animation.
 * Text is truncated at 500 characters with a "Read More" toggle to reveal
 * the full content.
 *
 * Validates: Requirements 8.2, 8.4
 */

const MAX_TEXT_LENGTH = 500;

interface ReviewCardProps {
  review: Review;
  index?: number;
}

export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > MAX_TEXT_LENGTH;
  const displayText =
    isLong && !expanded
      ? review.text.slice(0, MAX_TEXT_LENGTH).trimEnd() + '…'
      : review.text;

  return (
    <motion.article
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 flex flex-col"
      variants={variants.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Header: name + date */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white">
            {review.customerName}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {review.serviceReceived}
          </p>
        </div>
        <time
          className="text-xs text-gray-500"
          dateTime={review.date}
        >
          {new Date(review.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </div>

      {/* Star rating */}
      <div className="mb-3">
        <StarRating rating={review.rating} size="sm" animate={false} />
      </div>

      {/* Review text with truncation */}
      <p className="text-gray-400 text-sm leading-relaxed flex-1">
        &ldquo;{displayText}&rdquo;
      </p>

      {/* Read More toggle */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs font-medium text-accent-400 hover:text-accent-300 transition-colors self-start"
          aria-expanded={expanded}
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      )}

      {/* Vehicle type */}
      <div className="border-t border-white/10 pt-3 mt-4">
        <p className="text-xs text-gray-500">{review.vehicleType}</p>
      </div>
    </motion.article>
  );
}
