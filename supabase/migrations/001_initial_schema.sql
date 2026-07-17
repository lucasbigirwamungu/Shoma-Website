-- ─────────────────────────────────────────────────────────────────────────────
-- Stichting Shoma – Initieel Database Schema
-- Voer dit uit via het Supabase SQL Editor of Supabase CLI
-- ─────────────────────────────────────────────────────────────────────────────

-- Status-enumeraties
CREATE TYPE donation_status    AS ENUM ('pending', 'paid', 'failed', 'expired');
CREATE TYPE donation_frequency AS ENUM ('once', 'monthly');
CREATE TYPE project_category   AS ENUM ('education', 'water', 'energy');

-- ─── Projecten ───────────────────────────────────────────────────────────────
-- Dynamisch gevoed vanuit de UI en de impact-calculator
CREATE TABLE projects (
    id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    title             VARCHAR(255) NOT NULL,
    category          project_category NOT NULL,
    current_funding   DECIMAL(12, 2) DEFAULT 0.00,
    target_funding    DECIMAL(12, 2) NOT NULL,
    impact_multiplier DECIMAL(5, 2) NOT NULL,  -- bijv. 40.00 = €40 per kind per jaar
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ─── Donateurs ────────────────────────────────────────────────────────────────
-- AVG-compliant: minimale persoonsgegevens, uitdrukkelijke opt-in voor nieuwsbrief
CREATE TABLE donors (
    id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name        VARCHAR(100) NOT NULL,
    last_name         VARCHAR(100) NOT NULL,
    email             VARCHAR(255) UNIQUE NOT NULL,
    newsletter_opt_in BOOLEAN      DEFAULT FALSE,
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ─── Donaties / Transacties ──────────────────────────────────────────────────
-- Gekoppeld aan Mollie metadata voor volledige traceerbaarheid
CREATE TABLE donations (
    id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id          UUID         REFERENCES donors(id) ON DELETE SET NULL,
    project_id        UUID         REFERENCES projects(id) ON DELETE SET NULL,  -- NULL = algemeen fonds
    mollie_payment_id VARCHAR(255) UNIQUE NOT NULL,
    amount            DECIMAL(10, 2) NOT NULL,
    frequency         donation_frequency NOT NULL,
    status            donation_status DEFAULT 'pending',
    -- Opgeslagen voor rapportage zonder PII-koppeling
    donor_name_snapshot VARCHAR(200),
    created_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ─── B2B Leads ───────────────────────────────────────────────────────────────
-- Directe opvolging door het bestuur via partners@shoma.nl
CREATE TABLE b2b_leads (
    id                 UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name       VARCHAR(255) NOT NULL,
    contact_name       VARCHAR(255) NOT NULL,
    corporate_email    VARCHAR(255) NOT NULL,
    phone_number       VARCHAR(50),
    mvo_interest_area  VARCHAR(100) NOT NULL,
    project_preference VARCHAR(100),
    message            TEXT,
    is_followed_up     BOOLEAN      DEFAULT FALSE,
    created_at         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ─── Seed data: Projecten ────────────────────────────────────────────────────
INSERT INTO projects (title, category, current_funding, target_funding, impact_multiplier) VALUES
  ('KEMPS Basisschool – Kwaliteitsonderwijs', 'education', 18600.00, 25000.00, 30.00),
  ('Schoon Drinkwater – BAENT Waterproject',   'water',     12400.00, 20000.00, 1.00),
  ('Duurzame Energie – Solar & Moestuin',      'energy',     7800.00, 15000.00, 50.00);

-- ─── Indices voor performante queries ────────────────────────────────────────
CREATE INDEX idx_donations_donor_id        ON donations(donor_id);
CREATE INDEX idx_donations_mollie_id       ON donations(mollie_payment_id);
CREATE INDEX idx_donations_status          ON donations(status);
CREATE INDEX idx_b2b_leads_followed_up     ON b2b_leads(is_followed_up);
CREATE INDEX idx_donors_email              ON donors(email);

-- ─── Automatische updated_at trigger ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_donations_updated_at
    BEFORE UPDATE ON donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
