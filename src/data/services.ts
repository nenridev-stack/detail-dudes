import { SERVICE_PACKAGES, ADD_ONS, VEHICLE_OPTIONS } from '@/lib/constants';

export { SERVICE_PACKAGES, ADD_ONS, VEHICLE_OPTIONS };

/**
 * Helper to get a service package by ID.
 */
export function getServicePackageById(id: string) {
  return SERVICE_PACKAGES.find((pkg) => pkg.id === id) ?? null;
}

/**
 * Helper to get an add-on by ID.
 */
export function getAddOnById(id: string) {
  return ADD_ONS.find((addon) => addon.id === id) ?? null;
}

/**
 * Helper to get a vehicle option by size.
 */
export function getVehicleOptionBySize(size: string) {
  return VEHICLE_OPTIONS.find((v) => v.id === size) ?? null;
}
