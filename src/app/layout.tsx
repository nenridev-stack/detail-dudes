import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'PrimeAura Detailing | Detallamiento Profesional de Autos',
    template: '%s | PrimeAura Detailing',
  },
  description:
    'Servicios profesionales de detallamiento automotriz incluyendo interior/exterior completo, recubrimiento cerámico y paquetes de lavado básico para sedanes, SUVs y camionetas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-dvh font-sans antialiased bg-black text-white">
        <Navigation />
        <main className="pt-0">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
