'use client';

import { useReducer, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import type { VehicleSize, ServicePackageId, AddOnId, BookingResponse } from '@/types';
import { SERVICE_PACKAGES, ADD_ONS, BUSINESS_INFO } from '@/lib/constants';
import StepIndicator from './StepIndicator';
import VehicleStep from './VehicleStep';
import DateTimeStep from './DateTimeStep';
import ContactStep from './ContactStep';
import PhotosStep from './PhotosStep';
import ServiceStep from './ServiceStep';
import ConfirmationStep from './ConfirmationStep';

// ============================================================
// Helper: Convert File to base64
// ============================================================

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ============================================================
// State Machine Types
// ============================================================

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface BookingFormState {
  currentStep: BookingStep;
  direction: 'forward' | 'backward';
  vehicle: VehicleSize | null;
  photos: File[];
  photosPreviews: string[];
  service: ServicePackageId | null;
  addOns: AddOnId[];
  estimatedPrice: number;
  date: string | null;
  timeSlot: string | null;
  contact: ContactInfo | null;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  fallbackContact: { phone: string; email: string } | null;
}

export type BookingFormAction =
  | { type: 'SET_VEHICLE'; payload: VehicleSize }
  | { type: 'ADD_PHOTO'; payload: File }
  | { type: 'REMOVE_PHOTO'; payload: number }
  | { type: 'SET_SERVICE'; payload: ServicePackageId }
  | { type: 'TOGGLE_ADDON'; payload: AddOnId }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_TIME_SLOT'; payload: string }
  | { type: 'SET_CONTACT'; payload: ContactInfo }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: BookingStep }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: { message: string; fallbackContact?: { phone: string; email: string } } }
  | { type: 'RESET_ERROR' };

// ============================================================
// Helper: Calculate estimated price
// ============================================================

function calculatePrice(
  vehicle: VehicleSize | null,
  service: ServicePackageId | null,
  addOns: AddOnId[]
): number {
  if (!vehicle || !service) return 0;
  const pkg = SERVICE_PACKAGES.find((p) => p.id === service);
  if (!pkg) return 0;
  const basePrice = pkg.pricing[vehicle];
  const addOnTotal = addOns.reduce((sum, addonId) => {
    const addon = ADD_ONS.find((a) => a.id === addonId);
    return sum + (addon?.price ?? 0);
  }, 0);
  return basePrice + addOnTotal;
}

// ============================================================
// Reducer
// ============================================================

function bookingReducer(
  state: BookingFormState,
  action: BookingFormAction
): BookingFormState {
  switch (action.type) {
    case 'SET_VEHICLE':
      return {
        ...state,
        vehicle: action.payload,
        estimatedPrice: calculatePrice(action.payload, state.service, state.addOns),
      };

    case 'ADD_PHOTO':
      return {
        ...state,
        photos: [...state.photos, action.payload],
        photosPreviews: [...state.photosPreviews, URL.createObjectURL(action.payload)],
      };

    case 'REMOVE_PHOTO': {
      const newPhotos = [...state.photos];
      const newPreviews = [...state.photosPreviews];
      // Revoke the object URL to prevent memory leaks
      if (newPreviews[action.payload]) {
        URL.revokeObjectURL(newPreviews[action.payload]);
      }
      newPhotos.splice(action.payload, 1);
      newPreviews.splice(action.payload, 1);
      return { ...state, photos: newPhotos, photosPreviews: newPreviews };
    }

    case 'SET_SERVICE':
      return {
        ...state,
        service: action.payload,
        estimatedPrice: calculatePrice(state.vehicle, action.payload, state.addOns),
      };

    case 'TOGGLE_ADDON': {
      const exists = state.addOns.includes(action.payload);
      const newAddOns = exists
        ? state.addOns.filter((id) => id !== action.payload)
        : [...state.addOns, action.payload];
      return {
        ...state,
        addOns: newAddOns,
        estimatedPrice: calculatePrice(state.vehicle, state.service, newAddOns),
      };
    }

    case 'SET_DATE':
      return { ...state, date: action.payload };

    case 'SET_TIME_SLOT':
      return { ...state, timeSlot: action.payload };

    case 'SET_CONTACT':
      return { ...state, contact: action.payload };

    case 'NEXT_STEP':
      if (state.currentStep >= 6) return state;
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
      return {
        ...state,
        currentStep: (state.currentStep + 1) as BookingStep,
        direction: 'forward',
      };

    case 'PREV_STEP':
      if (state.currentStep <= 1) return state;
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
      return {
        ...state,
        currentStep: (state.currentStep - 1) as BookingStep,
        direction: 'backward',
      };

    case 'GO_TO_STEP':
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
      return {
        ...state,
        currentStep: action.payload,
        direction: action.payload < state.currentStep ? 'backward' : 'forward',
      };

    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, submitError: null, fallbackContact: null };

    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, submitSuccess: true, submitError: null };

    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload.message,
        fallbackContact: action.payload.fallbackContact ?? null,
      };

    case 'RESET_ERROR':
      return { ...state, submitError: null, fallbackContact: null };

    default:
      return state;
  }
}

