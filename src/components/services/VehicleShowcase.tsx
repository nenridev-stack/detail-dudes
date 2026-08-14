'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { VEHICLE_OPTIONS } from '@/lib/constants';
import type { VehicleSize, ServicePackage } from '@/types';

interface VehicleShowcaseProps {
  /** The service package whose vehicle images to display */
  servicePackage: ServicePackage;
}

/**
 * Animated vehicle image showcase with tabs for Sedan/SUV/Truck.
 * Uses AnimatePresence for crossfade transitions between vehicle images.
 *
 * Validates: Requirements 3.1
 */
export function VehicleShowcase({ servicePackage }: VehicleShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedSize, setSelectedSize] = useState<VehicleSize>('sedan');

  const imageVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
      };

  return (
    <div className="w-full">
      {/* Vehicle Size Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {VEHICLE_OPTIONS.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => setSelectedSize(vehicle.id)}
            className={`
              relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
              min-w-[44px] min-h-[44px] flex items-center justify-center
              ${
                selectedSize === vehicle.id
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }
            `}
          >
            {selectedSize === vehicle.id && (
              <motion.div
                layoutId={`vehicle-tab-${servicePackage.id}`}
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: servicePackage.highlightColor }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{vehicle.label}</span>
          </button>
        ))}
      </div>

      {/* Vehicle Image with Crossfade */}
      <div className="relative aspect-[3/2] w-full max-w-md mx-auto rounded-xl overflow-hidden bg-slate-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${servicePackage.id}-${selectedSize}`}
            className="absolute inset-0"
            {...imageVariants}
          >
            <Image
              src={servicePackage.vehicleImages[selectedSize]}
              alt={`${servicePackage.name} service for ${selectedSize} vehicle — REPLACE WITH CLIENT PHOTO`}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vehicle Info */}
      <div className="text-center mt-3">
        <p className="text-sm text-slate-500">
          {VEHICLE_OPTIONS.find((v) => v.id === selectedSize)?.description}
        </p>
        <p className="text-lg font-semibold text-slate-900 mt-1">
          Starting at{' '}
          <span style={{ color: servicePackage.highlightColor }}>
            ${servicePackage.pricing[selectedSize]}
          </span>
        </p>
      </div>
    </div>
  );
}
