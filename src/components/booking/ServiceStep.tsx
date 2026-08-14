'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { VehicleSize, ServicePackageId, AddOnId } from '@/types';
import { SERVICE_PACKAGES, ADD_ONS } from '@/lib/constants';
import { springConfig } from '@/lib/motion-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ============================================================
// Props
// ============================================================

interface ServiceStepProps {
  vehicleSize: VehicleSize;
  selectedService: ServicePackageId | null;
  selectedAddOns: AddOnId[];
  estimatedPrice: number;
  onSelectService: (id: ServicePackageId) => void;
  onToggleAddOn: (id: AddOnId) => void;
  onNext: () => void;
}

// ============================================================
// Animated Price Counter (inline, re-animates on value change)
// ============================================================

function AnimatedPrice({
  value,
  duration = 500,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const from = prevValueRef.current;
    const to = value;
    prevValueRef.current = value;

    if (prefersReducedMotion || from === to) {
      setDisplayValue(to);
      return;
    }

    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, prefersReducedMotion]);

  return <span className={className}>${displayValue}</span>;
}

// ============================================================
// Stagger Animation Variants
// ============================================================

const checklistContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const checklistItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const packageCardVariants = {
  unselected: { scale: 1, opacity: 1 },
  selected: { scale: 1.02, opacity: 1 },
};

const addOnChipVariants = {
  off: { scale: 1 },
  on: { scale: 1 },
  tap: { scale: 0.95 },
};

// ============================================================
// ServiceStep Component
// ============================================================

export default function ServiceStep({
  vehicleSize,
  selectedService,
  selectedAddOns,
  estimatedPrice,
  onSelectService,
  onToggleAddOn,
  onNext,
}: ServiceStepProps) {
  const prefersReducedMotion = useReducedMotion();
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleNext = () => {
    if (!selectedService) {
      setValidationError('Please select a service package to continue.');
      return;
    }
    setValidationError(null);
    onNext();
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-display font-bold mb-2 text-white">Choose Your Service</h2>
        <p className="text-gray-400 text-sm">
          Select a detailing package for your vehicle
        </p>
      </div>

      {/* Package Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {SERVICE_PACKAGES.map((pkg) => {
          const isSelected = selectedService === pkg.id;
          const price = pkg.pricing[vehicleSize];

          return (
            <motion.button
              key={pkg.id}
              type="button"
              onClick={() => {
                onSelectService(pkg.id);
                setValidationError(null);
              }}
              variants={packageCardVariants}
              animate={isSelected ? 'selected' : 'unselected'}
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={springConfig.snappy}
              className={`
                relative rounded-xl border-2 p-4 text-left transition-colors cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-black
                ${
                  isSelected
                    ? 'border-accent-500 bg-accent-500/5 shadow-lg'
                    : 'border-white/10 bg-white/5 hover:border-accent-500/40'
                }
              `}
              style={
                isSelected
                  ? { boxShadow: `0 0 20px ${pkg.highlightColor}25` }
                  : undefined
              }
              aria-pressed={isSelected}
              aria-label={`${pkg.name} - $${price}`}
            >
              {/* Vehicle Image */}
              <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden bg-white/10">
                <Image
                  src={pkg.vehicleImages[vehicleSize]}
                  alt={`${pkg.name} detailing for ${vehicleSize}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Package Name */}
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: isSelected ? pkg.highlightColor : undefined }}
              >
                {pkg.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                {pkg.description}
              </p>

              {/* Price */}
              <div className="text-xl font-bold mb-3">
                <AnimatedPrice value={price} duration={500} />
              </div>

              {/* Included Services (animated checklist) */}
              <AnimatePresence>
                {isSelected && (
                  <motion.ul
                    variants={checklistContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-1.5 border-t border-white/10 pt-3 mt-2"
                  >
                    {pkg.includedServices.map((service, idx) => (
                      <motion.li
                        key={idx}
                        variants={checklistItemVariants}
                        className="flex items-start gap-2 text-xs text-gray-400"
                      >
                        <svg
                          className="w-3.5 h-3.5 mt-0.5 text-green-500 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{service}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="service-selection-indicator"
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={springConfig.bouncy}
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Add-Ons Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-white">Add-Ons</h3>
        <div className="flex flex-wrap gap-2">
          {ADD_ONS.map((addon) => {
            const isActive = selectedAddOns.includes(addon.id);

            return (
              <motion.button
                key={addon.id}
                type="button"
                onClick={() => onToggleAddOn(addon.id)}
                variants={addOnChipVariants}
                animate={isActive ? 'on' : 'off'}
                whileTap="tap"
                transition={springConfig.snappy}
                className={`
                  inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium
                  border transition-colors cursor-pointer min-h-[44px]
                  focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-black
                  ${
                    isActive
                      ? 'border-accent-500 bg-accent-500/10 text-accent-400'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:border-accent-500/40'
                  }
                `}
                aria-pressed={isActive}
                aria-label={`${addon.name} - $${addon.price}`}
              >
                <motion.span
                  animate={isActive ? { rotate: 0, scale: 1.1 } : { rotate: 0, scale: 1 }}
                  transition={springConfig.bouncy}
                >
                  {isActive ? '✓' : '+'}
                </motion.span>
                <span>{addon.name}</span>
                <span className="text-xs opacity-70">+${addon.price}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Validation Error */}
      {validationError && (
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 text-center"
          role="alert"
        >
          {validationError}
        </motion.p>
      )}

      {/* Next Button */}
      <div className="flex justify-center">
        <motion.button
          type="button"
          onClick={handleNext}
          whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
          className="px-8 py-3 rounded-lg bg-accent-500 text-white font-medium text-sm hover:bg-accent-600 transition-colors min-h-[44px]"
        >
          Continue
        </motion.button>
      </div>

      {/* Fixed Bottom Bar — Running Total */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, ...springConfig.gentle }}
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3 z-50"
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-400 font-medium">
            Estimated Total
          </span>
          <span className="text-2xl font-bold text-accent-400">
            <AnimatedPrice value={estimatedPrice} duration={500} />
          </span>
        </div>
      </motion.div>
    </div>
  );
}
