import type { Metadata } from 'next';
import { GalleryContent } from './GalleryContent';

export const metadata: Metadata = {
  title: 'Galería',
  description:
    'Explora nuestra galería de antes y después mostrando transformaciones de detallamiento automotriz profesional en sedanes, SUVs y camionetas.',
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black">
      <GalleryContent />
    </main>
  );
}
