// ============================================================
// Core Domain Types
// ============================================================

export type VehicleSize = 'sedan' | 'suv' | 'truck';

export type ServicePackageId = 'basic-wash' | 'full-detail' | 'ceramic-coating';

export type AddOnId = string;

// ============================================================
// Vehicle
// ============================================================

export interface VehicleOption {
  id: VehicleSize;
  label: string;
  description: string;
  image: string;
  detailingImage: string;
  startingPrice: number;
}

// ============================================================
// Service Packages & Add-Ons
// ============================================================

export interface ServicePackage {
  id: ServicePackageId;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  includedServices: string[];
  pricing: Record<VehicleSize, number>;
  highlightColor: string;
  vehicleImages: Record<VehicleSize, string>;
}

export interface AddOn {
  id: AddOnId;
  name: string;
  description: string;
  price: number;
  icon: string;
}

// ============================================================
// Reviews & Ratings
// ============================================================

export interface Review {
  id: string;
  customerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  serviceReceived: string;
  vehicleType: string;
  text: string;
  date: string;
  avatar?: string;
}

export interface RatingSummary {
  average: number;
  totalReviews: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

// ============================================================
// Gallery
// ============================================================

export interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface GalleryItem {
  id: string;
  category: ServicePackageId;
  vehicleType: string;
  beforeImage: ImageData;
  afterImage: ImageData;
}

// ============================================================
// FAQ
// ============================================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  questions: FAQItem[];
}

// ============================================================
// Contact Form
// ============================================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ============================================================
// Booking
// ============================================================

export interface BookingPayload {
  vehicleSize: VehicleSize;
  photos: string[];
  servicePackage: ServicePackageId;
  addOns: AddOnId[];
  estimatedPrice: number;
  preferredDate: string;
  timeSlot: string;
  contact: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    notes?: string;
  };
}

export interface BookingResponse {
  success: boolean;
  message: string;
  fallbackContact?: {
    phone: string;
    email: string;
  };
}
