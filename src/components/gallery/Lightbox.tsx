'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { GalleryItem, ImageData } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LightboxImage {
  item: GalleryItem;
  type: 'before' | 'after';
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen lightbox with gesture controls:
 * - Swipe left/right to navigate
 * - Drag down to dismiss
 * - Keyboard: Escape to close, Arrow keys to navigate
 * - Circular navigation (wraps at ends)
 *
 * Validates: Requirements 4.2, 4.6
 */
export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Sync initial index when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const navigateNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const navigatePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
        case 'ArrowLeft':
          navigatePrev();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, navigateNext, navigatePrev]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;

    // Swipe left/right to navigate
    if (Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500) {
      if (offset.x > 0) {
        navigatePrev();
      } else {
        navigateNext();
      }
      return;
    }

    // Drag down to dismiss
    if (offset.y > 100 || velocity.y > 500) {
      onClose();
    }
  };

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imageData: ImageData =
    currentImage.type === 'before' ? currentImage.item.beforeImage : currentImage.item.afterImage;

  const slideVariants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0 }),
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-black/40 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close lightbox"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={navigatePrev}
            className="absolute left-4 z-50 p-2 text-white/80 hover:text-white bg-black/40 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={navigateNext}
            className="absolute right-4 z-50 p-2 text-white/80 hover:text-white bg-black/40 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image with gesture controls */}
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={`${currentIndex}-${currentImage.type}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragEnd={handleDragEnd}
              className="relative z-10 max-w-[90vw] max-h-[85vh] cursor-grab active:cursor-grabbing touch-none"
            >
              <Image
                src={imageData.src}
                alt={imageData.alt.slice(0, 125)}
                width={imageData.width}
                height={imageData.height}
                className="max-w-full max-h-[85vh] object-contain rounded-lg select-none pointer-events-none"
                sizes="90vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Image info & counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-center">
            <p className="text-white/90 text-sm mb-1">
              {currentImage.type === 'before' ? 'Before' : 'After'} — {currentImage.item.category.replace('-', ' ')} · {currentImage.item.vehicleType}
            </p>
            <p className="text-white/60 text-xs">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
