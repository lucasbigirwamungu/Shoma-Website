# Stichting Shoma – Platform

Volledig herontworpen website voor Stichting Shoma: een Next.js 15 platform met geïntegreerde Mollie-betalingen, Supabase-database en een dual-funnel voor particuliere donateurs én zakelijke MVO-partners.

## Tech Stack

| Laag | Technologie |
|------|------------|
| Framework | Next.js 15 (App Router) |
| Taal | TypeScript |
| Styling | Tailwind CSS (Shoma design tokens) |
| Database | Supabase (PostgreSQL) |
| Betalingen | Mollie (iDEAL / Apple Pay / Creditcard) |
| E-mail | Resend |
| Hosting | Vercel |

## Lokaal starten

```bash
# 1. Kloon de repo
git clone https://github.com/shoma-nl/platform.git
cd platform

# 2. Installeer dependencies
npm install

# 3. Configureer environment variables
cp .env.local.example .env.local
# Vul de waarden in .env.local in (zie hieronder)

# 4. Start de dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Zie `.env.local.example` voor alle benodigde variabelen:

| Variabele | Omschrijving |
|-----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL van de site (lokaal: `http://localhost:3000`) |
| `MOLLIE_API_KEY` | Mollie test- of live-sleutel |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `RESEND_API_KEY` | Resend API key voor B2B e-mailnotificaties |
| `RESEND_FROM_EMAIL` | Afzenderadres (bijv. `noreply@shoma.nl`) |
| `PARTNER_EMAIL` | Ontvangstadres voor B2B-leads (bijv. `partners@shoma.nl`) |

## Database Setup (Supabase)

```sql
-- Voer uit in Supabase SQL Editor:
-- 1. Basis schema
supabase/migrations/001_initial_schema.sql

-- 2. RPC functies
supabase/migrations/002_rpc_functions.sql
```

## Projectstructuur

```
shoma-platform/
├── app/
│   ├── page.tsx                    # Homepage (dual-pathway)
│   ├── doneren/page.tsx            # Donatiepagina (multi-step Mollie)
│   ├── doneren/bedankt/page.tsx    # Bedankt-pagina na betaling
│   ├── voor-bedrijven/page.tsx     # B2B / MVO landingspagina
│   ├── projecten/page.tsx          # Projectoverzicht
│   ├── over-ons/page.tsx           # Organisatie & ANBI
│   ├── nieuws/page.tsx             # Nieuws & updates
│   └── api/
│       ├── donate/checkout/        # Mollie betaalsessie aanmaken
│       ├── donate/webhook/         # Mollie statusupdates ontvangen
│       └── partners/contact/       # B2B intake + Resend notificatie
├── components/
│   ├── home/                       # Homepage secties
│   ├── donation/                   # DonationForm + ImpactCalculator
│   ├── b2b/                        # B2BContactForm
│   ├── layout/                     # Navbar + Footer
│   └── ui/                         # Button, AnimatedCounter, ShareButton
├── lib/
│   ├── mollie.ts                   # Mollie singleton client
│   ├── supabase.ts                 # Supabase client (browser + server)
│   ├── resend.ts                   # E-mailnotificatie B2B leads
│   ├── validations.ts              # Zod schemas
│   └── projects.ts                 # Statische projectdata
├── types/index.ts                  # Gedeelde TypeScript interfaces
└── supabase/migrations/            # Database DDL + RPC functies
```

## Deployment (Vercel)

1. Verbind de GitHub repo met Vercel
2. Voeg alle environment variables toe in het Vercel Dashboard
3. Deploy — Vercel detecteert Next.js automatisch

## Volgende stappen (fase 2)

- [ ] Maandelijkse SEPA Direct Debit via Mollie subscriptions uitbouwen
- [ ] Jaarrekeningen opslaan via Supabase Storage
- [ ] Nieuwsbrief-integratie (bijv. Mailchimp / Klaviyo)
- [ ] Admin dashboard voor bestuursleden (donatie-overzicht)
- [ ] Projectfoto's + logo's uploaden via Supabase Storage
- [ ] Meertalige ondersteuning (NL / EN)
