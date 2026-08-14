import type { GalleryItem } from '@/types';

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    category: 'basic-wash',
    vehicleType: 'Sedán',
    beforeImage: {
      src: '/brand/before-wash.jpeg',
      alt: 'Auto antes del lavado - exterior sucio necesita limpieza',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/after-wash.jpeg',
      alt: 'Auto después del lavado profesional - limpio y brillante',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-2',
    category: 'full-detail',
    vehicleType: 'SUV',
    beforeImage: {
      src: '/brand/before-wash.jpeg',
      alt: 'SUV antes del detallamiento - estado previo al lavado',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/after-wash.jpeg',
      alt: 'SUV después del detallamiento profesional completo',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-3',
    category: 'ceramic-coating',
    vehicleType: 'Sedán',
    beforeImage: {
      src: '/brand/before-wash.jpeg',
      alt: 'Vehículo antes de la preparación para recubrimiento cerámico',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/after-wash.jpeg',
      alt: 'Vehículo después del recubrimiento cerámico - acabado protegido',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-4',
    category: 'basic-wash',
    vehicleType: 'Camioneta',
    beforeImage: {
      src: '/brand/before-wash.jpeg',
      alt: 'Camioneta antes del servicio de lavado básico',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/after-wash.jpeg',
      alt: 'Camioneta después del lavado con aplicación de espuma',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-5',
    category: 'full-detail',
    vehicleType: 'Sedán',
    beforeImage: {
      src: '/brand/before-wash.jpeg',
      alt: 'Sedán antes del detallamiento completo - necesita atención',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/after-wash.jpeg',
      alt: 'Sedán después del detallamiento completo - condición de exhibición',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-6',
    category: 'ceramic-coating',
    vehicleType: 'SUV',
    beforeImage: {
      src: '/brand/before-wash.jpeg',
      alt: 'SUV antes de la aplicación de recubrimiento cerámico',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/after-wash.jpeg',
      alt: 'SUV después del proceso de detallamiento',
      width: 1200,
      height: 800,
    },
  },
];

/**
 * Filtrar elementos de galería por categoría. "all" devuelve la lista completa.
 */
export function filterGalleryByCategory(
  items: GalleryItem[],
  category: string
): GalleryItem[] {
  if (category === 'all') return items;
  return items.filter((item) => item.category === category);
}
