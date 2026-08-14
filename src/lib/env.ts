/**
 * Environment variable access module.
 *
 * Provides typed access to environment variables with fallback defaults
 * for development. In production (Vercel), set these in the dashboard.
 */

interface EnvConfig {
  N8N_WEBHOOK_URL: string;
  RESEND_API_KEY: string;
  NEXT_PUBLIC_BUSINESS_NAME: string;
  BUSINESS_EMAIL: string;
}

/**
 * Get environment config. Uses fallback values in development
 * so the dev server doesn't crash without a .env.local file.
 */
function getEnvConfig(): EnvConfig {
  return {
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || 'https://placeholder-webhook.example.com/booking',
    RESEND_API_KEY: process.env.RESEND_API_KEY || 'placeholder_resend_key',
    NEXT_PUBLIC_BUSINESS_NAME: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'PrimeAura Detailing',
    BUSINESS_EMAIL: process.env.BUSINESS_EMAIL || 'info@primeauradetailing.com',
  };
}

export const env = getEnvConfig();
