'use client';

import { motion } from 'framer-motion';

export type GalleryCategory = 'all' | 'basic-wash' | 'full-detail' | 'ceramic-coating';

interface FilterOption {
  id: GalleryCategory;
  label: string;
}

const filterOptions: FilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'basic-wash', label: 'Basic Wash' },
  { id: 'full-detail', label: 'Full Detail' },
  { id: 'ceramic-coating', label: 'Ceramic Coating' },
];

interface GalleryFilterProps {
  activeFilter: GalleryCategory;
  onFilterChange: (category: GalleryCategory) => void;
}

/**
 * Animated tab pills for filtering gallery items by service category.
 * Uses Framer Motion layoutId for smooth indicator transitions between tabs.
 *
 * Validates: Requirements 4.3
 */
export function GalleryFilter({ activeFilter, onFilterChange }: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12">
      {filterOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className="relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-pressed={activeFilter === option.id}
        >
          {activeFilter === option.id && (
            <motion.span
              layoutId="gallery-filter-pill"
              className="absolute inset-0 bg-accent-500 rounded-full"
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          )}
          <span
            className={`relative z-10 ${
              activeFilter === option.id ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}
