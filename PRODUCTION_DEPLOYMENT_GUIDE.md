# Production Deployment Guide - Stichting Shoma

## 🚀 Complete Production Setup

This guide covers deploying to production on Vercel with all security, monitoring, and backup configurations.

---

## **PHASE 1: Pre-Deployment Checklist**

### 1.1 Code Review

```bash
# Ensure no secrets in git
git log -p | grep -i "password\|secret\|api_key" && echo "⚠️ SECRETS FOUND!" || echo "✅ Clean"

# Check for console.log statements (remove from production code)
grep -r "console.log\|console.error" app lib components --include="*.ts" --include="*.tsx" | grep -v "node_modules"
```

### 1.2 Build Verification

```bash
# Local production build
npm run build

# Should complete with 0 errors
# Check: ✓ Compiled successfully
```

### 1.3 Security Headers

```bash
# next.config.ts add:
headers: async () => [
  {
    source: '/:path*',
    headers: [
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block'
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
      }
    ]
  }
]
```

---

## **PHASE 2: GitHub Setup**

### 2.1 Create Private Repository

```bash
cd shoma-platform

# Initialize if not already
git init
git add .
git commit -m "Initial commit: Shoma platform with all features"

# Add remote (replace with your repo)
git remote add origin https://github.com/lucasbigirwamungu/shoma-platform.git

# Create .gitignore (check existing one)
# Should exclude:
# .env.local
# .env.*.local
# node_modules
# .next
# dist
# *.log
# .DS_Store

git push -u origin main
```

### 2.2 Configure Repository Settings

```
GitHub → Settings → Branch protection rules

Add rule for 'main':
✅ Require a pull request before merging
✅ Require status checks to pass before merging
✅ Require branches to be up to date before merging
✅ Dismiss stale pull request approvals when new commits are pushed
✅ Require code review from 1+ before merging (optional for solo projects)
```

---

## **PHASE 3: Vercel Deployment**

### 3.1 Connect to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel

# Follow prompts:
# ✓ Link existing project or create new?
# ✓ Set production domain
# ✓ Framework: Next.js (auto-detected)
```

### 3.2 Environment Variables in Vercel

```
Vercel Dashboard → Project → Settings → Environment Variables

Add all from .env.local:

# SITE
NEXT_PUBLIC_SITE_URL=https://shoma.nl
NEXT_PUBLIC_APP_URL=https://shoma.nl

# Mollie (if using EU donation)
MOLLIE_API_KEY=live_xxxxxx (NOT test key!)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... (⚠️ Sensitive!)

# Resend Email
RESEND_API_KEY=re_xxxx
RESEND_FROM_EMAIL=noreply@shoma.nl

# M-Pesa
MPESA_ENVIRONMENT=production
MPESA_CONSUMER_KEY=xxx
MPESA_CONSUMER_SECRET=xxx
MPESA_SHORT_CODE=xxx
MPESA_PASSKEY=xxx
MPESA_CALLBACK_URL=https://shoma.nl/api/mpesa/callback

# Image Storage
NEXT_PUBLIC_IMAGE_STORAGE=supabase

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

# Security
JWT_SECRET=[strong-random-string-min-32-chars]
```

### 3.3 Verify Deployment

```bash
# After Vercel builds
vercel env pull  # Pull production vars
npm run build    # Verify builds with prod env
npm run start    # Test production build locally
```

---

## **PHASE 4: Domain & DNS**

### 4.1 Domain Setup

```
Vercel Dashboard → Project → Domains

Add domain:
- shoma.nl
- www.shoma.nl (redirect to main)

Vercel provides nameservers or CNAME records
```

### 4.2 Update DNS Provider

```
If using current registrar, add these records:

