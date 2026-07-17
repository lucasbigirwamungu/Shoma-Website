# Supabase Setup Gids - Stap voor Stap

## 📋 Overzicht

Dit gids configureert Supabase voor de volledige Shoma platform:
- Database (PostgreSQL) met 7 tabellen (Compenseer & Leer)
- Authentication (Email, Google, Apple)
- Storage (afbeeldingen)
- RLS (Row-Level Security) policies
- Email integraties

**Totale tijd:** ~30 minuten

---

## **STAP 1: Supabase Project Aanmaken**

### 1.1 Ga naar [supabase.com](https://supabase.com)

```
- Klik "Start your project"
- Log in met GitHub of email
```

### 1.2 Maak een nieuw project

```
Organization:     Persoonlijk / Stichting Shoma
Project name:     shoma-platform (of shoma-production)
Database:         Kies sterkste regio dicht bij users
  → EU: Frankfurt of London (voor Europa)
  → Africa: Kapstad (voor Tanzania)
Password:         [Kies sterk wachtwoord, sla op]
Pricing:          Free tier OK voor start; upgrade later
```

### 1.3 Wacht tot database initialiseerd

```
Duurt ~2-3 minuten
Je ziet: "Your project is ready!"
```

---

## **STAP 2: API Keys Verzamelen**

### 2.1 Settings → API

```
Home → Project Settings (tandwielpictogram) → API

Kopieer deze sleutels (HELEMAAL VERTROUWELIJK):

NEXT_PUBLIC_SUPABASE_URL:   https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY:   [eyJhbGc... (lang)]
SUPABASE_SERVICE_ROLE_KEY:  [eyJhbGc... (lang)]

⚠️  Service Role Key NEVER in frontend! Enkel server-side.
```

### 2.2 Sla op in .env.local

```bash
# Maak .env.local aan (al gemaakt van template)
nano .env.local
```

Voeg in:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# Database (optional, for direct connection)
DATABASE_URL=postgresql://postgres:[your-password]@[your-project].supabase.co:5432/postgres

# Resend Email (optional, for production)
RESEND_API_KEY=[your-resend-key]

# Image Storage
NEXT_PUBLIC_IMAGE_STORAGE=local  # Change to 'supabase' later
```

**Bewaar deze keys veilig!** Nooit in Git, nooit public.

---

## **STAP 3: Database Migrations Uitvoeren**

### 3.1 Verbind met Supabase CLI

```bash
# Installeer Supabase CLI (eenmalig)
npm install -g supabase

# Login
supabase login
# Volg prompts, authenticate met GitHub
```

### 3.2 Run migrations

```bash
# Ga naar project root
cd /Users/lucasbigirwamungu/Library/CloudStorage/OneDrive-Saxion\(2\)/Lucas\ Bigirwamungu/Claude/shoma-platform

# Push database migrations naar Supabase
supabase db push

# Of: Manual via SQL Editor (zie stap 3.3)
```

### 3.3 Alternative: Manual SQL via Supabase Dashboard

```
Supabase Dashboard → SQL Editor → Maak nieuwe query

Klik knop: "Uploads" → Select file
Selecteer: supabase/migrations/003_compenseer_en_leer.sql

Klik "Run"
```

**Wacht tot klaar.** Je ziet groen vinkje: ✅ Success

### 3.4 Verifieer tabellen

```
Supabase Dashboard → Table Editor

Je ziet nu:
✅ compenseer_tree_species
✅ compenseer_donations
✅ compenseer_trees
✅ compenseer_tree_logs
✅ compenseer_mpesa_payments
✅ compenseer_certificates
✅ compenseer_campaign_data
```

---

## **STAP 4: RLS (Row-Level Security) Policies**

RLS zorgt dat users alleen hun eigen data kunnen zien.

### 4.1 Enable RLS per tabel

```sql
-- Run in SQL Editor

ALTER TABLE compenseer_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_mpesa_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_campaign_data ENABLE ROW LEVEL SECURITY;

-- Tabellen die public read moeten zijn (geen user_id)
-- compenseer_tree_species, compenseer_tree_logs → NIET restricted
```

### 4.2 Public read access for species & logs

```sql
-- Tree species: iedereen mag lezen
CREATE POLICY "Allow public read" ON compenseer_tree_species
  FOR SELECT USING (true);

-- Tree logs: iedereen mag lezen (geen sensitive data)
CREATE POLICY "Allow public read" ON compenseer_tree_logs
  FOR SELECT USING (true);
```

### 4.3 User-specific read access

```sql
-- Donations: users zien alleen hun eigen
CREATE POLICY "Users can read own donations" ON compenseer_donations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own donations" ON compenseer_donations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Certificates: users zien alleen hun eigen
CREATE POLICY "Users can read own certificates" ON compenseer_certificates
  FOR SELECT USING (auth.uid() = user_id);

-- Similar for trees, logs, payments...
```

### 4.4 Admin access (service role)

```
Service role key omzeilt RLS automatisch.
De API route `/api/compenseer/donate` gebruikt service role
→ Kan data write-en namens users
→ Veilig, want API is server-side secret
```

---

## **STAP 5: Authentication Setup**

### 5.1 Email Authentication

```
Supabase Dashboard → Authentication → Providers

