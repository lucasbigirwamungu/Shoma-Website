# Complete Shoma Platform - Setup & Deployment Reference

## 📚 Table of Contents

1. [Quick Start](#quick-start)
2. [Architecture Overview](#architecture-overview)
3. [Setup Guides](#setup-guides)
4. [Feature Documentation](#feature-documentation)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your values (for testing, use empty/mock values)

# Start dev server
npm run dev

# Open http://localhost:3000
```

### Production

See: [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md)

---

## Architecture Overview

### Technology Stack

```
Frontend: Next.js 15 (App Router) + TypeScript + Tailwind CSS
Backend: Next.js API Routes (server-side)
Database: Supabase PostgreSQL
Auth: Supabase Auth + Admin JWT
Storage: Local / Supabase / Cloudinary
Payments: Mollie (iDEAL) + M-Pesa (Safaricom)
Email: Resend (transactional)
Hosting: Vercel
```

### Database Schema

**7 Tables (Compenseer & Leer Platform):**

```sql
compenseer_tree_species        -- 5 species (Mango, Acacia, etc.)
compenseer_donations           -- All donations with CO2 data
compenseer_trees              -- Individual trees planted
compenseer_tree_logs          -- Growth monitoring logs
compenseer_mpesa_payments     -- M-Pesa transaction records
compenseer_certificates       -- PDF certificates for donors
compenseer_campaign_data      -- Analytics data
```

### Directory Structure

```
shoma-platform/
├── app/                          # Next.js app routes
│   ├── page.tsx                 # Homepage
│   ├── doneren/                 # Donation flow
│   ├── compenseer-en-leer/      # CO2 platform
│   ├── admin/                   # Admin dashboard
│   ├── nieuws/                  # News/newsletters
│   ├── over-ons/                # About page
│   ├── projecten/               # Projects
│   ├── voor-bedrijven/          # B2B
│   ├── fotoalbums/              # Photo galleries
│   └── api/                     # API routes
│
├── components/                   # React components
│   ├── layout/                  # Nav, footer, etc.
│   ├── compenseer/              # Donation forms
│   ├── admin/                   # Admin UI
│   └── ...
│
├── lib/                          # Utilities & configs
│   ├── image-config.ts          # Image storage setup
│   ├── mpesa-service.ts         # M-Pesa API client
│   ├── admin-auth.ts            # Admin RBAC
│   ├── rate-limiter.ts          # Rate limiting
│   ├── api-utils.ts             # Error handling
│   ├── newsletter-data.ts       # 23 newsletters
│   └── ...
│
├── public/                       # Static assets
│   ├── images/                  # User-uploaded photos
│   ├── shoma-logo-*.svg         # Logo files
│   └── documenten/              # PDFs (jaarrekening, etc.)
│
├── supabase/migrations/         # Database migrations
│   ├── 001_initial.sql
│   ├── 002_auth.sql
│   └── 003_compenseer_en_leer.sql
│
├── .env.local.example           # Environment template
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind theme
└── package.json
```

---

## Setup Guides

### 1. Database (Supabase)
**Time: 30 min**
→ Read: [SUPABASE_SETUP_COMPLETE.md](./SUPABASE_SETUP_COMPLETE.md)

**What you'll do:**
- Create Supabase project
- Gather API credentials
- Run database migrations (7 tables)
- Configure RLS policies
- Set up Storage bucket
- Configure authentication

**Deliverables:**
- Credentials in .env.local
- 7 database tables live
- Authentication working
- Image storage bucket created

---

### 2. Images (Upload & Storage)
**Time: 15 min**
→ Use: `lib/image-config.ts` + `components/admin/ImageUploadManager.tsx`

**Options:**
1. **Local** (dev)
   - Files in `public/images/[folder]`
   - Fast, no external deps
   - Limited scale

2. **Supabase** (recommended)
   - Cloud storage in same dashboard
   - CDN + backup automatic
   - Easy RBAC

3. **Cloudinary** (professional)
   - Advanced transforms
   - Easy admin uploads
   - Paid tier

**Implementation:**
```typescript
// Use anywhere in app
import { getImageUrl } from '@/lib/image-config';
const url = getImageUrl('filename.jpg', 'fotoalbums');
```

---

### 3. M-Pesa (Payment Processing)
**Time: 45 min sandbox + 7 days production**
→ Read: [MPESA_SETUP_COMPLETE.md](./MPESA_SETUP_COMPLETE.md)

**Setup phases:**
1. Register Safaricom Daraja account
2. Get sandbox credentials
3. Test with sample transactions
4. Request production approval
5. Configure callbacks

**What you get:**
- STK Push (customer enters PIN on phone)
- Transaction confirmation via webhook
- B2C payouts (to caretakers)
- Automatic logging

---

### 4. Email (Resend Service)
**Time: 10 min**
→ Use: `lib/compenseer/email-service.ts`

**Setup:**
1. Create account at resend.com
2. Verify sending domain
3. Get API key
4. Add to .env.local: `RESEND_API_KEY`

**Features:**
- Donation confirmations
- Newsletter signups
- Business certificates
- Admin alerts

---

### 5. Admin Authentication
**Time: 20 min**
→ Files: `lib/admin-auth.ts`, `components/admin/AdminAuthProvider.tsx`

**Roles & Permissions:**
```
super_admin → Full access (all features)
admin       → Content + Payment management
editor      → Content creation only
```

**Usage:**
```typescript
// In component
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
const { user, hasPermission } = useAdminAuth();
```

---

## Feature Documentation

### Homepage (/)

**Components:**
- Hero section (Unsplash images)
- Impact dashboard (animating stats)
- Project grid (6 projects)
- Partnership tiers (B2B)
- CTA sections

**Data:**
- Hardcoded in `app/page.tsx`
- Easily editable text
- Images: Unsplash or your uploads

---

### Donations (/doneren)

**Flow:**
1. Select donation type (KEMPS €350 vs Regular €40)
2. Enter personal info
3. Choose payment method
4. Mollie payment (iDEAL) or M-Pesa
5. Success page + email confirmation

**Components:**
- `IndividualDonationForm` (4-step)
- `BusinessDonationForm` (company donations)
- Payment processing

---

### Compenseer & Leer (/compenseer-en-leer)

**Features:**
- CO2 calculator (flight/car/annual emissions)
- Tiered pricing (volume discount)
- Tree planting tracking
- Certificate generation
- Admin dashboard (stats + management)

**Pricing Tiers:**
```
0-2k kg    → €0.025/kg
2-5k kg    → €0.022/kg
5-10k kg   → €0.020/kg
10k+ kg    → €0.015/kg
```

**Tree Species:**
```
Mango      → 21.5 kg CO2/year
Acacia     → 15.3 kg CO2/year
Eucalyptus → 24.1 kg CO2/year
Banana     → 8.7 kg CO2/year
Avocado    → 19.2 kg CO2/year
```

---

### Newsletter (/nieuws)

**Features:**
- 3 featured recent items (main page)
- All 23 newsletters in collapsible year buckets
- Direct links to shoma.nl originals
- Email signup integration

**Data Source:**
- `lib/newsletter-data.ts` (23 items, 2012-2025)
- Grouped by year in UI

---

### About Page (/over-ons)

**Sections:**
- Organization story
- ANBI status + fiscal deduction info
- Board members (6 people)
- Ambassadors (2 people)
- Jaarrekeningen (financials 2025+)
- Beleidsplan 2026-2028

**Key Metrics Displayed:**
- RSIN: 814390249 (copypaste-friendly)
- IBAN: NL55 ABNA 0501 3541 58
- Founded: 2005
- Kids supported: 229 total (74 KEMPS, 155 regular)

---

### Admin Dashboard (/admin)

**Requires:** Supabase setup + admin auth

**Tabs:**
1. **Overview** — Stats dashboard (donations, trees, payments)
2. **Trees** — Tree planting logs, GPS tracking
3. **M-Pesa** — Transaction records, reconciliation
4. **Donors** — Donor list, segmentation

**Components:**
- Real-time Supabase queries
- Export CSV functionality
- Charts (Chart.js or Recharts)

---

## Deployment

### To Vercel (Recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect GitHub to Vercel (once)
vercel link

# 3. Set environment variables
vercel env pull
# Edit .env.local with production values

# 4. Deploy
vercel --prod
```

**First deployment:** ~2-3 minutes
**Subsequent:** ~30-60 seconds

### To Self-Hosted

```bash
# Build production bundle
npm run build

# Start server
npm run start

# Run on port 3000
# Use PM2 or systemd to keep alive
# Set up reverse proxy (nginx/Apache)
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Database Connection Issues

```bash
# Verify .env.local has correct values
# Check Supabase project is running
# Test connection:
psql postgresql://postgres:pwd@xxx.supabase.co:5432/postgres

# Check RLS policies not blocking
# Review Supabase logs: Dashboard → Logs
```

### M-Pesa Payments Not Working

```bash
# 1. Check credentials in .env
# 2. Verify callback URL registered in Safaricom
# 3. Check ngrok tunnel active (dev)
# 4. Review API logs: /api/mpesa/callback
# 5. Test with: curl -X POST http://localhost:3000/api/mpesa/stk-push ...
```

### Email Not Sending

```bash
# 1. Check Resend API key
# 2. Verify sending domain configured
# 3. Check spam folder
# 4. Review Resend logs
# 5. Test manually: npm run test:email
```

### Images Not Displaying

```bash
# 1. Check image storage config in .env
# 2. Verify images exist in /public/images or storage bucket
# 3. Check CORS headers (Supabase)
# 4. Review image URLs in Network tab (browser dev tools)
```

---

## Next Steps

### Immediate

- [ ] Read Supabase setup guide
- [ ] Create Supabase project
- [ ] Configure .env.local with credentials
- [ ] Test donation flow locally
- [ ] Set up Resend account

### Week 1

- [ ] Get M-Pesa sandbox credentials
- [ ] Test M-Pesa payment flow
- [ ] Configure admin authentication
- [ ] Upload initial photos

### Week 2

- [ ] Request M-Pesa production approval
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Test all payment methods live

### Month 1

- [ ] Request Safaricom production credentials
- [ ] Full production testing
- [ ] Monitor analytics
- [ ] Plan caretaker mobile app (next phase)

---

## Support & Debugging

### Log Locations

```
# Dev mode
Browser console (http://localhost:3000)
Terminal (npm run dev output)

# Production (Vercel)
Vercel Dashboard → Deployments → Logs
Sentry (if configured)
```

### Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code quality
npm run format       # Format with Prettier
npm test             # Run tests (jest)
npm run type-check   # TypeScript validation
```

### Database Operations

```bash
# Connect directly
psql postgresql://postgres:password@project.supabase.co:5432/postgres

# Export backup
pg_dump --file=backup.sql --no-password $DATABASE_URL

# View table
SELECT * FROM compenseer_donations LIMIT 10;
```

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://www.typescriptlang.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Safaricom Daraja**: https://developer.safaricom.co.ke
- **Resend**: https://resend.com/docs

---

## License & Credits

**Stichting Shoma** - Education NGO, Tanzania 🇹🇿
Built with Next.js 15, Supabase, and ❤️ for education.

---

**Last Updated:** June 10, 2024
**Version:** 1.0.0
**Status:** Production-Ready
