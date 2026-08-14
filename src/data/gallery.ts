import type { GalleryItem } from '@/types';

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    category: 'basic-wash',
    vehicleType: 'SedÃ¡n',
    beforeImage: {
      src: '/brand/Before-cleaning-staringseats.jpeg',
      alt: 'Auto antes del lavado - exterior sucio necesita limpieza',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/After-Clean-staringseats.jpeg',
      alt: 'Auto despuÃ©s del lavado profesional - limpio y brillante',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-2',
    category: 'full-detail',
    vehicleType: 'SUV',
    beforeImage: {
      src: '/brand/Before-cleaning-staringseats.jpeg',
      alt: 'SUV antes del detallamiento - estado previo al lavado',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/After-Clean-staringseats.jpeg',
      alt: 'SUV despuÃ©s del detallamiento profesional completo',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-3',
    category: 'ceramic-coating',
    vehicleType: 'SedÃ¡n',
    beforeImage: {
      src: '/brand/Before-cleaning-staringseats.jpeg',
      alt: 'VehÃ­culo antes de la preparaciÃ³n para recubrimiento cerÃ¡mico',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/After-Clean-staringseats.jpeg',
      alt: 'VehÃ­culo despuÃ©s del recubrimiento cerÃ¡mico - acabado protegido',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-4',
    category: 'basic-wash',
    vehicleType: 'Camioneta',
    beforeImage: {
      src: '/brand/Before-cleaning-staringseats.jpeg',
      alt: 'Camioneta antes del servicio de lavado bÃ¡sico',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/After-Clean-staringseats.jpeg',
      alt: 'Camioneta despuÃ©s del lavado con aplicaciÃ³n de espuma',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-5',
    category: 'full-detail',
    vehicleType: 'SedÃ¡n',
    beforeImage: {
      src: '/brand/Before-cleaning-staringseats.jpeg',
      alt: 'SedÃ¡n antes del detallamiento completo - necesita atenciÃ³n',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/After-Clean-staringseats.jpeg',
      alt: 'SedÃ¡n despuÃ©s del detallamiento completo - condiciÃ³n de exhibiciÃ³n',
      width: 1200,
      height: 800,
    },
  },
  {
    id: 'gallery-6',
    category: 'ceramic-coating',
    vehicleType: 'SUV',
    beforeImage: {
      src: '/brand/Before-cleaning-staringseats.jpeg',
      alt: 'SUV antes de la aplicaciÃ³n de recubrimiento cerÃ¡mico',
      width: 1200,
      height: 800,
    },
    afterImage: {
      src: '/brand/After-Clean-staringseats.jpeg',
      alt: 'SUV despuÃ©s del proceso de detallamiento',
      width: 1200,
      height: 800,
    },
  },
];

/**
 * Filtrar elementos de galerÃ­a por categorÃ­a. "all" devuelve la lista completa.
 */
export function filterGalleryByCategory(
  items: GalleryItem[],
  category: string
): GalleryItem[] {
  if (category === 'all') return items;
  return items.filter((item) => item.category === category);
}
