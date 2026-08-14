import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Music2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, NAV_LINKS } from '@/lib/constants';

const QUICK_LINKS = NAV_LINKS.map(({ href, label }) => ({ href, label }));

const SOCIAL_LINKS = [
  { href: BUSINESS_INFO.social.facebook, label: 'Facebook', icon: Facebook },
  { href: BUSINESS_INFO.social.instagram, label: 'Instagram', icon: Instagram },
  { href: BUSINESS_INFO.social.youtube, label: 'YouTube', icon: Youtube },
  { href: BUSINESS_INFO.social.tiktok, label: 'TikTok', icon: Music2 },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Nombre del negocio y eslogan */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/brand/logo.jpeg"
                  alt="PrimeAura Detailing logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-lg font-bold text-white">{BUSINESS_INFO.name}</h2>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Servicios profesionales de detallamiento automotriz que devuelven tu vehículo a condición de sala de exhibición.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Enlaces Rápidos
            </h3>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información de contacto */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Contáctanos
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-600" aria-hidden="true" />
                <span className="text-gray-300">{BUSINESS_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/[^+\d]/g, '')}`}
                  className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gray-600" aria-hidden="true" />
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/[^+\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-gray-600" aria-hidden="true" />
                  WhatsApp: {BUSINESS_INFO.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gray-600" aria-hidden="true" />
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Redes sociales */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Síguenos
            </h3>
            <div className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="text-gray-500 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
              >
                Política de Privacidad
              </Link>
              <span className="text-white/10" aria-hidden="true">|</span>
              <Link
                href="/terms"
                className="text-gray-500 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
