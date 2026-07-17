-- Compenseer & Leer: CO2-compensation + tree planting + education platform
-- Schema for tracking donations, trees, growth logs, and M-Pesa payments

-- Tree species with CO2 sequestration rates (kg CO2/year)
CREATE TABLE compenseer_tree_species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  scientific_name TEXT,
  co2_kg_per_year DECIMAL(5, 2) NOT NULL,
  lifecycle_years INT DEFAULT 20,
  description TEXT,
  region TEXT DEFAULT 'Tanzania',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donation campaigns (individual vs business mode)
CREATE TABLE compenseer_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL,
  donation_type TEXT NOT NULL CHECK (donation_type IN ('individual', 'business')),
  co2_kg DECIMAL(10, 2) NOT NULL,
  amount_eur DECIMAL(10, 2) NOT NULL,
  trees_allocated INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  certificate_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tree records (planted in Rubya, tracked by local caretaker)
CREATE TABLE compenseer_trees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID REFERENCES compenseer_donations(id) ON DELETE CASCADE,
  species_id UUID REFERENCES compenseer_tree_species(id),
  gps_latitude DECIMAL(10, 8),
  gps_longitude DECIMAL(11, 8),
  location_description TEXT,
  school_name TEXT,
  local_caretaker_id TEXT NOT NULL,
  m_pesa_phone TEXT NOT NULL,
  planting_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('healthy', 'monitoring', 'at_risk', 'inactive')),
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Growth logs: diameter, height, health status, photo evidence
CREATE TABLE compenseer_tree_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tree_id UUID NOT NULL REFERENCES compenseer_trees(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  stem_diameter_cm DECIMAL(5, 2),
  height_cm INT,
  health_status TEXT CHECK (health_status IN ('excellent', 'good', 'fair', 'poor')),
  photo_url TEXT,
  notes TEXT,
  validated_by UUID,
  validation_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- M-Pesa transactions for caretaker payments
CREATE TABLE compenseer_mpesa_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tree_id UUID NOT NULL REFERENCES compenseer_trees(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  amount_ksh INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'successful', 'failed')),
  m_pesa_ref TEXT,
  m_pesa_receipt_number TEXT,
  reason TEXT DEFAULT 'tree_growth_validation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Digital certificates (PDF URLs)
CREATE TABLE compenseer_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL REFERENCES compenseer_donations(id) ON DELETE CASCADE,
  certificate_type TEXT NOT NULL CHECK (certificate_type IN ('individual', 'business')),
  pdf_url TEXT NOT NULL,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  trees_count INT NOT NULL,
  co2_offset_kg DECIMAL(10, 2) NOT NULL,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  downloaded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign metadata (for individual vs business segmentation)
CREATE TABLE compenseer_campaign_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_id UUID NOT NULL REFERENCES compenseer_donations(id) ON DELETE CASCADE,
  input_type TEXT NOT NULL CHECK (input_type IN ('flight_hours', 'distance_km', 'annual_footprint', 'business_scope')),
  flight_hours INT,
  distance_km INT,
  annual_footprint_kg DECIMAL(10, 2),
  business_category TEXT,
  business_employees INT,
  business_vehicles INT,
  custom_params JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_donations_donor_id ON compenseer_donations(donor_id);
CREATE INDEX idx_donations_status ON compenseer_donations(status);
CREATE INDEX idx_donations_type ON compenseer_donations(donation_type);
CREATE INDEX idx_trees_donation_id ON compenseer_trees(donation_id);
CREATE INDEX idx_trees_status ON compenseer_trees(status);
CREATE INDEX idx_trees_caretaker ON compenseer_trees(local_caretaker_id);
CREATE INDEX idx_tree_logs_tree_id ON compenseer_tree_logs(tree_id);
CREATE INDEX idx_tree_logs_date ON compenseer_tree_logs(log_date);
CREATE INDEX idx_mpesa_tree_id ON compenseer_mpesa_payments(tree_id);
CREATE INDEX idx_mpesa_status ON compenseer_mpesa_payments(status);
CREATE INDEX idx_certificates_donation_id ON compenseer_certificates(donation_id);
CREATE INDEX idx_campaign_donation_id ON compenseer_campaign_data(donation_id);

-- Enable RLS (Row Level Security)
ALTER TABLE compenseer_tree_species ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_tree_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_mpesa_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_campaign_data ENABLE ROW LEVEL SECURITY;

-- Seed default tree species (Tanzania-appropriate)
INSERT INTO compenseer_tree_species (name, scientific_name, co2_kg_per_year, lifecycle_years, description, region) VALUES
  ('Mango', 'Mangifera indica', 21.5, 40, 'High-value fruit tree, rapid growth, excellent CO2 sequestration', 'Tanzania'),
  ('Acacia', 'Acacia polyacantha', 15.3, 35, 'Indigenous hardwood, drought-resistant, nitrogen-fixing', 'Tanzania'),
  ('Eucalyptus', 'Eucalyptus globulus', 24.1, 30, 'Fast-growing construction timber, excellent CO2 uptake', 'Tanzania'),
  ('Banana (clump)', 'Musa spp.', 8.7, 15, 'Quick food production, perennial, year-round income for caretaker', 'Tanzania'),
  ('Avocado', 'Persea americana', 19.2, 35, 'Valuable fruit export, good CO2 storage, premium market', 'Tanzania')
ON CONFLICT (name) DO NOTHING;
