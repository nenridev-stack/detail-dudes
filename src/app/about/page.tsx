import type { Metadata } from 'next';
import { AboutContent } from './AboutContent';

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description:
    'Conoce la historia detrás de PrimeAura Detailing, nuestras certificaciones y el área de servicio que cubrimos.',
};

export default function AboutPage() {
  return <AboutContent />;
}
