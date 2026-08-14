import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Auto Detailing',
  description:
    'Terms and conditions for using our auto detailing services, including booking policies, liability limitations, and dispute resolution.',
  openGraph: {
    title: 'Terms of Service | Auto Detailing',
    description:
      'Terms and conditions for using our auto detailing services.',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Auto Detailing',
    description:
      'Terms and conditions for using our auto detailing services.',
  },
};

/**
 * Terms of Service page — static server component with template legal content.
 * Sections: service disclaimers, booking policies, liability limitations, dispute resolution.
 *
 * Validates: Requirements 11.2, 11.3, 11.4
 */
export default function TermsOfServicePage() {
  return (
    <article className="min-h-screen bg-black pt-24">
      {/* Draft Banner */}
      <div
        role="alert"
        className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-3 text-center"
      >
        <p className="text-amber-400 font-bold text-sm uppercase tracking-wide">
          DRAFT — REQUIRES LEGAL REVIEW BEFORE PUBLICATION
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400">
            [LAST UPDATED: INSERT DATE]
          </p>
        </header>

        {/* Service Disclaimers */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            1. Service Disclaimers
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            By using our auto detailing services, you acknowledge and agree to
            the following:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>
              All pricing displayed on this website is estimated and marked as
              &quot;Starting at&quot; prices. Final pricing is confirmed after
              vehicle inspection.
            </li>
            <li>
              Results may vary depending on vehicle condition, age, and prior
              care history.
            </li>
            <li>
              We reserve the right to refuse service if a vehicle presents
              conditions that may damage our equipment or pose safety concerns.
            </li>
            <li>
              Service duration estimates are approximate and may vary depending
              on vehicle size and condition.
            </li>
            <li>
              Photos provided during booking are used for assessment purposes
              only and do not constitute a binding quote.
            </li>
          </ul>
        </section>

        {/* Booking Policies */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            2. Booking Policies
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            The following policies apply to all bookings made through our
            website:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>
              Bookings are requests and are not confirmed until you receive a
              confirmation communication from us.
            </li>
            <li>
              Appointments must be booked at least 24 hours in advance.
            </li>
            <li>
              We require a minimum of 24 hours&apos; notice for cancellations or
              rescheduling. Failure to provide adequate notice may result in a
              cancellation fee.
            </li>
            <li>
              No-shows without prior notice may be subject to a fee and may
              affect future booking privileges.
            </li>
            <li>
              We reserve the right to reschedule appointments due to weather
              conditions or other circumstances beyond our control.
            </li>
            <li>
              Payment is collected at the time of service unless otherwise
              arranged. No payment information is collected through this website.
            </li>
          </ul>
        </section>

        {/* Liability Limitations */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            3. Liability Limitations
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>
              We are not liable for pre-existing damage, paint defects, or
              mechanical issues discovered during service.
            </li>
            <li>
              Our liability for any claim related to our services shall not
              exceed the amount paid for the specific service in question.
            </li>
            <li>
              We are not responsible for personal items left inside the vehicle
              during service.
            </li>
            <li>
              We are not liable for any indirect, incidental, or consequential
              damages arising from the use of our services or this website.
            </li>
            <li>
              This website is provided &quot;as is&quot; without warranties of
              any kind, whether express or implied.
            </li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-3">
            Customers are encouraged to document their vehicle&apos;s condition
            prior to service. We perform a pre-service inspection and will note
            any existing damage before beginning work.
          </p>
        </section>

        {/* Dispute Resolution */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            4. Dispute Resolution
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            In the event of a dispute regarding our services:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>
              Please contact us within 48 hours of service completion to report
              any concerns or dissatisfaction.
            </li>
            <li>
              We will work with you in good faith to resolve any issues, which
              may include re-performing the service or providing a partial
              refund.
            </li>
            <li>
              If we cannot resolve the dispute informally, both parties agree to
              pursue mediation before initiating legal action.
            </li>
            <li>
              Any legal claims must be filed within one year of the incident
              giving rise to the claim.
            </li>
            <li>
              These terms shall be governed by the laws of the state in which our
              business operates.
            </li>
          </ul>
        </section>

        {/* Changes to Terms */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            5. Changes to These Terms
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right to update these Terms of Service at any time.
            Changes will be posted on this page with an updated effective date.
            Your continued use of our services after changes are posted
            constitutes acceptance of the revised terms.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            6. Contact Us
          </h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about these Terms of Service, please
            contact us through our{' '}
            <a
              href="/contact"
              className="text-accent-400 underline hover:text-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            >
              Contact page
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
