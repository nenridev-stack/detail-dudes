import type { FAQCategory } from '@/types';

export const faqCategories: FAQCategory[] = [
  {
    id: 'pricing',
    name: 'Precios',
    icon: 'DollarSign',
    questions: [
      {
        id: 'pricing-1',
        question: '¿Por qué los precios figuran como "Desde"?',
        answer:
          'Nuestros precios listados son estimaciones basadas en un vehículo en condición promedio. El precio final se confirma después de que inspeccionamos tu vehículo y evaluamos factores como la condición actual, nivel de contaminación y cualquier requisito especial. Esto asegura que solo pagues por lo que tu vehículo realmente necesita.',
      },
      {
        id: 'pricing-2',
        question: '¿Cobran extra por vehículos muy sucios?',
        answer:
          'Vehículos con suciedad excesiva, pelo de mascota, manchas o pintura descuidada pueden requerir tiempo y productos adicionales. Siempre comunicaremos cualquier ajuste de precio antes de comenzar el trabajo para que no haya sorpresas. Puedes subir fotos durante la reserva para una estimación más precisa.',
      },
      {
        id: 'pricing-3',
        question: '¿Qué métodos de pago aceptan?',
        answer:
          'Aceptamos todas las tarjetas de crédito principales, tarjetas de débito, efectivo y opciones de pago móvil (Apple Pay, Google Pay). El pago se cobra al completar el servicio.',
      },
    ],
  },
  {
    id: 'duration',
    name: 'Duración del Servicio',
    icon: 'Clock',
    questions: [
      {
        id: 'duration-1',
        question: '¿Cuánto tiempo toma un lavado básico?',
        answer:
          'Un lavado básico típicamente toma de 45 minutos a 1.5 horas dependiendo del tamaño del vehículo y su condición. Los sedanes usualmente están en el lado más corto, mientras que camionetas y vehículos muy sucios toman más tiempo.',
      },
      {
        id: 'duration-2',
        question: '¿Cuánto tiempo toma un detallamiento interior + exterior completo?',
        answer:
          'Un detallamiento completo usualmente toma de 3 a 5 horas dependiendo del tamaño del vehículo y su condición. Recomendamos planificar medio día. Te daremos una estimación de tiempo más precisa después de revisar las fotos de tu vehículo.',
      },
      {
        id: 'duration-3',
        question: '¿Cuánto tiempo toma el recubrimiento cerámico?',
        answer:
          'El recubrimiento cerámico es un proceso de múltiples pasos que típicamente requiere de 1 a 2 días. Esto incluye corrección de pintura, preparación de superficie, aplicación del recubrimiento y tiempo de curado. Coordinaremos los horarios de entrega y recogida contigo.',
      },
    ],
  },
  {
    id: 'service-area',
    name: 'Área de Servicio',
    icon: 'MapPin',
    questions: [
      {
        id: 'area-1',
        question: '¿Ofrecen detallamiento móvil o necesito ir a ustedes?',
        answer:
          'Operamos desde nuestra instalación dedicada de detallamiento para asegurar los mejores resultados con iluminación adecuada, filtración de agua y ambiente controlado. La entrega y recogida son en nuestra ubicación. Podemos ofrecer servicios móviles para clientes de recubrimiento cerámico — pregúntanos por detalles.',
      },
      {
        id: 'area-2',
        question: '¿Cuál es su área de servicio?',
        answer:
          'Servimos al área metropolitana y comunidades circundantes dentro de un radio de 30 millas de nuestra instalación. Consulta nuestra página de contacto para nuestra ubicación exacta y mapa. Si estás fuera de nuestra área, contáctanos y podemos discutir opciones.',
      },
    ],
  },
  {
    id: 'vehicle-prep',
    name: 'Preparación del Vehículo',
    icon: 'CarFront',
    questions: [
      {
        id: 'prep-1',
        question: '¿Necesito preparar mi vehículo antes de llevarlo?',
        answer:
          'Recomendamos retirar cualquier objeto de valor personal y artículos sueltos grandes del vehículo antes de tu cita. No necesitas pre-limpiar — ¡ese es nuestro trabajo! Si tienes manchas específicas o áreas problemáticas, avísanos durante la reserva para que podamos preparar los productos adecuados.',
      },
      {
        id: 'prep-2',
        question: '¿Debo quitar las sillas de niño antes de la cita?',
        answer:
          'Sí, por favor retira sillas de auto, asientos elevadores y cualquier accesorio del mercado secundario que te gustaría que limpiemos alrededor (o debajo). Esto nos permite hacer un trabajo completo en la tapicería y alfombra. No somos responsables de la reinstalación de sillas de auto.',
      },
    ],
  },
  {
    id: 'cancellation',
    name: 'Política de Cancelación',
    icon: 'CalendarX',
    questions: [
      {
        id: 'cancel-1',
        question: '¿Cuál es su política de cancelación?',
        answer:
          'Pedimos al menos 24 horas de aviso para cancelaciones o reprogramaciones. Las cancelaciones con menos de 24 horas de aviso pueden estar sujetas a un cargo por cancelación. Entendemos que surgen emergencias — solo comunícate con nosotros y trabajaremos contigo.',
      },
      {
        id: 'cancel-2',
        question: '¿Puedo reprogramar mi cita?',
        answer:
          '¡Por supuesto! Puedes reprogramar llamándonos o enviándonos un correo al menos 24 horas antes de tu cita sin cargo. La reprogramación del mismo día está sujeta a disponibilidad y puede tener un cargo. Haremos nuestro mejor esfuerzo para acomodar tu nuevo horario preferido.',
      },
    ],
  },
];
