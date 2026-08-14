import type { VehicleSize, ServicePackageId, AddOnId } from '@/types';
import { SERVICE_PACKAGES, ADD_ONS } from '@/lib/constants';

/**
 * Calculates the estimated price for a booking based on vehicle size,
 * selected service package, and add-ons.
 *
 * Formula: package.pricing[vehicleSize] + sum(selected add-on prices)
 */
export function calculateEstimate(
  vehicleSize: VehicleSize,
  servicePackageId: ServicePackageId,
  addOnIds: AddOnId[]
): number {
  const servicePackage = SERVICE_PACKAGES.find((pkg) => pkg.id === servicePackageId);

  if (!servicePackage) {
    throw new Error(`Invalid service package ID: ${servicePackageId}`);
  }

  const basePrice = servicePackage.pricing[vehicleSize];

  const addOnsTotal = addOnIds.reduce((sum, addOnId) => {
    const addOn = ADD_ONS.find((a) => a.id === addOnId);
    if (!addOn) {
      throw new Error(`Invalid add-on ID: ${addOnId}`);
    }
    return sum + addOn.price;
  }, 0);

  return basePrice + addOnsTotal;
}
