'use client';

import Image from 'next/image';
import Link from 'next/link';
import { galleryItems } from '@/data/gallery';
import { StaggeredGrid } from '@/components/motion';

/**
 * Sección de vista previa de galería con fondo oscuro y efectos cinematográficos.
 */
export function GalleryPreview() {
  const previewItems = galleryItems.slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Antes y Después
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Mira la transformación que nuestros servicios de detallamiento ofrecen.
          </p>
        </div>

        <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-accent-500/50 hover:shadow-glow-sm"
            >
              <div className="grid grid-cols-2 gap-0.5 overflow-hidden">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={item.beforeImage.src}
                    alt={item.beforeImage.alt}
                    width={item.beforeImage.width}
                    height={item.beforeImage.height}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
                    Antes
                  </span>
                </div>
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={item.afterImage.src}
                    alt={item.afterImage.alt}
                    width={item.afterImage.width}
                    height={item.afterImage.height}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
                    Después
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-300">
                  {item.vehicleType} —{' '}
                  {item.category === 'basic-wash'
                    ? 'Lavado Básico'
                    : item.category === 'full-detail'
                      ? 'Detallamiento Completo'
                      : 'Recubrimiento Cerámico'}
                </p>
              </div>
            </div>
          ))}
        </StaggeredGrid>

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-medium text-accent-400 hover:text-accent-300 transition-colors duration-200 group"
          >
            Ver Galería Completa
            <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
