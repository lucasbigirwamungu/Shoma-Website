# Compenseer & Leer Production Setup

Volg deze stappen om de volledige production setup af te ronden.

---

## Fase I: Supabase + Environment Variables

### 1.1 Supabase Migration uitvoeren

1. Go to [supabase.com](https://supabase.com) en open je project
2. Navigate to **SQL Editor**
3. Copy-paste de contents van `/supabase/migrations/003_compenseer_en_leer.sql`
4. Run the query
5. Verify all tables exist:
   - `compenseer_tree_species` (5 species seeded)
   - `compenseer_donations`
   - `compenseer_trees`
   - `compenseer_tree_logs`
   - `compenseer_mpesa_payments`
   - `compenseer_certificates`
   - `compenseer_campaign_data`

### 1.2 RLS (Row Level Security) Policies

For development: disable RLS on all tables (later: add proper policies)

```sql
ALTER TABLE compenseer_tree_species DISABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_donations DISABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_trees DISABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_tree_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_mpesa_payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_certificates DISABLE ROW LEVEL SECURITY;
ALTER TABLE compenseer_campaign_data DISABLE ROW LEVEL SECURITY;
```

### 1.3 Update `.env.local`

Copy your Supabase credentials:

```env
# Supabase (get from Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# M-Pesa (mock for now)
NEXT_PUBLIC_MPESA_ENVIRONMENT=sandbox
MPESA_CONSUMER_KEY=your_daraja_key_here
MPESA_CONSUMER_SECRET=your_daraja_secret_here
MPESA_SHORTCODE=your_business_code

# Email (Resend)
RESEND_API_KEY=re_your_key_here

# Mollie (if using)
MOLLIE_API_KEY=test_your_key_here

# Admin
ADMIN_SECRET_KEY=super_secret_key_for_admin_access
```

### 1.4 Verify connection

Run test:
```bash
npm run build
npm run dev
# Visit http://localhost:3000/compenseer-en-leer
# Check browser console for Supabase connection logs
```

---

## Fase II: PDF Generator

### 2.1 Install Puppeteer

```bash
npm install puppeteer --save
npm install -D @types/puppeteer
```

### 2.2 Create PDF Route

Create `/app/api/compenseer/certificate/[id]/pdf/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { supabase } from '@/lib/compenseer/supabase-client';
import { generateCertificateHTML, generateBusinessCertificateHTML } from '@/lib/compenseer/certificate-generator';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: certificateId } = await params;

  try {
    // Fetch certificate from DB
    const { data: certificate, error } = await supabase
      .from('compenseer_certificates')
      .select('*')
      .eq('id', certificateId)
      .single();

    if (error || !certificate) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Get associated donation for species data
    const { data: donation } = await supabase
      .from('compenseer_donations')
      .select('*')
      .eq('id', certificate.donation_id)
      .single();

    const mockSpecies = [
      {
        id: '1',
        name: 'Mango',
        scientificName: 'Mangifera indica',
        co2KgPerYear: 21.5,
        lifecycleYears: 40,
        description: 'High-value fruit tree',
        region: 'Tanzania',
      },
    ];

    // Generate HTML
    const html = certificate.certificate_type === 'business'
      ? generateBusinessCertificateHTML(certificate, certificate.donor_name, mockSpecies)
      : generateCertificateHTML(certificate, mockSpecies);

    // Convert to PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle2' });
    const pdf = await page.pdf({ format: 'A4', margin: { top: 0, bottom: 0, left: 0, right: 0 } });

    await browser.close();

    // Update certificate URL in DB
    await supabase
      .from('compenseer_certificates')
      .update({ pdf_url: `/api/compenseer/certificate/${certificateId}/pdf` })
      .eq('id', certificateId);

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="certificate_${certificateId}.pdf"`,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
```

### 2.3 Update donate API route

In `/app/api/compenseer/donate/route.ts`, change certificate generation:

```typescript
// Update certificate record
const certificate = await createCertificate({
  donationId: donation.id,
  certificateType: donationType || 'individual',
  pdfUrl: `/api/compenseer/certificate/${donation.id}/pdf`, // This will be generated on demand
  donorName,
  donorEmail,
  treesCount: treesAllocated,
  co2OffsetKg: co2Kg,
});
```

---

## Fase III: Email Service

### 3.1 Setup Resend

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to `.env.local`: `RESEND_API_KEY=re_...`

### 3.2 Create Email Template

Create `/lib/compenseer/email-templates.ts`:

```typescript
export const donationConfirmationEmail = (donorName: string, treesCount: number, certificateUrl: string) => ({
  subject: `Je CO₂ compensatie is actief! 🌳 ${treesCount} bomen geplant`,
  html: `
    <h1>Bedankt ${donorName}!</h1>
    <p>Je donatie is verwerkt. ${treesCount} bomen worden nu geplant in Rubya, Tanzania.</p>
    
    <h2>Download je certificaat</h2>
    <a href="${certificateUrl}" style="background: #ef9403; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none;">
      📄 Certificaat downloaden
    </a>
    
    <h3>Volgende stappen</h3>
    <ul>
      <li>Groei-updates ontvang je maandelijks via email</li>
      <li>Deel je certificaat op social media!</li>
      <li>Contact: info@shoma.nl voor vragen</li>
    </ul>
    
    <p>🌍 Samen bouwen we een betere toekomst.</p>
    <p>Stichting Shoma</p>
  `,
});

export const businessCertificateEmail = (companyName: string, treesCount: number, certificateUrl: string) => ({
  subject: `MVO Certificaat klaar - ${companyName} 🏢`,
  html: `
    <h1>MVO Certificaat voltooid</h1>
    <p>Beste ${companyName},</p>
    
    <p>Uw duurzaamheidscommitment is geregistreerd: <strong>${treesCount} bomen</strong> gepland in Tanzania.</p>
    
    <h2>Certificaat</h2>
    <a href="${certificateUrl}" style="background: #6e4d1c; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none;">
      📜 Download MVO-certificaat
    </a>
    
    <p>Perfect voor jaarverslagen en stakeholder communicatie.</p>
    <p>Stichting Shoma | ANBI erkend</p>
  `,
});
```

### 3.3 Create Email Service

Create `/lib/compenseer/email-service.ts`:

```typescript
import { Resend } from 'resend';
import { donationConfirmationEmail, businessCertificateEmail } from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDonationEmail(
  donorEmail: string,
  donorName: string,
  treesCount: number,
  certificateUrl: string,
  donationType: 'individual' | 'business',
  companyName?: string
) {
  const emailData = donationType === 'business'
    ? businessCertificateEmail(companyName || donorName, treesCount, certificateUrl)
    : donationConfirmationEmail(donorName, treesCount, certificateUrl);

  try {
    await resend.emails.send({
      from: 'Stichting Shoma <info@shoma.nl>',
      to: donorEmail,
      ...emailData,
    });

    console.log(`Email sent to ${donorEmail}`);
  } catch (error) {
    console.error('Email error:', error);
    // Fallback: log for manual sending
  }
}
```

### 3.4 Update donation API

In `/app/api/compenseer/donate/route.ts`:

```typescript
import { sendDonationEmail } from '@/lib/compenseer/email-service';

// After creating certificate:
await sendDonationEmail(
  donorEmail,
  donorName,
  treesAllocated,
  `/api/compenseer/certificate/${donation.id}/pdf`,
  donationType,
  body.businessName // for business donations
);
```

---

## Fase IV: User Authentication

### 4.1 Setup Supabase Auth

1. In Supabase dashboard: **Authentication > Providers**
2. Enable: Email, Google, Apple (optional)
3. Configure email templates

### 4.2 Create Auth Context

Create `/lib/auth-context.tsx`:

```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './compenseer/supabase-client';

type AuthContext = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user || null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

async function signUp(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
```

### 4.3 Replace mock donor_id

In `/lib/compenseer/supabase-client.ts`:

```typescript
import { useAuth } from '../auth-context'; // In client components

// Replace:
// const donorId = `donor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
// With:
// const { user } = useAuth();
// const donorId = user?.id || 'anonymous';
```

---

## Checklist

- [ ] Supabase migrations executed
- [ ] RLS disabled (for dev)
- [ ] Environment variables set
- [ ] Supabase connection verified
- [ ] Puppeteer installed & PDF route working
- [ ] Resend API key configured
- [ ] Email service sending
- [ ] Supabase Auth enabled
- [ ] Auth context integrated

---

## Next Steps

1. **Deploy to Vercel**
   ```bash
   git add .
   git commit -m "Add production setup"
   git push
   # Connect to Vercel from GitHub
   ```

2. **Monitor**
   - Supabase dashboard: check donations/trees
   - Email logs: verify deliverability
   - Vercel analytics: track usage

3. **M-Pesa Integration**
   - Get Safaricom Daraja credentials
   - Implement real payment flow
   - Test STK push

---

## Support

- Supabase docs: https://supabase.com/docs
- Resend docs: https://resend.com/docs
- Puppeteer docs: https://pptr.dev
