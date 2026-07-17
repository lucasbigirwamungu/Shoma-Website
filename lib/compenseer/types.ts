// Compenseer & Leer type definitions

export type DonationType = 'individual' | 'business';
export type TreeStatus = 'healthy' | 'monitoring' | 'at_risk' | 'inactive';
export type HealthStatus = 'excellent' | 'good' | 'fair' | 'poor';
export type InputType = 'flight_hours' | 'distance_km' | 'annual_footprint' | 'business_scope';
export type CertificateType = 'individual' | 'business';
export type MpesaStatus = 'pending' | 'successful' | 'failed';
export type DonationStatus = 'pending' | 'completed' | 'failed';

export interface TreeSpecies {
  id: string;
  name: string;
  scientificName: string;
  co2KgPerYear: number;
  lifecycleYears: number;
  description: string;
  region: string;
}

export interface Donation {
  id: string;
  donorId: string;
  donationType: DonationType;
  co2Kg: number;
  amountEur: number;
  treesAllocated: number;
  status: DonationStatus;
  certificateId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tree {
  id: string;
  donationId: string;
  speciesId: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  locationDescription?: string;
  schoolName?: string;
  localCaretakerId: string;
  mPesaPhone: string;
  plantingDate: Date;
  status: TreeStatus;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TreeLog {
  id: string;
  treeId: string;
  logDate: Date;
  stemDiameterCm?: number;
  heightCm?: number;
  healthStatus?: HealthStatus;
  photoUrl?: string;
  notes?: string;
  validatedBy?: string;
  validationDate?: Date;
  createdAt: Date;
}

export interface MpesaPayment {
  id: string;
  treeId: string;
  phoneNumber: string;
  amountKsh: number;
  status: MpesaStatus;
  mPesaRef?: string;
  mPesaReceiptNumber?: string;
  reason: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Certificate {
  id: string;
  donationId: string;
  certificateType: CertificateType;
  pdfUrl: string;
  donorName: string;
  donorEmail: string;
  treesCount: number;
  co2OffsetKg: number;
  generatedAt: Date;
  downloadedAt?: Date;
  createdAt: Date;
}

export interface CampaignData {
  id: string;
  donationId: string;
  inputType: InputType;
  flightHours?: number;
  distanceKm?: number;
  annualFootprintKg?: number;
  businessCategory?: string;
  businessEmployees?: number;
  businessVehicles?: number;
  customParams?: Record<string, unknown>;
  createdAt: Date;
}

// Calculation payload
export interface CompenseerCalculation {
  co2Kg: number;
  amountEur: number;
  treesAllocated: number;
  selectedSpecies: TreeSpecies[];
  breakdown: {
    co2Source: string;
    co2Total: number;
    pricePerKg: number;
    treesPerKg: number;
  };
}

export interface IndividualFootprint {
  flightHours?: number;
  distanceKm?: number;
  annualFootprintKg?: number;
}

export interface BusinessFootprint {
  category: string;
  employees?: number;
  vehicles?: number;
  customScopeKg?: number;
}
