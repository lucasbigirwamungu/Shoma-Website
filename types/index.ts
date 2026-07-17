// ─────────────────────────────────────────────────────────────────────────────
// Stichting Shoma – Gedeelde TypeScript Types
// ─────────────────────────────────────────────────────────────────────────────

// ─── Donatie ─────────────────────────────────────────────────────────────────

export type DonationFrequency = 'once' | 'monthly';
export type DonationStatus = 'pending' | 'paid' | 'failed' | 'expired';
export type ProjectCategory = 'education' | 'water' | 'energy';

export interface DonationState {
  amount: number;
  frequency: DonationFrequency;
  donorName: string;
  donorEmail: string;
  newsletterOptIn: boolean;
  selectedProjectId?: string;
}

export interface DonationFormStep {
  step: 1 | 2 | 3;
}

// Preset bedragen met gekoppelde impactbeschrijving (voor UI-anchoring)
export interface DonationPreset {
  amount: number;
  label: string;
  description: string;
  icon: string;
}

// ─── B2B Leads ───────────────────────────────────────────────────────────────

export type MvoInterestArea = 'education' | 'water' | 'energy' | 'general';

export interface B2BLeadPayload {
  companyName: string;
  contactName: string;
  corporateEmail: string;
  phoneNumber?: string;
  mvoInterestArea: MvoInterestArea;
  projectPreference?: string;
  message?: string;
}

// ─── Projecten ───────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  currentFunding: number;
  targetFunding: number;
  impactMultiplier: number;
  imageUrl: string;
  sdgGoals: number[];
  stats: ProjectStat[];
}

export interface ProjectStat {
  label: string;
  value: string;
  unit?: string;
}

// ─── Trust Dashboard ─────────────────────────────────────────────────────────

export interface TrustMetric {
  id: string;
  value: string;
  label: string;
  sublabel: string;
  animateFrom?: number;
  animateTo?: number;
}

// ─── API Responses ───────────────────────────────────────────────────────────

export interface CheckoutResponse {
  checkoutUrl: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}
