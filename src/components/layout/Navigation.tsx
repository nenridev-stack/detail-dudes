'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { NAV_LINKS, BUSINESS_INFO } from '@/lib/constants';
import MobileMenu from './MobileMenu';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
          : 'bg-black/90 backdrop-blur-xl'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo / Nombre del Negocio */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/brand/Logo.jpeg"
              alt="Detail Dudes logo"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="hidden sm:inline text-lg font-bold tracking-tight text-white">
            {BUSINESS_INFO.name}
          </span>
        </Link>

        {/* Enlaces de NavegaciÃ³n Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const isCTA = 'isCTA' in link && link.isCTA;

            if (isCTA) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="ml-3 inline-flex items-center justify-center bg-accent-500 text-white rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-accent-400 hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isActive
                      ? 'text-accent-400'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* BotÃ³n Hamburguesa MÃ³vil */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg text-white/70 hover:bg-white/10 transition-colors md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* MenÃº MÃ³vil */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}

