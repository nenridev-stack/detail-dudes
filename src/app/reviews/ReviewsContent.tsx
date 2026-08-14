'use client';

import { useState, useMemo } from 'react';
import { ReviewCard, RatingSummary, StarRating } from '@/components/reviews';
import { reviews, ratingSummary } from '@/data/reviews';

/**
 * ReviewsContent — Client component that handles pagination state.
 * Displays reviews sorted reverse chronologically with "Show More" pagination.
 *
 * Validates: Requirements 8.1, 8.3, 8.5
 */

const PAGE_SIZE = 6;

export function ReviewsContent() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Sort reviews by date descending (most recent first)
  const sortedReviews = useMemo(() => {
    return [...reviews].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < sortedReviews.length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pt-24">
      {/* Page header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white">
          Customer Reviews
        </h1>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          See what our customers say about their auto detailing experience.
        </p>
      </div>

      {/* Rating Summary at the top */}
      <div className="mb-10">
        <RatingSummary summary={ratingSummary} />
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((review, index) => (
          <ReviewCard key={review.id} review={review} index={index} />
        ))}
      </div>

      {/* Show More button */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent-600 hover:scale-103 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Show More Reviews
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
