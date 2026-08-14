'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { VehicleSize } from '@/types';
import { VEHICLE_OPTIONS } from '@/lib/constants';
import { TiltCard } from '@/components/motion/TiltCard';
import { CountUp } from '@/components/motion/CountUp';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { springConfig } from '@/lib/motion-config';

// ============================================================
// Props
// ============================================================

interface VehicleStepProps {
  selectedVehicle: VehicleSize | null;
  onSelect: (vehicle: VehicleSize) => void;
  onNext: () => void;
}

// ============================================================
// VehicleStep Component
// ============================================================

/**
 * Step 1 of the booking flow — image-based vehicle selector.
 * Large visual cards with vehicle silhouette images.
 *
 * Interactions:
 * - TiltCard 3D hover effect
 * - Spring scale-up (1.05) on select, glow ring border, checkmark morph
 * - Unselected cards: scale down (0.97), opacity 0.6
 * - Price badge with CountUp animation from 0 to starting price
 * - Auto-advances to step 2 after selection
 *
 * Validates: Requirements 5.3
 */
export default function VehicleStep({
  selectedVehicle,
  onSelect,
  onNext,
}: VehicleStepProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleSelect = useCallback(
    (vehicleId: VehicleSize) => {
      onSelect(vehicleId);
      // Auto-advance to step 2 after a brief delay for the selection animation
      setTimeout(() => {
        onNext();
      }, 600);
    },
    [onSelect, onNext]
  );

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
          Select Your Vehicle Type
        </h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Choose the category that best matches your vehicle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {VEHICLE_OPTIONS.map((vehicle) => {
          const isSelected = selectedVehicle === vehicle.id;
          const hasSelection = selectedVehicle !== null;
          const isUnselected = hasSelection && !isSelected;

          return (
            <VehicleCard
              key={vehicle.id}
              vehicleId={vehicle.id}
              label={vehicle.label}
              description={vehicle.description}
              image={vehicle.image}
              startingPrice={vehicle.startingPrice}
              isSelected={isSelected}
              isUnselected={isUnselected}
              prefersReducedMotion={prefersReducedMotion}
              onSelect={handleSelect}
            />
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// VehicleCard Sub-Component
// ============================================================

interface VehicleCardProps {
  vehicleId: VehicleSize;
  label: string;
  description: string;
  image: string;
  startingPrice: number;
  isSelected: boolean;
  isUnselected: boolean;
  prefersReducedMotion: boolean;
  onSelect: (id: VehicleSize) => void;
}

function VehicleCard({
  vehicleId,
  label,
  description,
  image,
  startingPrice,
  isSelected,
  isUnselected,
  prefersReducedMotion,
  onSelect,
}: VehicleCardProps) {
  const handleClick = useCallback(() => {
    onSelect(vehicleId);
  }, [onSelect, vehicleId]);

  // Determine scale/opacity based on selection state
  const animateProps = prefersReducedMotion
    ? {}
    : {
        scale: isSelected ? 1.05 : isUnselected ? 0.97 : 1,
        opacity: isUnselected ? 0.6 : 1,
      };

  const cardContent = (
    <motion.button
      type="button"
      onClick={handleClick}
      animate={animateProps}
      transition={springConfig.snappy}
      className={`
        relative w-full flex flex-col items-center p-6 rounded-2xl border-2
        cursor-pointer transition-shadow duration-200
        min-h-[280px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
        ${isSelected
          ? 'border-accent-500 bg-accent-500/5 shadow-xl shadow-accent-500/20'
          : 'border-white/10 bg-white/5 hover:shadow-glow-sm hover:border-accent-500/30'
        }
      `}
      aria-label={`Select ${label} - ${description} - Starting at $${startingPrice}`}
      aria-pressed={isSelected}
    >
      {/* Glow ring border animation for selected state */}
      <AnimatePresence>
        {isSelected && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-accent-500"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              scale: { ...springConfig.gentle },
            }}
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Checkmark indicator for selected state */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-accent-500 flex items-center justify-center"
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={springConfig.bouncy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicle Image */}
      <div className="relative w-full h-32 sm:h-36 mb-4 flex items-center justify-center">
        <Image
          src={image}
          alt={`${label} vehicle silhouette`}
          width={240}
          height={160}
          className="object-contain w-auto h-full max-h-32 sm:max-h-36"
          priority
        />
      </div>

      {/* Vehicle Label */}
      <h3 className="text-lg font-bold text-white font-display">{label}</h3>

      {/* Vehicle Description */}
      <p className="text-sm text-gray-400 mt-1 text-center">{description}</p>

      {/* Price Badge */}
      <div
        className={`
          mt-4 px-4 py-2 rounded-full text-sm font-semibold
          ${isSelected
            ? 'bg-accent-500 text-white'
            : 'bg-white/10 text-gray-400'
          }
        `}
      >
        <span>Starting at </span>
        {isSelected ? (
          <CountUp
            end={startingPrice}
            duration={800}
            prefix="$"
            className="inline"
          />
        ) : (
          <span>${startingPrice}</span>
        )}
      </div>
    </motion.button>
  );

  // Wrap with TiltCard for 3D hover (only when not selected and not reduced motion)
  if (prefersReducedMotion || isSelected) {
    return cardContent;
  }

  return (
    <TiltCard maxTilt={8} className="w-full">
      {cardContent}
    </TiltCard>
  );
}
