import type { Metadata } from 'next';
import { SERVICE_PACKAGES, ADD_ONS } from '@/lib/constants';
import { ServicesContent } from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services & Pricing | Auto Detailing',
  description:
    'Professional auto detailing packages — Basic Wash, Full Interior+Exterior, and Ceramic Coating with transparent pricing by vehicle size.',
  openGraph: {
    title: 'Services & Pricing | Auto Detailing',
    description:
      'Professional auto detailing packages with transparent pricing by vehicle size.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services & Pricing | Auto Detailing',
    description:
      'Professional auto detailing packages with transparent pricing by vehicle size.',
  },
};

/**
 * Services & Pricing page — server component shell.
 * Displays service packages, add-ons, and pricing with animations.
 *
 * Validates: Requirements 3.4, 3.5, 12.1, 12.2
 */
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <ServicesContent
        packages={SERVICE_PACKAGES}
        addOns={ADD_ONS}
      />
    </main>
  );
}
