'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ContactInfo } from './BookingForm';

// ============================================================
// Props Interface
// ============================================================

interface ContactStepProps {
  contact: ContactInfo | null;
  onContactChange: (contact: ContactInfo) => void;
  onNext: () => void;
}

// ============================================================
// Validation Helpers
// ============================================================

interface FieldError {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

function validateFullName(value: string): string | undefined {
  if (!value.trim()) return 'El nombre completo es requerido';
  if (value.length > 100) return 'El nombre debe tener 100 caracteres o menos';
  return undefined;
}

function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'El correo es requerido';
  // Simple regex: includes @ and .
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Por favor ingresa un correo válido';
  return undefined;
}

function validatePhone(value: string): string | undefined {
  if (!value.trim()) return 'El número de teléfono es requerido';
  // Accept any phone number with at least 7 digits
  const digits = value.replace(/\D/g, '');
  if (digits.length < 7) return 'Por favor ingresa un número de teléfono válido';
  if (digits.length > 15) return 'El número de teléfono es muy largo';
  return undefined;
}

function validateNotes(value: string): string | undefined {
  if (value.length > 500) return 'Las notas deben tener 500 caracteres o menos';
  return undefined;
}

function validateAddress(value: string): string | undefined {
  if (!value.trim()) return 'La dirección de servicio es requerida para saber dónde detallar tu vehículo';
  if (value.trim().length < 5) return 'Por favor ingresa una dirección más completa';
  if (value.length > 300) return 'La dirección debe tener 300 caracteres o menos';
  return undefined;
}

function validateAll(form: FormFields): FieldError {
  const errors: FieldError = {};
  const nameErr = validateFullName(form.fullName);
  if (nameErr) errors.fullName = nameErr;
  const emailErr = validateEmail(form.email);
  if (emailErr) errors.email = emailErr;
  const phoneErr = validatePhone(form.phone);
  if (phoneErr) errors.phone = phoneErr;
  const addressErr = validateAddress(form.address);
  if (addressErr) errors.address = addressErr;
  const notesErr = validateNotes(form.notes);
  if (notesErr) errors.notes = notesErr;
  return errors;
}

// ============================================================
// Phone Formatting
// ============================================================

function formatPhoneNumber(value: string): string {
  // Strip all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Remove leading 1 if present (country code)
  const cleaned = digits.startsWith('1') && digits.length > 10
    ? digits.slice(1)
    : digits;

  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
}

// ============================================================
// Shake Animation Variant
// ============================================================

const shakeVariants = {
  shake: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 },
  },
  idle: { x: 0 },
};

// ============================================================
// Form Fields Type
// ============================================================

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

// ============================================================
// FloatingLabelInput Component
// ============================================================

interface FloatingLabelInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  shaking?: boolean;
  type?: string;
  maxLength?: number;
  showCounter?: boolean;
  isTextarea?: boolean;
  required?: boolean;
}

