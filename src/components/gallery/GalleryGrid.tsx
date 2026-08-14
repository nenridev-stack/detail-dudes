'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Image from 'next/image';
import { GalleryItem } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GalleryGridProps {
  items: GalleryItem[];
  onImageClick: (item: GalleryItem, type: 'before' | 'after') => void;
}

/**
 * Responsive masonry-style grid for gallery items.
 * 1 column below 768px, 2 columns 768-1023px, 3 columns at 1024px+.
 * Staggered reveal animation with 100ms delay between items.
 * Uses layout animations for smooth filter transitions.
 *
 * Validates: Requirements 4.1, 4.4, 4.5
 */
export function GalleryGrid({ items, onImageClick }: GalleryGridProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <LayoutGroup>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={!prefersReducedMotion ? containerVariants : undefined}
        initial={!prefersReducedMotion ? 'hidden' : undefined}
        whileInView={!prefersReducedMotion ? 'visible' : undefined}
        viewport={{ once: true, amount: 0.1 }}
        layout
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={!prefersReducedMotion ? itemVariants : undefined}
              initial={!prefersReducedMotion ? 'hidden' : false}
              animate={!prefersReducedMotion ? 'visible' : undefined}
              exit={!prefersReducedMotion ? 'exit' : undefined}
              layout
              className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="grid grid-cols-2 gap-0.5">
                {/* Before Image */}
                <button
                  onClick={() => onImageClick(item, 'before')}
                  className="relative aspect-[3/2] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-inset"
                  aria-label={`View before image: ${item.beforeImage.alt}`}
                >
                  <Image
                    src={item.beforeImage.src}
                    alt={item.beforeImage.alt.slice(0, 125)}
                    width={item.beforeImage.width}
                    height={item.beforeImage.height}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 767px) 50vw, (max-width: 1023px) 25vw, 17vw"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    Before
                  </span>
                </button>

                {/* After Image */}
                <button
                  onClick={() => onImageClick(item, 'after')}
                  className="relative aspect-[3/2] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-inset"
                  aria-label={`View after image: ${item.afterImage.alt}`}
                >
                  <Image
                    src={item.afterImage.src}
                    alt={item.afterImage.alt.slice(0, 125)}
                    width={item.afterImage.width}
                    height={item.afterImage.height}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 767px) 50vw, (max-width: 1023px) 25vw, 17vw"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    After
                  </span>
                </button>
              </div>

              <div className="p-3">
                <p className="text-sm text-gray-400 font-medium capitalize">
                  {item.category.replace('-', ' ')} · {item.vehicleType}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
