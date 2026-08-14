'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { contactFormSchema, type ContactFormSchemaType } from '@/lib/validation';
import { MagneticButton } from '@/components/motion/MagneticButton';

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
            className={`${inputClasses} resize-none min-h-[160px]`}
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
        <motion.label
          htmlFor={id}
          className={labelClasses}
          animate={isFloating ? { top: 6, fontSize: '0.75rem' } : { top: 14, fontSize: '0.875rem' }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </motion.label>
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

      {/* Character counter */}
      {showCounter && maxLength && (
        <p className={`mt-1 text-xs text-right ${value.length > maxLength ? 'text-red-400' : 'text-gray-500'}`}>
          {value.length}/{maxLength}
        </p>
      )}
    </motion.div>
  );
}

// ============================================================
// ContactForm Component
// ============================================================

type FieldErrors = Partial<Record<keyof ContactFormSchemaType, string>>;

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormSchemaType>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [shakingFields, setShakingFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateField = useCallback((field: keyof ContactFormSchemaType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const triggerShake = useCallback((fields: string[]) => {
    setShakingFields(new Set(fields));
    setTimeout(() => {
      setShakingFields(new Set());
    }, 500);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = contactFormSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      const errorFields: string[] = [];

      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ContactFormSchemaType;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
          errorFields.push(field);
        }
      });

      setErrors(fieldErrors);
      triggerShake(errorFields);
      return;
    }

    // Submit the form
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [form, triggerShake]);

  // Success state
  if (submitStatus === 'success') {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-green-400"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-display font-bold text-white mb-2">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Gracias por contactarnos. Te responderemos dentro de 24 horas.
        </p>
        <button
          type="button"
          onClick={() => setSubmitStatus('idle')}
          className="mt-6 text-accent-400 font-medium text-sm hover:text-accent-300 transition-colors"
        >
          Enviar otro mensaje
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Nombre */}
      <FloatingLabelInput
        id="contact-name"
        label="Nombre"
        value={form.name}
        onChange={(v) => updateField('name', v)}
        error={errors.name}
        shaking={shakingFields.has('name')}
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

      {/* Asunto */}
      <FloatingLabelInput
        id="contact-subject"
        label="Asunto"
        value={form.subject}
        onChange={(v) => updateField('subject', v)}
        error={errors.subject}
        shaking={shakingFields.has('subject')}
        maxLength={200}
        required
      />

      {/* Mensaje */}
      <FloatingLabelInput
        id="contact-message"
        label="Mensaje"
        value={form.message}
        onChange={(v) => updateField('message', v)}
        error={errors.message}
        shaking={shakingFields.has('message')}
        maxLength={2000}
        showCounter
        isTextarea
        required
      />

      {/* Banner de error */}
      {submitStatus === 'error' && (
        <motion.div
          className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
        >
          <p className="text-sm text-red-400 font-medium mb-1">
            No se pudo enviar tu mensaje
          </p>
          <p className="text-xs text-red-400/80">
            Por favor intenta de nuevo, o contáctanos directamente al{' '}
            <a href="tel:+15551234567" className="underline font-medium">
              (555) 123-4567
            </a>{' '}
            o{' '}
            <a href="mailto:info@primeauradetailing.com" className="underline font-medium">
              info@primeauradetailing.com
            </a>
          </p>
        </motion.div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <MagneticButton className="w-full">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-3.5 rounded-lg bg-accent-500 text-white font-medium text-sm
              hover:bg-accent-600 transition-colors min-h-[44px]
              focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 focus:ring-offset-black
              disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Enviando...
              </span>
            ) : (
              'Enviar Mensaje'
            )}
          </motion.button>
        </MagneticButton>
      </div>
    </form>
  );
}