function FloatingLabelInput({
  id,
  label,
  value,
  onChange,
  error,
  shaking,
  type = 'text',
  maxLength,
  showCounter,
  isTextarea,
  required,
}: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  const inputClasses = `
    w-full min-h-[44px] px-4 pt-5 pb-2 rounded-lg border text-sm
    bg-white/5 text-white placeholder:text-gray-500 transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500
    ${error ? 'border-red-500 ring-1 ring-red-500/30' : 'border-white/10 hover:border-white/20'}
  `;

  const labelClasses = `
    absolute left-4 transition-all duration-200 pointer-events-none
    ${isFloating
      ? 'top-1.5 text-xs font-medium ' + (error ? 'text-red-400' : 'text-accent-400')
      : 'top-3.5 text-sm text-gray-500'
    }
  `;

  return (
    <motion.div
      className="relative"
      variants={shakeVariants}
      animate={shaking ? 'shake' : 'idle'}
    >
      <div className="relative">
        {isTextarea ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${inputClasses} resize-none min-h-[120px]`}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-required={required}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={inputClasses}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            aria-required={required}
          />
        )}
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          id={`${id}-error`}
          className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 flex-shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </motion.p>
      )}

      {/* Character counter for notes */}
      {showCounter && maxLength && (
        <p className={`mt-1 text-xs text-right ${value.length > maxLength ? 'text-red-400' : 'text-gray-500'}`}>
          {value.length}/{maxLength}
        </p>
      )}
    </motion.div>
  );
}

// ============================================================
// ContactStep Component
// ============================================================

export default function ContactStep({ contact, onContactChange, onNext }: ContactStepProps) {
  const [form, setForm] = useState<FormFields>({
    fullName: contact?.fullName ?? '',
    email: contact?.email ?? '',
    phone: contact?.phone ?? '',
    address: contact?.address ?? '',
    notes: contact?.notes ?? '',
  });

  const [errors, setErrors] = useState<FieldError>({});
  const [shakingFields, setShakingFields] = useState<Set<string>>(new Set());

  const updateField = useCallback((field: keyof FormFields, value: string) => {
    // Format phone as user types
    const processedValue = field === 'phone' ? formatPhoneNumber(value) : value;
    setForm((prev) => ({ ...prev, [field]: processedValue }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const triggerShake = useCallback((fields: string[]) => {
    setShakingFields(new Set(fields));
    // Reset shaking after animation duration
    setTimeout(() => {
      setShakingFields(new Set());
    }, 500);
  }, []);

  const handleNext = useCallback(() => {
    const validationErrors = validateAll(form);
    setErrors(validationErrors);

    const errorFields = Object.keys(validationErrors);
    if (errorFields.length > 0) {
      triggerShake(errorFields);
      return;
    }

    // Build contact info and pass up
    const contactInfo: ContactInfo = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
    };

    onContactChange(contactInfo);
    onNext();
  }, [form, onContactChange, onNext, triggerShake]);

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Tu Información de Contacto
        </h2>
        <p className="text-gray-400 text-sm">
          Usaremos esto para confirmar tu reserva y comunicarnos sobre tu cita.
        </p>
      </div>

      <div className="space-y-5 max-w-md mx-auto">
        {/* Nombre Completo */}
        <FloatingLabelInput
          id="contact-fullname"
          label="Nombre Completo"
          value={form.fullName}
          onChange={(v) => updateField('fullName', v)}
          error={errors.fullName}
          shaking={shakingFields.has('fullName')}
          maxLength={100}
          required
        />

        {/* Correo */}
        <FloatingLabelInput
          id="contact-email"
          label="Correo Electrónico"
          value={form.email}
          onChange={(v) => updateField('email', v)}
          error={errors.email}
          shaking={shakingFields.has('email')}
          type="email"
          required
        />

        {/* Teléfono */}
        <FloatingLabelInput
          id="contact-phone"
          label="Número de Teléfono"
          value={form.phone}
          onChange={(v) => updateField('phone', v)}
          error={errors.phone}
          shaking={shakingFields.has('phone')}
          type="tel"
          required
        />

        {/* Dirección de Servicio */}
        <FloatingLabelInput
          id="contact-address"
          label="Dirección de Servicio (donde detallaremos tu auto)"
          value={form.address}
          onChange={(v) => updateField('address', v)}
          error={errors.address}
          shaking={shakingFields.has('address')}
          maxLength={300}
          required
        />

        {/* Notas (opcional) */}
        <FloatingLabelInput
          id="contact-notes"
          label="Notas Adicionales"
          value={form.notes}
          onChange={(v) => updateField('notes', v)}
          error={errors.notes}
          shaking={shakingFields.has('notes')}
          maxLength={500}
          showCounter
          isTextarea
        />
      </div>

      {/* Botón Siguiente */}
      <div className="mt-8 flex justify-center">
        <motion.button
          type="button"
          onClick={handleNext}
          className="px-8 py-3 rounded-lg bg-accent-500 text-white font-medium text-sm
            hover:bg-accent-600 transition-colors min-h-[44px] min-w-[44px]
            focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 focus:ring-offset-black"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Revisar Reserva
        </motion.button>
      </div>
    </div>
  );
}
