import type { Metadata } from 'next';
import {
  HeroSection,
  ServicesOverview,
  GalleryPreview,
  BeforeAfterSlider,
  TestimonialsSection,
  TrustBar,
  CTASection,
} from '@/components/home';

export const metadata: Metadata = {
  title: 'Detail Dudes | Detallamiento Premium de Autos',
  description:
    'Servicios profesionales de detallamiento automotriz en tu área. Interior/exterior completo, recubrimiento cerámico y paquetes de lavado para sedanes, SUVs y camionetas.',
  openGraph: {
    title: 'Detail Dudes | Detallamiento Premium de Autos',
    description:
      'Servicios profesionales de detallamiento automotriz. Detallamiento completo, recubrimiento cerámico y paquetes de lavado con precios transparentes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detail Dudes | Detallamiento Premium de Autos',
    description:
      'Servicios profesionales de detallamiento automotriz. Detallamiento completo, recubrimiento cerámico y paquetes de lavado con precios transparentes.',
  },
};

/**
 * Página principal — ensambla todas las secciones con animaciones.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <GalleryPreview />
      <BeforeAfterSlider />
      <TestimonialsSection />
      <TrustBar />
      <CTASection />
    </>
  );
}