✅ Email verifying: Aan (default)

Settings:
- Require email confirmation: True
- Auto-confirm (dev only): False
```

### 5.2 Google OAuth (Optional)

```
Ga naar: Google Cloud Console
1. Maak nieuw project
2. OAuth 2.0 Credentials → Create credentials
3. Authorized JavaScript origins:
   http://localhost:3000
   https://yoursite.com
4. Authorized redirect URIs:
   https://[PROJECT_ID].supabase.co/auth/v1/callback

Kopieer: Client ID, Client Secret

Supabase → Authentication → Providers → Google
Paste: Client ID + Secret
Enable: True
```

### 5.3 Apple Sign-In (Optional, voor iOS)

Vergelijkbaar proces via Apple Developer Account.

---

## **STAP 6: Storage (Afbeeldingen)**

### 6.1 Maak Storage bucket

```
Supabase → Storage → New bucket

Bucket name: shoma-images
Public:      ✅ True (iedereen leest afbeeldingen)
```

### 6.2 Maak folders

```
In bucket, klik "Upload file" → Create folder

Folders:
- projecten/
- fotoalbums/
- bestuur/
- nieuws/
```

### 6.3 Storage policies

```sql
-- Public read access
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'shoma-images');

-- Admin upload
CREATE POLICY "Allow authenticated upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'shoma-images' 
    AND auth.role() = 'authenticated'
  );
```

---

## **STAP 7: Environment Variables Setup**

### 7.1 Update .env.local

```bash
# Supabase Production
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]

# Database backup (direct connection)
DATABASE_URL=postgresql://postgres:[password]@[project].supabase.co:5432/postgres

# Image Storage
NEXT_PUBLIC_IMAGE_STORAGE=supabase

# Resend Email (for newsletters)
RESEND_API_KEY=[your-resend-key]

# M-Pesa (later)
MPESA_CONSUMER_KEY=[later]
MPESA_CONSUMER_SECRET=[later]
```

### 7.2 Verify local build

```bash
npm run build

# Should succeed with 0 errors
```

---

## **STAP 8: Testen in Development**

### 8.1 Start dev server

```bash
npm run dev
# http://localhost:3000
```

### 8.2 Test donatie-flow

```
1. Ga naar /doneren
2. Vul form in
3. Klik "Donatie vervolgen"
4. Database → Should see new record in compenseer_donations

Supabase → Table Editor → compenseer_donations
✅ Ziet je donatie
```

### 8.3 Test authentication

```
1. Ga naar /admin/compenseer
2. Probeer in te loggen (Sign in with email)
3. Check Supabase → Authentication → Users

✅ User account gemaakt
```

---

## **STAP 9: Deployment naar Vercel**

### 9.1 Connect GitHub repo

```
1. Push naar GitHub
   git add .
   git commit -m "Add Supabase configuration"
   git push

2. Ga naar vercel.com
3. Import project → selecteer repo
```

### 9.2 Environment variables in Vercel

```
Project Settings → Environment Variables

Voeg in:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY
- DATABASE_URL

⚠️  Service role key is sensitive! Vercel ziet dit via knop "Show values"
```

### 9.3 Deploy!

```
Klik "Deploy"

Wacht ~2-3 min
✅ Live op https://[project].vercel.app
```

---

## **STAP 10: Monitoring & Backups**

### 10.1 Enable backups (Pro only)

```
Supabase → Settings → Backups

Free: Daily backup (7-day retention)
Pro: On-demand + daily (30-day retention)
```

### 10.2 Monitor database

```
Supabase → Database → Monitoring

- Connections
- Query performance
- Storage usage
```

### 10.3 View logs

```
Supabase → Logs

Monitor auth, API, function executions
```

---

## **Troubleshooting**

### ❌ "NEXT_PUBLIC_SUPABASE_URL is not set"

```
→ Check .env.local
→ Restart dev server: npm run dev
```

### ❌ "RLS policy violation"

```
→ Service role key is set? Check SUPABASE_SERVICE_ROLE_KEY
→ Policy too restrictive? See STAP 4.2-4.3
```

### ❌ "Failed to upload to storage"

```
→ Bucket exists? Storage → shoma-images
→ RLS policy correct? See STAP 6.3
```

### ❌ "Migration failed"

```
→ SQL syntax error? Check 003_compenseer_en_leer.sql
→ Tables already exist? Drop first:
   DROP TABLE IF EXISTS compenseer_donations CASCADE;
→ Run migration again
```

---

## **Checklist: Alles Klaar?**

- [ ] Supabase project aangemaakt
- [ ] API keys in .env.local
- [ ] Migrations gerund (7 tabellen zichtbaar)
- [ ] RLS policies ingesteld
- [ ] Storage bucket gemaakt
- [ ] Authentication providers ingesteld
- [ ] Dev test: donatie werkt
- [ ] Admin test: inloggen werkt
- [ ] Build succesvol (0 errors)
- [ ] Vercel deployment klaar

✅ **Alle items afgevinkt? → PROD READY!**

---

## **Next Steps**

1. **M-Pesa integratie** → Daraja API setup
2. **Email service** → Resend templates
3. **Admin auth** → Secure dashboard access
4. **Monitoring** → Uptime, analytics
