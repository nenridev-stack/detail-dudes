import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

/**
 * Lazily initialized Stripe client to avoid crashing dev mode
 * when the secret key is missing.
 */
export function getStripeClient(): Stripe {
  if (!stripeClient) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
    }
    stripeClient = new Stripe(apiKey, {
      apiVersion: '2026-06-24.dahlia',
    });
  }
  return stripeClient;
}

export const DEPOSIT_AMOUNT_USD = Number(process.env.DEPOSIT_AMOUNT_USD || 50);
