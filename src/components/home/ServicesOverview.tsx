'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICE_PACKAGES } from '@/lib/constants';
import { ScrollReveal } from '@/components/motion';

/**
 * Services overview section with dark glass cards on black background.
 */
export function ServicesOverview() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Subtle central glow radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-[200px]" />

      {/* Car silhouette watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 800 250" className="w-[1200px] h-auto" fill="white">
          <path d="M 120 180 C 120 180, 140 180, 160 178 L 200 178 C 210 178, 215 175, 220 170 L 260 130 C 265 125, 270 120, 280 118 L 380 105 C 400 102, 420 100, 450 100 L 550 100 C 580 100, 600 102, 620 108 L 680 128 C 685 130, 690 135, 692 140 L 700 160 C 702 165, 700 170, 700 175 L 700 178 C 710 178, 720 180, 720 180 L 720 185 C 720 190, 715 192, 710 192 L 130 192 C 125 192, 120 190, 120 185 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-3">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              From a quick wash to full ceramic protection, we have the right
              package for your vehicle.
            </p>
          </div>
        </ScrollReveal>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICE_PACKAGES.map((pkg, index) => {
            const isPopular = pkg.id === 'full-detail';
            const iconMap: Record<string, string> = {
              Droplets: '💧',
              Sparkles: '✨',
              Shield: '🛡️',
            };

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 backdrop-blur-lg border ${
                    isPopular
                      ? 'bg-white/[0.07] border-accent-500/50 shadow-glow-sm hover:shadow-glow-md'
                      : 'bg-white/5 border-white/10 hover:border-accent-500/30 hover:shadow-glow-sm'
                  } hover:scale-[1.02]`}
                >
                  {/* Most Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-accent-500 px-4 py-1 text-xs font-semibold text-white shadow-glow-sm">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    <span className="text-2xl" aria-hidden="true">
                      {iconMap[pkg.icon] || '⭐'}
                    </span>
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-400 mb-5 text-sm leading-relaxed">
                    {pkg.shortDescription}
                  </p>

                  {/* Price range */}
                  <div className="mb-5">
                    <span className="text-2xl font-bold text-white">
                      ${pkg.pricing.sedan}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      – ${pkg.pricing.truck}
                    </span>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {pkg.includedServices.slice(0, 5).map((service) => (
                      <li
                        key={service}
                        className="flex items-start gap-2.5 text-sm text-gray-300"
                      >
                        <svg
                          className="w-4 h-4 mt-0.5 shrink-0 text-accent-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {service}
                      </li>
                    ))}
                    {pkg.includedServices.length > 5 && (
                      <li className="text-xs text-gray-500 pl-6">
                        + {pkg.includedServices.length - 5} more included
                      </li>
                    )}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/book"
                    className={`inline-flex items-center justify-center w-full rounded-lg py-3 text-sm font-semibold transition-all duration-200 ${
                      isPopular
                        ? 'bg-accent-500 text-white hover:bg-accent-400 shadow-glow-sm hover:shadow-glow-md'
                        : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
                    }`}
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-accent-400 hover:text-accent-300 font-medium transition-colors"
          >
            View all service details
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
