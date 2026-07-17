import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Create a new donation record
 */
export async function createDonation(data: {
  donorId: string;
  donationType: 'individual' | 'business';
  co2Kg: number;
  amountEur: number;
  treesAllocated: number;
}) {
  const { data: donation, error } = await supabase
    .from('compenseer_donations')
    .insert([
      {
        donor_id: data.donorId,
        donation_type: data.donationType,
        co2_kg: data.co2Kg,
        amount_eur: data.amountEur,
        trees_allocated: data.treesAllocated,
        status: 'completed',
      },
    ])
    .select();

  if (error) throw error;
  return donation[0];
}

/**
 * Get tree species
 */
export async function getTreeSpecies() {
  const { data, error } = await supabase
    .from('compenseer_tree_species')
    .select('*');

  if (error) throw error;
  return data;
}

/**
 * Create tree records for a donation
 */
export async function createTrees(data: {
  donationId: string;
  speciesIds: string[];
  locationDescription: string;
  schoolName?: string;
  mPesaPhone: string;
}) {
  const trees = data.speciesIds.map((speciesId) => ({
    donation_id: data.donationId,
    species_id: speciesId,
    location_description: data.locationDescription,
    school_name: data.schoolName || 'Rubya School',
    local_caretaker_id: `CARETAKER_${Date.now()}`,
    m_pesa_phone: data.mPesaPhone,
    planting_date: new Date().toISOString().split('T')[0],
    status: 'healthy',
  }));

  const { data: result, error } = await supabase
    .from('compenseer_trees')
    .insert(trees)
    .select();

  if (error) throw error;
  return result;
}

/**
 * Create a certificate record
 */
export async function createCertificate(data: {
  donationId: string;
  certificateType: 'individual' | 'business';
  pdfUrl: string;
  donorName: string;
  donorEmail: string;
  treesCount: number;
  co2OffsetKg: number;
}) {
  const { data: certificate, error } = await supabase
    .from('compenseer_certificates')
    .insert([
      {
        donation_id: data.donationId,
        certificate_type: data.certificateType,
        pdf_url: data.pdfUrl,
        donor_name: data.donorName,
        donor_email: data.donorEmail,
        trees_count: data.treesCount,
        co2_offset_kg: data.co2OffsetKg,
      },
    ])
    .select();

  if (error) throw error;
  return certificate[0];
}

/**
 * Log campaign data for analytics
 */
export async function logCampaignData(data: {
  donationId: string;
  inputType: 'flight_hours' | 'distance_km' | 'annual_footprint' | 'business_scope';
  flightHours?: number;
  distanceKm?: number;
  annualFootprintKg?: number;
  businessCategory?: string;
  businessEmployees?: number;
  businessVehicles?: number;
}) {
  const { error } = await supabase
    .from('compenseer_campaign_data')
    .insert([
      {
        donation_id: data.donationId,
        input_type: data.inputType,
        flight_hours: data.flightHours,
        distance_km: data.distanceKm,
        annual_footprint_kg: data.annualFootprintKg,
        business_category: data.businessCategory,
        business_employees: data.businessEmployees,
        business_vehicles: data.businessVehicles,
      },
    ]);

  if (error) throw error;
}

/**
 * Get dashboard stats
 */
export async function getDashboardStats() {
  const [donations, trees, payments] = await Promise.all([
    supabase
      .from('compenseer_donations')
      .select('co2_kg, trees_allocated')
      .eq('status', 'completed'),
    supabase
      .from('compenseer_trees')
      .select('status')
      .eq('status', 'healthy'),
    supabase
      .from('compenseer_mpesa_payments')
      .select('status')
      .eq('status', 'pending'),
  ]);

  const totalCo2 =
    donations.data?.reduce((sum, d) => sum + d.co2_kg, 0) || 0;
  const totalTrees =
    donations.data?.reduce((sum, d) => sum + d.trees_allocated, 0) || 0;
  const healthyTrees = trees.data?.length || 0;
  const pendingPayments = payments.data?.length || 0;

  return {
    totalDonations: donations.data?.length || 0,
    totalCo2,
    totalTrees,
    healthyTrees,
    pendingPayments,
  };
}
