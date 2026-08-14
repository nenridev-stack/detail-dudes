import type { Metadata } from 'next';
import { GalleryContent } from './GalleryContent';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Explore our before and after gallery showcasing professional auto detailing transformations on sedans, SUVs, and trucks.',
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black">
      <GalleryContent />
    </main>
  );
}
