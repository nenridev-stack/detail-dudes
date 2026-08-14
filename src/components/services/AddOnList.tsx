'use client';

import { motion } from 'framer-motion';
import {
  Check,
  PawPrint,
  Wind,
  Cog,
  Lightbulb,
  Eraser,
  Armchair,
  Plus,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { AddOn, AddOnId } from '@/types';

/** Map of icon names to Lucide icon components */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  PawPrint,
  Wind,
  Cog,
  Lightbulb,
  Eraser,
  Armchair,
  Plus,
};

interface AddOnListProps {
  /** Array of available add-ons to display */
  addOns: AddOn[];
  /** IDs of currently selected add-ons (interactive mode only) */
  selectedAddOns?: AddOnId[];
  /** Callback when an add-on is toggled (interactive mode only) */
  onToggle?: (id: AddOnId) => void;
  /** When true, shows interactive toggle checkboxes. When false, displays as a static list. */
  interactive?: boolean;
}

/**
 * Add-on list component with spring-toggle checkboxes.
 * Supports two modes:
 * - Display only (Services page): shows the list without toggles
 * - Interactive (Booking form): shows toggle checkboxes with running total
 *
 * Validates: Requirements 3.3
 */
export function AddOnList({
  addOns,
  selectedAddOns = [],
  onToggle,
  interactive = false,
}: AddOnListProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full">
      <ul className="space-y-3">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOns.includes(addOn.id);
          const IconComponent = ICON_MAP[addOn.icon] ?? Plus;

          return (
            <li key={addOn.id}>
              {interactive ? (
                <button
                  type="button"
                  onClick={() => onToggle?.(addOn.id)}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-xl border transition-colors duration-200
                    min-h-[44px] text-left
                    ${
                      isSelected
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }
                  `}
                  aria-pressed={isSelected}
                >
                  {/* Toggle Indicator */}
                  <div
                    className={`
                      relative flex items-center justify-center w-6 h-6 rounded-md border-2 shrink-0 transition-colors duration-200
                      ${
                        isSelected
                          ? 'border-accent-500 bg-accent-500'
                          : 'border-slate-300 bg-white'
                      }
                    `}
                  >
                    <motion.div
                      initial={false}
                      animate={
                        prefersReducedMotion
                          ? { opacity: isSelected ? 1 : 0 }
                          : {
                              scale: isSelected ? 1 : 0,
                              opacity: isSelected ? 1 : 0,
                            }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 400, damping: 15 }
                      }
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 shrink-0">
                    <IconComponent className="w-4 h-4 text-slate-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {addOn.name}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {addOn.description}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="text-sm font-semibold text-slate-900 shrink-0">
                    +${addOn.price}
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 shrink-0">
                    <IconComponent className="w-4 h-4 text-slate-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {addOn.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {addOn.description}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="text-sm font-semibold text-slate-900 shrink-0">
                    +${addOn.price}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Running Total (Interactive mode only) */}
      {interactive && selectedAddOns.length > 0 && (
        <motion.div
          className="mt-4 p-3 rounded-lg bg-accent-50 border border-accent-200"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 300, damping: 20 }
          }
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? 's' : ''} selected
            </span>
            <span className="text-sm font-bold text-accent-700">
              +$
              {addOns
                .filter((a) => selectedAddOns.includes(a.id))
                .reduce((sum, a) => sum + a.price, 0)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
