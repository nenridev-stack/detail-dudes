'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Droplets, Sparkles, Shield, Package } from 'lucide-react';
import { TiltCard } from '@/components/motion';
import { hoverEffects } from '@/lib/motion-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ServicePackage, VehicleSize } from '@/types';
import { VEHICLE_OPTIONS } from '@/lib/constants';

/** Map of icon names to Lucide icon components */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Sparkles,
  Shield,
  Package,
};

interface PackageCardProps {
  /** The service package to display */
  servicePackage: ServicePackage;
}

/**
 * Service package card with 3D tilt hover effect displaying package name,
 * description, included services list, per-VehicleSize pricing, and CTA button.
 *
 * Validates: Requirements 3.1, 3.2
 */
export function PackageCard({ servicePackage }: PackageCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const {
    id,
    name,
    description,
    icon,
    includedServices,
    pricing,
    highlightColor,
  } = servicePackage;

  // Resolve the Lucide icon from our map
  const IconComponent = ICON_MAP[icon] ?? Package;

  return (
    <TiltCard className="h-full">
      <motion.div
        className="relative flex flex-col h-full rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden"
        whileHover={prefersReducedMotion ? undefined : hoverEffects.lift}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: highlightColor }}
        />

        <div className="flex flex-col flex-1 p-6">
          {/* Icon and Name */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: `${highlightColor}20`, color: highlightColor }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{name}</h3>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Included Services List */}
          <div className="mb-6 flex-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Included Services
            </h4>
            <ul className="space-y-1.5">
              {includedServices.map((service) => (
                <li key={service} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: highlightColor }}
                  />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Section */}
          <div className="border-t border-slate-100 pt-4 mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Pricing
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {VEHICLE_OPTIONS.map((vehicle) => (
                <div key={vehicle.id} className="text-center">
                  <p className="text-xs text-slate-500">{vehicle.label}</p>
                  <p className="text-sm font-semibold text-slate-900">
                    Starting at{' '}
                    <span style={{ color: highlightColor }}>
                      ${pricing[vehicle.id as VehicleSize]}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={`/book?package=${id}`}
            className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold text-white rounded-lg transition-colors duration-200 min-w-[44px] min-h-[44px]"
            style={{ backgroundColor: highlightColor }}
          >
            Book This Package →
          </Link>
        </div>
      </motion.div>
    </TiltCard>
  );
}