Type: A
Name: @
Value: 76.76.19.165 (Vercel's IP)

Type: A
Name: www
Value: 76.76.19.165

Or use Vercel's nameservers:
NS records → Update at registrar
```

### 4.3 SSL Certificate

```
Vercel auto-provisions Let's Encrypt certificate.
Check: Dashboard → Security → SSL/TLS

Should show:
✅ Certificate valid
✅ Auto-renewal enabled
```

---

## **PHASE 5: Database Backup Strategy**

### 5.1 Supabase Automated Backups

```
Supabase Dashboard → Settings → Backups

Free tier:
- Daily backups (7-day retention)
- Point-in-time recovery (24 hours)

Pro tier (recommended):
- On-demand backups
- 30-day retention
```

### 5.2 Manual Backup Script

```bash
# Create backup directory
mkdir -p backups

# Export database
pg_dump \
  postgresql://postgres:[password]@[project].supabase.co:5432/postgres \
  > backups/shoma-backup-$(date +%Y%m%d).sql

# Compress
gzip backups/shoma-backup-$(date +%Y%m%d).sql

# Upload to secure storage (Google Drive, OneDrive, AWS S3)
```

### 5.3 Automated Backup Schedule

```bash
# Add to crontab for weekly backups
# Run: crontab -e

# Weekly backup every Sunday at 2 AM
0 2 * * 0 /usr/local/bin/backup-database.sh
```

---

## **PHASE 6: Monitoring & Analytics**

### 6.1 Sentry Error Tracking

```bash
# Install
npm install @sentry/nextjs @sentry/tracing

# Configure: sentry.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 6.2 Vercel Analytics

```
Vercel Dashboard → Analytics → Enable

Tracks:
- Page load time
- Core Web Vitals
- Request/Response times
- Error rates
```

### 6.3 Uptime Monitoring

```bash
# Use Pingdom, UptimeRobot, or Healthchecks.io

# Healthchecks example:
POST https://hc-ping.com/[uuid]/

Every 5 minutes, your app POSTs a heartbeat.
If missed → sends alert.
```

---

## **PHASE 7: Email Configuration**

### 7.1 Resend Email Service

```
Resend Dashboard → Domains

Add sending domain:
shoma.nl

Verify ownership (TXT record):
_resend_verify_[code]=verification_value
```

### 7.2 SPF, DKIM, DMARC Records

```
DNS Provider, add:

SPF:
v=spf1 include:sendingservice.resend.com ~all

DKIM:
(Auto-configured by Resend)

DMARC:
v=DMARC1; p=quarantine; rua=mailto:admin@shoma.nl
```

### 7.3 Test Email Delivery

```bash
# Send test email via API
curl -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "noreply@shoma.nl",
    "to": "admin@shoma.nl",
    "subject": "Test Email",
    "html": "<p>Testing email delivery</p>"
  }'

# Check spam folder!
```

---

## **PHASE 8: M-Pesa Production Approval**

### 8.1 Safaricom Daraja API Transition

```
1. Sandbox testing complete ✓
2. Request production credentials from Safaricom

   Contact: Safaricom M-Pesa Developer Program
   - Legal name: Stichting Shoma
   - RSIN: 814390249
   - Bank account for M-Pesa
   - Use case: Educational donations

3. Wait 5-7 business days for approval

4. Receive production credentials:
   - Consumer Key
   - Consumer Secret
   - Production Shortcode
   - Initiator password (for B2C)

5. Update .env variables in Vercel:
   MPESA_ENVIRONMENT=production
   MPESA_CONSUMER_KEY=[prod]
   MPESA_CONSUMER_SECRET=[prod]
```

### 8.2 Register Callback URL

```
Daraja Dashboard → My Applications → Settings

Callback URL: https://shoma.nl/api/mpesa/callback

Test:
- Send 1 TZS test payment
- Verify callback received
- Check database entry created
```

---

## **PHASE 9: Monitoring Checklist**

### 9.1 Daily Checks

```bash
# Check site status
curl -I https://shoma.nl

# Check API endpoints
curl https://shoma.nl/api/health

# Monitor error rate
# Check Sentry dashboard for exceptions

# Email delivery
# Check Resend dashboard for bounces/failures
```

### 9.2 Weekly Checks

```
□ Review Vercel analytics
□ Check database size/growth
□ Test admin dashboard login
□ Verify M-Pesa transactions
□ Review Supabase logs
□ Check backup completion
```

### 9.3 Monthly Checks

```
□ Audit user access logs
□ Review security headers
□ Check certificate expiry
□ Update dependencies: npm update
□ Review error logs for patterns
□ Test disaster recovery (restore backup)
```

---

## **PHASE 10: Ongoing Maintenance**

### 10.1 Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update minor/patch versions (safe)
npm update

# Review major updates manually
npm install package@latest

# Run tests after updates
npm run build && npm run test
```

### 10.2 Security Scanning

```bash
# Check for vulnerabilities
npm audit

# Fix automatically where possible
npm audit fix

# Manual review of breaking changes
npm audit fix --force
```

### 10.3 Performance Optimization

```bash
# Analyze bundle size
npm run build
npm ls

# Monitor Core Web Vitals
Vercel Analytics → Web Performance

# Image optimization
# Already using Next.js Image component ✓
```

---

## **Disaster Recovery Plan**

### 11.1 If website is down

```bash
1. Check Vercel status: status.vercel.com
2. Check database: Supabase dashboard → Status
3. Check domain DNS: nslookup shoma.nl
4. Check SSL certificate expiry
5. Review Vercel logs: Dashboard → Deployments → Logs
6. Rollback to previous deployment if needed
```

### 11.2 If database is corrupted

```bash
1. Stop all write operations (pause webhooks)
2. Create database snapshot
3. Restore from last known-good backup
4. Verify data integrity
5. Resume operations
```

### 11.3 If API is breached

```bash
1. Rotate all API keys immediately
2. Review access logs for unauthorized access
3. Check Supabase → Auth → Sessions for suspicious users
4. Update passwords, especially admin account
5. Review RLS policies for gaps
```

---

## **Success Criteria**

✅ Site loads in < 2 seconds (Vercel Analytics)
✅ 99.9% uptime (Healthchecks.io)
✅ All emails delivered (Resend dashboard)
✅ M-Pesa payments processing (Safaricom dashboard)
✅ Database backups running daily
✅ Errors monitored in Sentry < 5/day
✅ No security warnings (SSL Labs A+)

---

## **Contact & Support**

For production issues:
- Vercel support: https://vercel.com/support
- Supabase status: https://status.supabase.com
- Resend support: https://resend.com/support
- Safaricom Daraja: developer.safaricom.co.ke/support

---

**Last Updated:** 2024-06-10
**Maintained by:** Stichting Shoma Technical Team
