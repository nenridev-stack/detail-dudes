'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Info, ShieldCheck } from 'lucide-react';
import { ScrollReveal, StaggeredGrid } from '@/components/motion';
import { PackageCard, VehicleShowcase, AddOnList } from '@/components/services';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ServicePackage, AddOn } from '@/types';

interface ServicesContentProps {
  packages: ServicePackage[];
  addOns: AddOn[];
}

/**
 * Client component for the Services page content.
 * Assembles PackageCard grid, VehicleShowcase, AddOnList, pricing disclaimer,
 * and per-package CTAs with ScrollReveal and StaggeredGrid animations.
 *
 * Validates: Requirements 3.4, 3.5, 12.1, 12.2
 */
export function ServicesContent({ packages, addOns }: ServicesContentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pb-20 bg-black">
      {/* Hero / Header Section */}
      <ScrollReveal>
        <section className="pt-24 pb-12 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services &amp; Pricing
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From a quick refresh to full ceramic protection, we offer detailing
            packages tailored to every vehicle and budget. All services performed
            by certified professionals.
          </p>
        </section>
      </ScrollReveal>

      {/* Service Packages Section */}
      <section className="px-4 max-w-7xl mx-auto mb-16">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Detailing Packages
          </h2>
        </ScrollReveal>

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} servicePackage={pkg} />
          ))}
        </StaggeredGrid>
      </section>

      {/* Vehicle Showcase Section */}
      <section className="px-4 max-w-5xl mx-auto mb-16">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Pricing by Vehicle Size
          </h2>
          <p className="text-sm text-gray-400 text-center mb-8">
            Select a vehicle type to see service-specific imagery and pricing.
          </p>
        </ScrollReveal>

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <ScrollReveal key={pkg.id}>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white text-center mb-4">
                  {pkg.name}
                </h3>
                <VehicleShowcase servicePackage={pkg} />
              </div>
            </ScrollReveal>
          ))}
        </StaggeredGrid>
      </section>

      {/* Add-Ons Section */}
      <section className="px-4 max-w-3xl mx-auto mb-16">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Available Add-Ons
          </h2>
          <p className="text-sm text-gray-400 text-center mb-8">
            Enhance any package with these additional services.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <AddOnList addOns={addOns} interactive={false} />
        </ScrollReveal>
      </section>

      {/* Pricing Disclaimer */}
      <ScrollReveal>
        <section className="px-4 max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Info className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Pricing Notice
            </span>
          </div>
          <p className="text-sm text-gray-400 italic border-t border-white/10 pt-4">
            * All prices shown are starting estimates. Final pricing confirmed after vehicle inspection.
          </p>
        </section>
      </ScrollReveal>

      {/* Bottom CTA Section */}
      <ScrollReveal>
        <section className="px-4 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-white/10 p-8 md:p-12 text-center">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full translate-x-1/4 translate-y-1/4" />

            <div className="relative z-10">
              <ShieldCheck className="w-10 h-10 text-accent-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Transform Your Vehicle?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Book your preferred package online and we&apos;ll confirm final pricing
                after inspecting your vehicle. No obligations until you approve.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  >
                    <Link
                      href={`/book?package=${pkg.id}`}
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px]"
                      style={{ backgroundColor: pkg.highlightColor }}
                    >
                      {pkg.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
