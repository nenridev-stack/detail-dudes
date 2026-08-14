'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BUSINESS_INFO } from '@/lib/constants';

/**
 * Se muestra después de que Stripe redirige de vuelta desde Checkout con un
 * payment_status exitoso.
 */
export default function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
      <motion.div
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

        <h1 className="text-3xl font-display font-bold text-white mb-3">
          Pago Recibido — ¡Todo Listo!
        </h1>

        <p className="text-gray-400 max-w-md mx-auto mb-2">
          Tu depósito de ${process.env.NEXT_PUBLIC_DEPOSIT_AMOUNT_USD || '50'} ha sido procesado y tu
          cita con {BUSINESS_INFO.name} está confirmada.
        </p>

        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
          Recibirás un correo de confirmación en breve con los detalles de tu cita.
          Si tienes alguna pregunta, llámanos al{' '}
          <a href={`tel:${BUSINESS_INFO.phone.replace(/[^+\d]/g, '')}`} className="text-accent-400 hover:text-accent-300">
            {BUSINESS_INFO.phone}
          </a>
          .
        </p>

        {sessionId && (
          <p className="text-xs text-gray-600 mb-8">Referencia: {sessionId.slice(-12)}</p>
        )}

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-500 text-white font-medium text-sm hover:bg-accent-400 transition-colors min-h-[44px]"
        >
          Volver al Inicio
        </Link>
      </motion.div>
    </div>
  );
}
