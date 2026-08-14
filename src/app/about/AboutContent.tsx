'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

/**
 * About page content — owner story, credentials, and service area.
 */
export function AboutContent() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-black py-16 pt-24 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Learn about our passion for auto detailing and the team behind the
            shine.
          </p>
        </div>
      </section>

      {/* Owner Story Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="grid items-center gap-12 md:grid-cols-2">
              {/* Owner Photo */}
              <div className="flex justify-center">
                <div className="relative h-80 w-80 overflow-hidden rounded-2xl bg-white/5 border border-white/10 shadow-xl md:h-96 md:w-96">
                  <Image
                    src="/brand/addtionalImage.jpeg"
                    alt="Detail Dudes — brand image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 320px, 384px"
                    priority
                  />
                </div>
              </div>

              {/* Owner Narrative */}
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Detail Dudes
                </h2>
                <p className="mt-2 text-lg font-medium text-accent-400">
                  Founder & Lead Detailer
                </p>
                <div className="mt-6 space-y-4 text-gray-400">
                  <p>
                    With over a decade of experience in professional auto detailing,
                    our founder has transformed thousands of vehicles across the region.
                    What started as a passion for making cars look their best
                    has evolved into a full-service detailing operation
                    committed to excellence.
                  </p>
                  <p>
                    Every vehicle that comes into our care receives the same level of
                    attention and precision — because we believe every car owner
                    deserves to feel that new-car pride, regardless of make, model, or year.
                  </p>
                  <p>
                    We treat every project as if it were our own vehicle. That
                    means using only premium products, proven techniques, and taking
                    the time to get every detail right.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="bg-[#0a0a0a] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Certifications & Training
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                We invest in ongoing education and maintain industry-recognized
                certifications to ensure the highest quality of work.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Credential 1 */}
            <ScrollReveal>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 transition-all hover:border-accent-500/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/10">
                  <svg
                    className="h-7 w-7 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  IDA Certified Detailer
                </h3>
                <p className="mt-2 text-gray-400">
                  Certified by the International Detailing Association,
                  demonstrating mastery of professional detailing techniques and
                  industry best practices.
                </p>
              </div>
            </ScrollReveal>

            {/* Credential 2 */}
            <ScrollReveal>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 transition-all hover:border-accent-500/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
                  <svg
                    className="h-7 w-7 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  Ceramic Pro Certified Installer
                </h3>
                <p className="mt-2 text-gray-400">
                  Factory-trained and certified as a Ceramic Pro coating
                  installer, ensuring correct application and warranty coverage
                  for every coating job.
                </p>
              </div>
            </ScrollReveal>

            {/* Credential 3 */}
            <ScrollReveal>
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 transition-all hover:border-accent-500/50">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10">
                  <svg
                    className="h-7 w-7 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  Paint Correction Specialist Training
                </h3>
                <p className="mt-2 text-gray-400">
                  Advanced training in multi-stage paint correction, wet sanding,
                  and finishing techniques to restore original factory clarity
                  to any painted surface.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Our Service Area
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-400">
                We proudly serve the metropolitan area and surrounding
                communities. Contact us to confirm availability in your location.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <iframe
                title="Service area map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27404345275!2d-118.69192047471653!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
              <div className="bg-amber-500/10 border-t border-amber-500/30 px-4 py-3 text-center text-sm text-amber-400">
                <strong>Note:</strong> Replace this map with your actual
                business location coordinates.
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
