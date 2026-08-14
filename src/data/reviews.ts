import type { Review, RatingSummary } from '@/types';

export const reviews: Review[] = [
  {
    id: 'review-1',
    customerName: 'James Mitchell',
    rating: 5,
    serviceReceived: 'Recubrimiento Cerámico',
    vehicleType: '2023 Tesla Model 3',
    text: '¡Trabajo absolutamente increíble! Mi Tesla se ve mejor que cuando lo recogí del concesionario. El recubrimiento cerámico le da un acabado de espejo que repele el agua sin esfuerzo. Servicio profesional de principio a fin.',
    date: '2024-11-15',
  },
  {
    id: 'review-2',
    customerName: 'Sarah Thompson',
    rating: 5,
    serviceReceived: 'Interior + Exterior Completo',
    vehicleType: '2022 BMW X5',
    text: 'Tengo dos perros y el interior de mi SUV estaba en mal estado. Removieron cada pelo de mascota y la piel se ve como nueva. La atención al detalle es inigualable. Definitivamente regresaré regularmente.',
    date: '2024-11-10',
  },
  {
    id: 'review-3',
    customerName: 'Michael Rodriguez',
    rating: 5,
    serviceReceived: 'Interior + Exterior Completo',
    vehicleType: '2021 Ford F-150',
    text: 'Mi camioneta se ensucia mucho en los sitios de trabajo cada semana. Estos chicos la dejaron como nueva de agencia en solo unas horas. El pulido exterior recuperó el brillo de la pintura que pensé que se había perdido para siempre.',
    date: '2024-11-05',
  },
  {
    id: 'review-4',
    customerName: 'Emily Chen',
    rating: 4,
    serviceReceived: 'Lavado Básico',
    vehicleType: '2023 Honda Civic',
    text: 'Lavado básico rápido y completo. Mi auto se ve genial e incluso limpiaron los marcos de las puertas que la mayoría de los lugares se saltan. La única razón de 4 estrellas es que me gustaría que tuvieran más disponibilidad los fines de semana.',
    date: '2024-10-28',
  },
  {
    id: 'review-5',
    customerName: 'David Park',
    rating: 5,
    serviceReceived: 'Recubrimiento Cerámico',
    vehicleType: '2024 Porsche 911',
    text: 'Les confié mi 911 y superaron las expectativas. La corrección de pintura multi-paso eliminó todas las marcas de remolino y el recubrimiento cerámico es impecable. Seis meses después y el agua todavía forma gotas perfectamente.',
    date: '2024-10-20',
  },
  {
    id: 'review-6',
    customerName: 'Jessica Williams',
    rating: 5,
    serviceReceived: 'Interior + Exterior Completo',
    vehicleType: '2022 Toyota Highlander',
    text: 'Tres niños significan muchas migajas y manchas. El detallamiento interior fue transformador — incluso sacaron manchas de jugo de los asientos de tela que pensé eran permanentes. ¡Altamente recomendado para familias!',
    date: '2024-10-12',
  },
  {
    id: 'review-7',
    customerName: 'Robert Johnson',
    rating: 4,
    serviceReceived: 'Lavado Básico',
    vehicleType: '2020 Chevrolet Silverado',
    text: 'Buena relación calidad-precio. Hicieron un buen trabajo en mi Silverado que no es tarea fácil. El aspirado interior fue completo y el exterior quedó impecable. Usaré de nuevo para mis lavados regulares de mantenimiento.',
    date: '2024-10-05',
  },
  {
    id: 'review-8',
    customerName: 'Amanda Foster',
    rating: 5,
    serviceReceived: 'Recubrimiento Cerámico',
    vehicleType: '2023 Mercedes-Benz C300',
    text: 'Solo la corrección de pintura valió la pena — años de micro rayones de lavados automáticos desaparecieron por completo. Agrega el recubrimiento cerámico y mi C300 nunca se ha visto tan bien. Servicio premium para un auto premium.',
    date: '2024-09-28',
  },
  {
    id: 'review-9',
    customerName: 'Kevin Liu',
    rating: 5,
    serviceReceived: 'Interior + Exterior Completo',
    vehicleType: '2021 Subaru Outback',
    text: 'Llevo mi Outback a muchos paseos por senderos y el interior estaba cubierto de polvo y tierra. Después del detallamiento completo, huele nuevo otra vez. Incluso sacaron el lodo de las fibras de la alfombra. ¡Trabajo impresionante!',
    date: '2024-09-20',
  },
  {
    id: 'review-10',
    customerName: 'Nicole Anderson',
    rating: 4,
    serviceReceived: 'Lavado Básico',
    vehicleType: '2022 Audi A4',
    text: 'Limpio, profesional y eficiente. Mi Audi se ve fantástico después de su servicio de lavado básico. El equipo fue amigable y comunicó bien durante todo el proceso. Gran opción para un refresco rápido entre detallamientos completos.',
    date: '2024-09-15',
  },
  {
    id: 'review-11',
    customerName: 'Marcus Brown',
    rating: 5,
    serviceReceived: 'Interior + Exterior Completo',
    vehicleType: '2023 RAM 1500',
    text: 'El mejor servicio de detallamiento en el área, sin duda. Mi RAM se veía como nueva después de su servicio completo. La restauración de faros que recomendaron hizo una gran diferencia también. Estos chicos saben lo que hacen.',
    date: '2024-09-08',
  },
  {
    id: 'review-12',
    customerName: 'Lisa Martinez',
    rating: 5,
    serviceReceived: 'Recubrimiento Cerámico',
    vehicleType: '2024 Lexus RX',
    text: 'Invertí en recubrimiento cerámico para mi nuevo Lexus y no podría estar más feliz. El efecto hidrofóbico es increíble — la lluvia simplemente rueda. Hace el lavado regular mucho más fácil. Vale cada centavo para protección de pintura.',
    date: '2024-09-01',
  },
];

/**
 * Calcula el resumen de calificación agregado del arreglo de reseñas.
 */
export function computeRatingSummary(reviewList: Review[]): RatingSummary {
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let total = 0;

  for (const review of reviewList) {
    distribution[review.rating]++;
    total += review.rating;
  }

  const average =
    reviewList.length > 0
      ? Math.round((total / reviewList.length) * 10) / 10
      : 0;

  return {
    average,
    totalReviews: reviewList.length,
    distribution,
  };
}

export const ratingSummary: RatingSummary = computeRatingSummary(reviews);
