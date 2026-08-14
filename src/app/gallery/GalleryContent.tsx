'use client';

import { useState, useMemo, useCallback } from 'react';
import { GalleryGrid, GalleryFilter, Lightbox } from '@/components/gallery';
import type { GalleryCategory } from '@/components/gallery';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { galleryItems, filterGalleryByCategory } from '@/data/gallery';
import type { GalleryItem } from '@/types';

interface LightboxImage {
  item: GalleryItem;
  type: 'before' | 'after';
}

/**
 * Contenido interactivo del lado del cliente para la página de Galería.
 */
export function GalleryContent() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = useMemo(
    () => filterGalleryByCategory(galleryItems, activeFilter),
    [activeFilter]
  );

  // Construir lista plana de imágenes de lightbox a partir de items filtrados
  const lightboxImages: LightboxImage[] = useMemo(
    () =>
      filteredItems.flatMap((item) => [
        { item, type: 'before' as const },
        { item, type: 'after' as const },
      ]),
    [filteredItems]
  );

  const handleImageClick = useCallback(
    (item: GalleryItem, type: 'before' | 'after') => {
      const index = lightboxImages.findIndex(
        (img) => img.item.id === item.id && img.type === type
      );
      setLightboxIndex(index >= 0 ? index : 0);
      setLightboxOpen(true);
    },
    [lightboxImages]
  );

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      <ScrollReveal>
        <section className="text-center pt-24 pb-8 md:pt-32 md:pb-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestro Trabajo
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Explora las transformaciones de antes y después de nuestros servicios de detallamiento.
            Cada foto muestra la calidad y cuidado que ponemos en cada vehículo.
          </p>
        </section>
      </ScrollReveal>

      <section className="max-w-7xl mx-auto px-4 pb-16 md:pb-24">
        <GalleryFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <GalleryGrid items={filteredItems} onImageClick={handleImageClick} />
      </section>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
      />
    </>
  );
}
