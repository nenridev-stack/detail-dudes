import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Auto Detailing',
  description:
    'Our privacy policy explains how we collect, use, and protect your personal information when you use our auto detailing services.',
  openGraph: {
    title: 'Privacy Policy | Auto Detailing',
    description:
      'Our privacy policy explains how we collect, use, and protect your personal information.',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Auto Detailing',
    description:
      'Our privacy policy explains how we collect, use, and protect your personal information.',
  },
};

/**
 * Privacy Policy page — static server component with template legal content.
 * Sections: data collection, data usage, third-party sharing, cookies, user rights.
 *
 * Validates: Requirements 11.1, 11.3, 11.4
 */
export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">
            [LAST UPDATED: INSERT DATE]
          </p>
        </header>

        {/* Data Collection */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            1. Data Collection
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            We collect personal information that you voluntarily provide when
            using our website, booking services, or contacting us. This may
            include:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Vehicle information (type, condition photos)</li>
            <li>Service preferences and booking details</li>
            <li>Messages or notes submitted through forms</li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-3">
            We may also automatically collect technical information such as your
            IP address, browser type, device type, and pages visited through
            cookies and similar technologies.
          </p>
        </section>

        {/* Data Usage */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            2. Data Usage
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>Processing and confirming your service bookings</li>
            <li>Communicating with you about appointments and services</li>
            <li>Sending booking confirmations and service updates via email</li>
            <li>Responding to your inquiries and support requests</li>
            <li>Improving our website and services</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        {/* Third-Party Sharing */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            3. Third-Party Sharing
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            We do not sell or rent your personal information. We may share your
            data with the following third parties solely to deliver our services:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>
              <strong className="text-white">Email service providers</strong> (e.g., Resend) — to send
              booking confirmations and communications
            </li>
            <li>
              <strong className="text-white">Automation platforms</strong> (e.g., n8n) — to process and
              manage booking workflows
            </li>
            <li>
              <strong className="text-white">Hosting providers</strong> (e.g., Vercel) — to serve and
              maintain our website
            </li>
            <li>
              <strong className="text-white">Analytics tools</strong> — to understand website usage
              patterns (anonymized where possible)
            </li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-3">
            We require all third-party providers to handle your data in
            accordance with applicable privacy laws and only for the purposes we
            specify.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            4. Cookies
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            Our website may use cookies and similar tracking technologies to
            enhance your browsing experience. These include:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>
              <strong className="text-white">Essential cookies</strong> — required for the website to
              function properly
            </li>
            <li>
              <strong className="text-white">Analytics cookies</strong> — help us understand how
              visitors interact with our site
            </li>
            <li>
              <strong className="text-white">Preference cookies</strong> — remember your settings and
              choices
            </li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-3">
            You can manage cookie preferences through your browser settings.
            Disabling certain cookies may affect website functionality.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-300 leading-relaxed mb-3">
            Depending on your jurisdiction, you may have the following rights
            regarding your personal data:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 ml-2">
            <li>
              <strong className="text-white">Access</strong> — request a copy of the personal data we
              hold about you
            </li>
            <li>
              <strong className="text-white">Correction</strong> — request correction of inaccurate or
              incomplete data
            </li>
            <li>
              <strong className="text-white">Deletion</strong> — request deletion of your personal data
            </li>
            <li>
              <strong className="text-white">Portability</strong> — request your data in a portable
              format
            </li>
            <li>
              <strong className="text-white">Objection</strong> — object to certain processing of your
              data
            </li>
          </ul>
          <p className="text-gray-300 leading-relaxed mt-3">
            To exercise any of these rights, please contact us using the details
            provided on our Contact page. We will respond to your request within
            30 days.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            6. Contact Us
          </h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please contact us through our{' '}
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
