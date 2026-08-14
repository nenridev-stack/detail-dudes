import type { Metadata } from 'next';
import Link from 'next/link';
import { faqCategories } from '@/data/faq';
import Accordion from '@/components/faq/Accordion';

export const metadata: Metadata = {
  title: 'FAQ — Detail Dudes',
  description:
    'Find answers to common questions about our auto detailing services, pricing, service area, vehicle preparation, and cancellation policy.',
  openGraph: {
    title: 'FAQ — Detail Dudes',
    description:
      'Find answers to common questions about our auto detailing services, pricing, service area, vehicle preparation, and cancellation policy.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FAQ — Detail Dudes',
    description:
      'Find answers to common questions about our auto detailing services.',
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-black pt-24">
      {/* Header */}
      <section className="border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-400">
            Got questions? We&apos;ve got answers. Browse by category below or
            contact us directly.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <Accordion categories={faqCategories} />
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-400 mb-8">
            We&apos;re happy to help. Contact us directly or book your
            appointment today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-accent-500 text-accent-400 font-semibold hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Contact Us
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
