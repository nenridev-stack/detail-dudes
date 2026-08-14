import type {
  VehicleOption,
  ServicePackage,
  AddOn,
} from '@/types';

// ============================================================
// Opciones de Vehículos
// ============================================================

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'sedan',
    label: 'Sedán',
    description: 'Compactos, medianos y cupés',
    image: '/brand/seedan.png',
    detailingImage: '/brand/seedan.png',
    startingPrice: 49,
  },
  {
    id: 'suv',
    label: 'SUV / Crossover',
    description: 'SUVs y crossovers estándar',
    image: '/brand/suv.png',
    detailingImage: '/brand/suv.png',
    startingPrice: 69,
  },
  {
    id: 'truck',
    label: 'Camioneta',
    description: 'Pickups y vehículos grandes',
    image: '/brand/truck.png',
    detailingImage: '/brand/truck.png',
    startingPrice: 89,
  },
];

// ============================================================
// Paquetes de Servicio
// ============================================================

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'basic-wash',
    name: 'Lavado Básico',
    description:
      'Un lavado exterior completo a mano y limpieza interior para mantener tu vehículo con aspecto fresco entre detallamientos completos.',
    shortDescription: 'Lavado exterior a mano y limpieza interior',
    icon: 'Droplets',
    includedServices: [
      'Lavado exterior a mano',
      'Limpieza de rines y llantas',
      'Limpieza de ventanas (exterior)',
      'Aspirado interior',
      'Limpieza de tablero y consola',
      'Limpieza de marcos de puertas',
    ],
    pricing: {
      sedan: 49,
      suv: 69,
      truck: 89,
    },
    highlightColor: '#3b82f6',
    vehicleImages: {
      sedan: '/brand/seedan.png',
      suv: '/brand/suv.png',
      truck: '/brand/truck.png',
    },
  },
  {
    id: 'full-detail',
    name: 'Interior + Exterior Completo',
    description:
      'Limpieza profunda interior y pulido exterior completo. Restaura tu vehículo a condición de sala de exhibición por dentro y por fuera.',
    shortDescription: 'Limpieza profunda interior y exterior pulido',
    icon: 'Sparkles',
    includedServices: [
      'Lavado exterior completo a mano y secado',
      'Tratamiento con barra de arcilla',
      'Pulido de pintura en un paso',
      'Aplicación de sellador y cera',
      'Aspirado profundo interior',
      'Limpieza de piel/tela',
      'Todas las superficies interiores detalladas',
      'Limpieza de ventanas (interior y exterior)',
      'Acondicionamiento de llantas',
      'Ambientador',
    ],
    pricing: {
      sedan: 149,
      suv: 179,
      truck: 209,
    },
    highlightColor: '#8b5cf6',
    vehicleImages: {
      sedan: '/brand/seedan.png',
      suv: '/brand/suv.png',
      truck: '/brand/truck.png',
    },
  },
  {
    id: 'ceramic-coating',
    name: 'Recubrimiento Cerámico',
    description:
      'Aplicación de recubrimiento cerámico de grado profesional para protección duradera de pintura, acabado hidrofóbico y resistencia UV.',
    shortDescription: 'Protección cerámica duradera para pintura',
    icon: 'Shield',
    includedServices: [
      'Descontaminación exterior completa',
      'Tratamiento con barra de arcilla',
      'Corrección de pintura multi-paso',
      'Aplicación de recubrimiento cerámico (2 capas)',
      'Recubrimiento cerámico de rines',
      'Recubrimiento cerámico de vidrios',
      'Restauración de molduras',
      'Detallamiento interior completo incluido',
      'Garantía de recubrimiento de 2 años',
      'Kit de mantenimiento incluido',
    ],
    pricing: {
      sedan: 299,
      suv: 399,
      truck: 499,
    },
    highlightColor: '#f59e0b',
    vehicleImages: {
      sedan: '/brand/seedan.png',
      suv: '/brand/suv.png',
      truck: '/brand/truck.png',
    },
  },
];

// ============================================================
// Servicios Adicionales
// ============================================================

export const ADD_ONS: AddOn[] = [
  {
    id: 'pet-hair-removal',
    name: 'Remoción de Pelo de Mascota',
    description: 'Remoción completa de pelo de mascota incrustado en asientos, alfombras y tapicería.',
    price: 25,
    icon: 'PawPrint',
  },
  {
    id: 'odor-treatment',
    name: 'Tratamiento de Olores',
    description: 'Tratamiento profundo con ozono o enzimas para eliminar olores persistentes de la cabina.',
    price: 35,
    icon: 'Wind',
  },
  {
    id: 'engine-bay-cleaning',
    name: 'Limpieza de Motor',
    description: 'Desengrase y detallamiento del compartimento del motor para un aspecto de sala de exhibición.',
    price: 45,
    icon: 'Cog',
  },
  {
    id: 'headlight-restoration',
    name: 'Restauración de Faros',
    description: 'Restaura faros opacos y amarillentos a una condición cristalina.',
    price: 50,
    icon: 'Lightbulb',
  },
  {
    id: 'scratch-removal',
    name: 'Remoción de Rayones',
    description: 'Corrección puntual de rayones menores y marcas de remolino en superficies pintadas.',
    price: 75,
    icon: 'Eraser',
  },
  {
    id: 'leather-conditioning',
    name: 'Acondicionamiento de Piel',
    description: 'Tratamiento premium de piel para limpiar, acondicionar y proteger superficies de piel.',
    price: 40,
    icon: 'Armchair',
  },
];

// ============================================================
// Enlaces de Navegación
// ============================================================

export const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/gallery', label: 'Galería' },
  { href: '/book', label: 'Reservar', isCTA: true },
  { href: '/about', label: 'Nosotros' },
  { href: '/reviews', label: 'Reseñas' },
  { href: '/faq', label: 'Preguntas' },
  { href: '/contact', label: 'Contacto' },
] as const;

// ============================================================
// Información del Negocio
// ============================================================

export const BUSINESS_INFO = {
  name: 'PrimeAura Detailing',
  phone: '(555) 123-4567',
  email: 'info@primeauradetailing.com',
  whatsapp: '+15551234567',
  address: '123 Main Street, Anytown, TX 12345',
  hours: [
    { day: 'Lunes', hours: '8:00 AM – 6:00 PM' },
    { day: 'Martes', hours: '8:00 AM – 6:00 PM' },
    { day: 'Miércoles', hours: '8:00 AM – 6:00 PM' },
    { day: 'Jueves', hours: '8:00 AM – 6:00 PM' },
    { day: 'Viernes', hours: '8:00 AM – 6:00 PM' },
    { day: 'Sábado', hours: '9:00 AM – 5:00 PM' },
    { day: 'Domingo', hours: 'Cerrado' },
  ],
  social: {
    facebook: 'https://facebook.com/primeauradetailing',
    instagram: 'https://instagram.com/primeauradetailing',
    youtube: 'https://youtube.com/@primeauradetailing',
    tiktok: 'https://tiktok.com/@primeauradetailing',
  },
} as const;

// ============================================================
// Horarios Disponibles
// ============================================================

export const TIME_SLOTS = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
] as const;

// ============================================================
// Restricciones de Reserva
// ============================================================

export const BOOKING_CONSTRAINTS = {
  minAdvanceHours: 24,
  maxAdvanceDays: 90,
  maxPhotos: 5,
  maxPhotoSizeMB: 5,
  acceptedImageTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
} as const;
