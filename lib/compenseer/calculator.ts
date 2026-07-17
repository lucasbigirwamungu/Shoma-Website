import {
  TreeSpecies,
  IndividualFootprint,
  BusinessFootprint,
  CompenseerCalculation,
} from './types';

// Pricing tiers: higher CO2 = higher cost per kg
// Base: €15/ton CO2, max €25/ton (premium)
const PRICE_TIERS = [
  { maxKg: 2000, pricePerKg: 0.025 }, // up to 2 tons: €25/kg
  { maxKg: 5000, pricePerKg: 0.022 }, // 2-5 tons: €22/kg
  { maxKg: 10000, pricePerKg: 0.020 }, // 5-10 tons: €20/kg
  { maxKg: Infinity, pricePerKg: 0.015 }, // 10+ tons: €15/kg
];

// CO2 emission factors
const CO2_FACTORS = {
  flight: 0.255, // kg CO2 per flight hour (average)
  car: 0.192, // kg CO2 per km (average car)
  footprint_multiplier: 1.0, // direct use
};

/**
 * Calculate CO2 from individual inputs
 */
export function calculateIndividualCO2(footprint: IndividualFootprint): number {
  let co2Kg = 0;

  if (footprint.flightHours) {
    co2Kg += footprint.flightHours * CO2_FACTORS.flight;
  }

  if (footprint.distanceKm) {
    co2Kg += footprint.distanceKm * CO2_FACTORS.car;
  }

  if (footprint.annualFootprintKg) {
    co2Kg += footprint.annualFootprintKg;
  }

  return Math.round(co2Kg * 100) / 100; // 2 decimals
}

/**
 * Calculate CO2 from business inputs
 */
export function calculateBusinessCO2(footprint: BusinessFootprint): number {
  let co2Kg = 0;

  if (footprint.customScopeKg) {
    return footprint.customScopeKg;
  }

  // Rough estimates by category
  const estimates: Record<string, number> = {
    logistics: footprint.vehicles ? footprint.vehicles * 8000 : 5000, // kg/vehicle/year
    manufacturing: footprint.employees ? footprint.employees * 2500 : 5000, // kg/employee/year
    services: footprint.employees ? footprint.employees * 1200 : 2000,
    retail: footprint.employees ? footprint.employees * 800 : 1500,
    offices: footprint.employees ? footprint.employees * 600 : 1000,
  };

  co2Kg = estimates[footprint.category] || 5000;

  return Math.round(co2Kg * 100) / 100;
}

/**
 * Get price per kg based on total CO2
 */
function getPricePerKg(co2Kg: number): number {
  const tier = PRICE_TIERS.find((t) => co2Kg <= t.maxKg);
  return tier?.pricePerKg || PRICE_TIERS[PRICE_TIERS.length - 1].pricePerKg;
}

/**
 * Calculate trees to plant based on CO2 and species mix
 */
export function calculateTreesNeeded(
  co2Kg: number,
  species: TreeSpecies[]
): number {
  if (!species.length) return 0;

  // Average CO2 sequestration across species
  const avgCo2PerYear =
    species.reduce((sum, s) => sum + s.co2KgPerYear, 0) / species.length;

  // Lifecycle: average years until full maturity
  const avgLifecycle =
    species.reduce((sum, s) => sum + s.lifecycleYears, 0) / species.length;

  // Total CO2 per tree over lifecycle
  const co2PerTreeLifecycle = avgCo2PerYear * avgLifecycle;

  // Trees needed
  const trees = Math.ceil(co2Kg / co2PerTreeLifecycle);

  return Math.max(1, trees); // minimum 1 tree
}

/**
 * Main calculation: CO2 → € → trees
 */
export function calculateCompensation(
  co2Kg: number,
  selectedSpecies: TreeSpecies[]
): CompenseerCalculation {
  const pricePerKg = getPricePerKg(co2Kg);
  const amountEur = co2Kg * pricePerKg;
  const treesAllocated = calculateTreesNeeded(co2Kg, selectedSpecies);

  return {
    co2Kg,
    amountEur: Math.round(amountEur * 100) / 100,
    treesAllocated,
    selectedSpecies,
    breakdown: {
      co2Source: 'calculated',
      co2Total: co2Kg,
      pricePerKg,
      treesPerKg: 1 / (co2Kg / treesAllocated),
    },
  };
}

/**
 * Format CO2 for display
 */
export function formatCO2(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} ton`;
  }
  return `${Math.round(kg)} kg`;
}

/**
 * Format price for display (EUR)
 */
export function formatPrice(eur: number): string {
  return `€${eur.toFixed(2)}`;
}

/**
 * Preset scenarios for quick input
 */
export const PRESETS = {
  individual: {
    short_flight: { flightHours: 4, description: 'Short European flight (return)' },
    long_flight: { flightHours: 12, description: 'Transatlantic flight (return)' },
    africa_flight: { flightHours: 18, description: 'Europe-Africa flight (return)' },
    commute: { distanceKm: 5000, description: 'Annual car commute (25km x 200 days)' },
    annual: { annualFootprintKg: 4500, description: 'Average annual footprint (EU)' },
  },
  business: {
    small_office: {
      category: 'offices',
      employees: 20,
      description: '20-person office',
    },
    logistics: {
      category: 'logistics',
      vehicles: 5,
      description: '5-vehicle fleet',
    },
    manufacturing: {
      category: 'manufacturing',
      employees: 50,
      description: '50-person factory',
    },
    custom: {
      category: 'services',
      customScopeKg: 10000,
      description: 'Custom scope (10 ton)',
    },
  },
};