// ============================================================
// Animation Variants (directional slide)
// ============================================================

const stepVariants = {
  enterForward: { x: 300, opacity: 0 },
  enterBackward: { x: -300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitForward: { x: -300, opacity: 0 },
  exitBackward: { x: 300, opacity: 0 },
};

// ============================================================
// Step Labels
// ============================================================

const STEP_LABELS: Record<BookingStep, string> = {
  1: 'Tipo de Vehículo',
  2: 'Fotos de Condición',
  3: 'Selección de Servicio',
  4: 'Fecha y Hora',
  5: 'Info de Contacto',
  6: 'Confirmación',
};

// ============================================================
// BookingForm Component
// ============================================================

export default function BookingForm() {
  const searchParams = useSearchParams();

  const initialState: BookingFormState = {
    currentStep: 1,
    direction: 'forward',
    vehicle: null,
    photos: [],
    photosPreviews: [],
    service: null,
    addOns: [],
    estimatedPrice: 0,
    date: null,
    timeSlot: null,
    contact: null,
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
    fallbackContact: null,
  };

  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Pre-select service from URL query parameter ?package=
  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (
      packageParam &&
      ['basic-wash', 'full-detail', 'ceramic-coating'].includes(packageParam)
    ) {
      dispatch({
        type: 'SET_SERVICE',
        payload: packageParam as ServicePackageId,
      });
    }
  }, [searchParams]);

  const handleBack = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  // Handle form submission — uploads photos to Cloudinary first, then creates
  // a Stripe Checkout session for the $50 deposit. The Cloudinary URLs are stored
  // in session metadata so the webhook can include them in emails/calendar/sheets.
  const handleSubmit = useCallback(async () => {
    dispatch({ type: 'SUBMIT_START' });

    try {
      // Step 1: Upload photos to Cloudinary (if any)
      let photoUrls: string[] = [];
      if (state.photos.length > 0) {
        const photosBase64 = await Promise.all(
          state.photos.map((file) => fileToBase64(file))
        );

        const uploadResponse = await fetch('/api/upload-photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            photos: photosBase64,
            customerName: state.contact?.fullName || 'customer',
          }),
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success && uploadData.urls) {
          photoUrls = uploadData.urls;
        } else {
          console.warn('[Booking] Photo upload failed, continuing without photos:', uploadData.message);
        }
      }

      // Step 2: Create Stripe Checkout session with Cloudinary URLs
      const payload = {
        vehicleSize: state.vehicle,
        photos: photoUrls, // Now these are Cloudinary URLs (short strings)
        servicePackage: state.service,
        addOns: state.addOns,
        estimatedPrice: state.estimatedPrice,
        preferredDate: state.date,
        timeSlot: state.timeSlot,
        contact: state.contact,
      };

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: BookingResponse & { url?: string } = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout — payment confirmation happens via webhook
        window.location.href = data.url;
        return;
      }

      dispatch({
        type: 'SUBMIT_ERROR',
        payload: {
          message: data.message || 'Algo salió mal. Por favor intenta de nuevo.',
          fallbackContact: data.fallbackContact,
        },
      });
    } catch {
      // Network error or unexpected failure
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: {
          message: 'No se pudo conectar a nuestro servicio de reservas. Por favor intenta de nuevo o contáctanos directamente.',
          fallbackContact: {
            phone: BUSINESS_INFO.phone,
            email: BUSINESS_INFO.email,
          },
        },
      });
    }
  }, [state.photos, state.vehicle, state.service, state.addOns, state.estimatedPrice, state.date, state.timeSlot, state.contact]);

  // Render the current step content (placeholders for now)
  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return (
          <VehicleStep
            selectedVehicle={state.vehicle}
            onSelect={(vehicle) => dispatch({ type: 'SET_VEHICLE', payload: vehicle })}
            onNext={() => dispatch({ type: 'NEXT_STEP' })}
          />
        );
      case 2:
        return (
          <PhotosStep
            photos={state.photos}
            photosPreviews={state.photosPreviews}
            onAddPhoto={(file) => dispatch({ type: 'ADD_PHOTO', payload: file })}
            onRemovePhoto={(index) => dispatch({ type: 'REMOVE_PHOTO', payload: index })}
            onNext={() => dispatch({ type: 'NEXT_STEP' })}
            onSkip={() => dispatch({ type: 'NEXT_STEP' })}
          />
        );
      case 3:
        return (
          <ServiceStep
            vehicleSize={state.vehicle!}
            selectedService={state.service}
            selectedAddOns={state.addOns}
            estimatedPrice={state.estimatedPrice}
            onSelectService={(id) => dispatch({ type: 'SET_SERVICE', payload: id })}
            onToggleAddOn={(id) => dispatch({ type: 'TOGGLE_ADDON', payload: id })}
            onNext={() => dispatch({ type: 'NEXT_STEP' })}
          />
        );
      case 4:
        return (
          <DateTimeStep
            selectedDate={state.date}
            selectedTimeSlot={state.timeSlot}
            onDateChange={(date) => dispatch({ type: 'SET_DATE', payload: date })}
            onTimeSlotChange={(slot) => dispatch({ type: 'SET_TIME_SLOT', payload: slot })}
            onNext={() => dispatch({ type: 'NEXT_STEP' })}
          />
        );
      case 5:
        return (
          <ContactStep
            contact={state.contact}
            onContactChange={(contact) => dispatch({ type: 'SET_CONTACT', payload: contact })}
            onNext={() => dispatch({ type: 'NEXT_STEP' })}
          />
        );
      case 6:
        return (
          <ConfirmationStep
            vehicle={state.vehicle!}
            photosCount={state.photos.length}
            service={state.service!}
            addOns={state.addOns}
            estimatedPrice={state.estimatedPrice}
            date={state.date!}
            timeSlot={state.timeSlot!}
            contact={state.contact!}
            isSubmitting={state.isSubmitting}
            onGoToStep={(step) => dispatch({ type: 'GO_TO_STEP', payload: step })}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  // Success state
  if (state.submitSuccess) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4">
        <motion.div
          className="py-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-3">
            ¡Solicitud de Reserva Recibida!
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-4">
            Gracias por elegir {BUSINESS_INFO.name}. Tu solicitud de reserva ha sido enviada exitosamente.
          </p>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {`Revisaremos tus fotos y confirmaremos el precio final dentro de 24 horas.`}
            {' '}Recibirás un correo de confirmación en{' '}
            <span className="font-medium text-gray-300">{state.contact?.email}</span>.
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="px-6 py-3 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors inline-block min-h-[44px]"
            >
              Volver al Inicio
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (state.submitError) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4">
        <motion.div
          className="py-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-3">
            No Se Pudo Procesar la Reserva
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            {state.submitError}
          </p>
          {state.fallbackContact && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-sm mx-auto mb-8">
              <p className="text-sm font-medium text-gray-300 mb-3">
                Contáctanos directamente:
              </p>
              <div className="space-y-2 text-sm">
                <a
                  href={`tel:${state.fallbackContact.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center justify-center gap-2 text-accent-400 hover:text-accent-300 transition-colors min-h-[44px]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {state.fallbackContact.phone}
                </a>
                <a
                  href={`mailto:${state.fallbackContact.email}`}
                  className="flex items-center justify-center gap-2 text-accent-400 hover:text-accent-300 transition-colors min-h-[44px]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {state.fallbackContact.email}
                </a>
              </div>
            </div>
          )}
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => dispatch({ type: 'RESET_ERROR' })}
              className="px-6 py-3 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors min-h-[44px] min-w-[44px]"
            >
              Intentar de Nuevo
            </button>
            <a
              href="/"
              className="px-6 py-3 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors inline-flex items-center min-h-[44px] min-w-[44px]"
            >
              Volver al Inicio
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Step Indicator */}
      <StepIndicator
        currentStep={state.currentStep}
        totalSteps={6}
        stepLabels={STEP_LABELS}
        onBack={handleBack}
      />

      {/* Step Content — rendered directly without animation to prevent blank flashes */}
      <div className="relative min-h-[300px]">
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <div>
          {state.currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px]"
            >
              Atrás
            </button>
          )}
        </div>
        <div>
          {state.currentStep < 6 && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'NEXT_STEP' })}
              className="px-6 py-3 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors min-h-[44px] min-w-[44px]"
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
