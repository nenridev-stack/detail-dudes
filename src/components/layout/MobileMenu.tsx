'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const panelVariants = {
  hidden: {
    x: '100%',
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    x: '100%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // Only trigger when pathname changes, not when isOpen/onClose change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="mobile-menu-backdrop"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-out panel - dark glass */}
          <motion.div
            key="mobile-menu-panel"
            className="fixed inset-y-0 right-0 z-50 w-[280px] max-w-[80vw] bg-[#0a0a0a] border-l border-white/10 shadow-2xl md:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Close button */}
            <div className="flex items-center justify-end p-4">
              <button
                onClick={onClose}
                className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-md text-white/70 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="px-4 py-2" aria-label="Mobile navigation">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  const isCTA = 'isCTA' in link && link.isCTA;

                  if (isCTA) {
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex items-center justify-center w-full min-h-[44px] mt-4 bg-accent-500 text-white rounded-md px-4 py-3 text-base font-semibold transition-colors hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`flex items-center w-full min-h-[44px] px-3 py-3 text-base font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                          isActive
                            ? 'text-accent-400 bg-white/5'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

