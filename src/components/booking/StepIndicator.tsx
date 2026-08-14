'use client';

import { motion } from 'framer-motion';
import type { BookingStep } from './BookingForm';

interface StepIndicatorProps {
  currentStep: BookingStep;
  totalSteps: number;
  stepLabels: Record<BookingStep, string>;
  onBack: () => void;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  stepLabels,
  onBack,
}: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Current step label and counter */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Go back to previous step"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </button>
          )}
        </div>
        <p className="text-sm text-gray-400 font-medium">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = (i + 1) as BookingStep;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div key={step} className="flex items-center gap-2">
              {/* Dot */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                    transition-colors duration-200
                    ${isActive
                      ? 'bg-accent-500 text-white'
                      : isCompleted
                        ? 'bg-accent-500/20 text-accent-400'
                        : 'bg-white/10 text-gray-600'
                    }
                  `}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    step
                  )}
                </motion.div>

                {/* Active dot glow ring */}
                {isActive && (
                  <motion.div
                    layoutId="step-glow"
                    className="absolute inset-0 rounded-full border-2 border-accent-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{ margin: -3 }}
                  />
                )}
              </div>

              {/* Connector line between dots */}
              {step < totalSteps && (
                <div
                  className={`w-4 h-0.5 sm:w-6 rounded-full transition-colors duration-200 ${
                    isCompleted ? 'bg-accent-500/40' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step label */}
      <motion.p
        key={currentStep}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm font-medium text-white mt-3"
      >
        {stepLabels[currentStep]}
      </motion.p>
    </div>
  );
}
