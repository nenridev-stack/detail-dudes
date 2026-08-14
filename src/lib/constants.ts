import type {
  VehicleOption,
  ServicePackage,
  AddOn,
} from '@/types';

// ============================================================
// Vehicle Options
// ============================================================

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'sedan',
    label: 'Sedan',
    description: 'Compact, mid-size & coupes',
    image: '/brand/seedan.png',
    detailingImage: '/brand/seedan.png',
    startingPrice: 49,
  },
  {
    id: 'suv',
    label: 'SUV / Crossover',
    description: 'Standard SUVs & crossovers',
    image: '/brand/suv.png',
    detailingImage: '/brand/suv.png',
    startingPrice: 69,
  },
  {
    id: 'truck',
    label: 'Truck',
    description: 'Pickups & large vehicles',
    image: '/brand/truck.png',
    detailingImage: '/brand/truck.png',
    startingPrice: 89,
  },
];

// ============================================================
// Service Packages
// ============================================================

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'basic-wash',
    name: 'Basic Wash',
    description:
      'A full hand wash exterior and interior wipe-down to keep your vehicle looking fresh between full details.',
    shortDescription: 'Hand wash exterior & interior wipe-down',
    icon: 'Droplets',
    includedServices: [
      'Hand wash exterior',
      'Wheel & tire cleaning',
      'Window cleaning (exterior)',
      'Interior vacuuming',
      'Dashboard & console wipe-down',
      'Door jamb cleaning',
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
    name: 'Full Interior + Exterior',
    description:
      'Deep interior cleaning and full exterior polish. Restores your vehicle to showroom condition inside and out.',
    shortDescription: 'Deep interior cleaning & polished exterior',
    icon: 'Sparkles',
    includedServices: [
      'Full hand wash & dry exterior',
      'Clay bar treatment',
      'One-step paint polish',
      'Sealant & wax application',
      'Deep interior vacuuming',
      'Leather/fabric cleaning',
      'All interior surfaces detailed',
      'Window cleaning (interior & exterior)',
      'Tire conditioning',
      'Air freshener',
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
    name: 'Ceramic Coating',
    description:
      'Professional-grade ceramic coating application for long-lasting paint protection, hydrophobic finish, and UV resistance.',
    shortDescription: 'Long-lasting ceramic paint protection',
    icon: 'Shield',
    includedServices: [
      'Full exterior decontamination',
      'Clay bar treatment',
      'Multi-step paint correction',
      'Ceramic coating application (2 layers)',
      'Wheel ceramic coating',
      'Glass ceramic coating',
      'Trim restoration',
      'Full interior detail included',
      '2-year coating warranty',
      'Maintenance kit included',
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
// Add-On Services
// ============================================================

export const ADD_ONS: AddOn[] = [
  {
    id: 'pet-hair-removal',
    name: 'Pet Hair Removal',
    description: 'Complete removal of embedded pet hair from seats, carpets, and upholstery.',
    price: 25,
    icon: 'PawPrint',
  },
  {
    id: 'odor-treatment',
    name: 'Odor Treatment',
    description: 'Deep ozone or enzyme treatment to eliminate persistent cabin odors.',
    price: 35,
    icon: 'Wind',
  },
  {
    id: 'engine-bay-cleaning',
    name: 'Engine Bay Cleaning',
    description: 'Degreasing and detailing of the engine compartment for a showroom look.',
    price: 45,
    icon: 'Cog',
  },
  {
    id: 'headlight-restoration',
    name: 'Headlight Restoration',
    description: 'Restores hazy and yellowed headlights to crystal-clear condition.',
    price: 50,
    icon: 'Lightbulb',
  },
  {
    id: 'scratch-removal',
    name: 'Scratch Removal',
    description: 'Spot correction of minor scratches and swirl marks on painted surfaces.',
    price: 75,
    icon: 'Eraser',
  },
  {
    id: 'leather-conditioning',
    name: 'Leather Conditioning',
    description: 'Premium leather treatment to clean, condition, and protect leather surfaces.',
    price: 40,
    icon: 'Armchair',
  },
];

// ============================================================
// Navigation Links
// ============================================================

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/book', label: 'Book Now', isCTA: true },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;

// ============================================================
// Business Info
// ============================================================

export const BUSINESS_INFO = {
  name: 'Detail Dudes',
  phone: '(555) 123-4567',
  email: 'info@detaildudes.com',
  whatsapp: '+15551234567',
  address: '123 Main Street, Anytown, TX 12345',
  hours: [
    { day: 'Monday', hours: '8:00 AM – 6:00 PM' },
    { day: 'Tuesday', hours: '8:00 AM – 6:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM – 6:00 PM' },
    { day: 'Thursday', hours: '8:00 AM – 6:00 PM' },
    { day: 'Friday', hours: '8:00 AM – 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  social: {
    facebook: 'https://facebook.com/detaildudes',
    instagram: 'https://instagram.com/detaildudes',
    youtube: 'https://youtube.com/@detaildudes',
    tiktok: 'https://tiktok.com/@detaildudes',
  },
} as const;

// ============================================================
// Available Time Slots
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
// Booking Constraints
// ============================================================

export const BOOKING_CONSTRAINTS = {
  minAdvanceHours: 24,
  maxAdvanceDays: 90,
  maxPhotos: 5,
  maxPhotoSizeMB: 5,
  acceptedImageTypes: ['image/jpeg', 'image/png', 'image/webp'] as const,
} as const;
