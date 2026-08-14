'use client';

import { motion } from 'framer-motion';
import type { VehicleSize, ServicePackageId, AddOnId } from '@/types';
import type { ContactInfo, BookingStep } from './BookingForm';
import { SERVICE_PACKAGES, ADD_ONS, VEHICLE_OPTIONS } from '@/lib/constants';

// ============================================================
// Props Interface
// ============================================================

interface ConfirmationStepProps {
  vehicle: VehicleSize;
  photosCount: number;
  service: ServicePackageId;
  addOns: AddOnId[];
  estimatedPrice: number;
  date: string;
  timeSlot: string;
  contact: ContactInfo;
  isSubmitting: boolean;
  onGoToStep: (step: BookingStep) => void;
  onSubmit: () => void;
}

// ============================================================
// Animation Variants
// ============================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ============================================================
// Helper: Resolve display names
// ============================================================

function getVehicleLabel(id: VehicleSize): string {
  return VEHICLE_OPTIONS.find((v) => v.id === id)?.label ?? id;
}

function getServicePackage(id: ServicePackageId) {
  return SERVICE_PACKAGES.find((p) => p.id === id);
}

function getAddOnNames(ids: AddOnId[]): string[] {
  return ids
    .map((id) => ADD_ONS.find((a) => a.id === id)?.name)
    .filter((name): name is string => !!name);
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// ============================================================
// SummaryCard Component
// ============================================================

interface SummaryCardProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}

function SummaryCard({ title, onEdit, children }: SummaryCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-accent-400 hover:text-accent-300 
            transition-colors px-2 py-1 rounded hover:bg-white/5
            min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={`Edit ${title}`}
        >
          Edit
        </button>
      </div>
      <div className="text-sm text-gray-300">{children}</div>
    </motion.div>
  );
}

// ============================================================
// ConfirmationStep Component
// ============================================================

export default function ConfirmationStep({
  vehicle,
  photosCount,
  service,
  addOns,
  estimatedPrice,
  date,
  timeSlot,
  contact,
  isSubmitting,
  onGoToStep,
  onSubmit,
}: ConfirmationStepProps) {
  const servicePackage = getServicePackage(service);
  const addOnNames = getAddOnNames(addOns);

  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Review Your Booking
        </h2>
        <p className="text-gray-400 text-sm">
          Please review your selections below. Click &quot;Edit&quot; to make changes.
        </p>
      </div>

      {/* Summary Cards */}
      <motion.div
        className="space-y-4 max-w-lg mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Vehicle Type */}
        <SummaryCard title="Vehicle Type" onEdit={() => onGoToStep(1)}>
          <p className="font-medium text-white">{getVehicleLabel(vehicle)}</p>
        </SummaryCard>

        {/* Condition Photos */}
        <SummaryCard title="Condition Photos" onEdit={() => onGoToStep(2)}>
          <p>
            {photosCount > 0
              ? `${photosCount} photo${photosCount > 1 ? 's' : ''} uploaded`
              : 'No photos uploaded (skipped)'}
          </p>
        </SummaryCard>

        {/* Service Package */}
        <SummaryCard title="Service Package" onEdit={() => onGoToStep(3)}>
          {servicePackage ? (
            <div>
              <p className="font-medium text-white mb-1">{servicePackage.name}</p>
              <ul className="text-xs text-gray-400 space-y-0.5 list-disc list-inside">
                {servicePackage.includedServices.slice(0, 4).map((svc) => (
                  <li key={svc}>{svc}</li>
                ))}
                {servicePackage.includedServices.length > 4 && (
                  <li className="text-gray-500">
                    +{servicePackage.includedServices.length - 4} more included
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <p>No service selected</p>
          )}
        </SummaryCard>

        {/* Add-Ons */}
        <SummaryCard title="Add-Ons" onEdit={() => onGoToStep(3)}>
          {addOnNames.length > 0 ? (
            <ul className="space-y-0.5">
              {addOnNames.map((name) => (
                <li key={name} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                  {name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No add-ons selected</p>
          )}
        </SummaryCard>

        {/* Estimated Price */}
        <SummaryCard title="Estimated Price" onEdit={() => onGoToStep(3)}>
          <p className="text-xl font-bold text-accent-400">${estimatedPrice}</p>
        </SummaryCard>

        {/* Date & Time */}
        <SummaryCard title="Preferred Date & Time" onEdit={() => onGoToStep(4)}>
          <p className="font-medium text-white">{formatDate(date)}</p>
          <p className="text-gray-400">{timeSlot}</p>
        </SummaryCard>

        {/* Contact Info */}
        <SummaryCard title="Contact Information" onEdit={() => onGoToStep(5)}>
          <div className="space-y-1">
            <p className="font-medium text-white">{contact.fullName}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p className="text-gray-400">{contact.address}</p>
            {contact.notes && (
              <p className="text-gray-500 italic text-xs mt-2">
                Notes: {contact.notes}
              </p>
            )}
          </div>
        </SummaryCard>
      </motion.div>

      {/* Deposit notice */}
      <div className="mt-6 max-w-md mx-auto rounded-xl border border-accent-500/30 bg-accent-500/5 p-4 text-center">
        <p className="text-sm text-white font-medium">
          ${process.env.NEXT_PUBLIC_DEPOSIT_AMOUNT_USD || '50'} refundable deposit required to confirm
        </p>
        <p className="text-xs text-gray-400 mt-1">
          This secures your appointment slot. The deposit is applied to your final price.
          Remaining balance is confirmed after vehicle inspection.
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 text-center mt-4 max-w-md mx-auto">
        By continuing, you agree that pricing is an estimate. You&apos;ll be redirected to our
        secure payment page to complete your deposit.
      </p>

      {/* Submit Button */}
      <div className="mt-8 flex justify-center">
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 rounded-lg bg-accent-500 text-white font-medium text-sm
            hover:bg-accent-600 transition-colors min-h-[44px] min-w-[44px]
            focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 focus:ring-offset-black
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-accent-500"
          whileHover={!isSubmitting ? { scale: 1.03 } : undefined}
          whileTap={!isSubmitting ? { scale: 0.97 } : undefined}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Redirecting to payment…
            </span>
          ) : (
            `Pay $${process.env.NEXT_PUBLIC_DEPOSIT_AMOUNT_USD || '50'} & Confirm Booking`
          )}
        </motion.button>
      </div>
    </div>
  );
}
