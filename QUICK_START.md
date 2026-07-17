# ⚡ QUICK START - Stichting Shoma Platform

## 🚀 Today (Right Now)

```bash
# 1. Development
npm install
npm run dev
# Open: http://localhost:3000

# 2. Production build test
npm run build
# ✅ Should say: "✓ Compiled successfully"
```

---

## 📋 This Week (Setup Phase)

### Step 1: Supabase (30 min)
1. Go to https://supabase.com → Create project
2. Get API credentials (URL + ANON_KEY + SERVICE_ROLE_KEY)
3. Copy to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[key]
   SUPABASE_SERVICE_ROLE_KEY=[key]
   ```
4. Run migration: Copy `supabase/migrations/003_compenseer_en_leer.sql` to Supabase SQL Editor
5. Verify: Dashboard → Table Editor (see 7 tables)

**What you get:** Database + Auth + File storage

---

### Step 2: Resend Email (10 min)
1. Go to https://resend.com → Sign up
2. Verify sending domain (shoma.nl)
3. Get API key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxx
   RESEND_FROM_EMAIL=noreply@shoma.nl
   ```

**What you get:** Email service for confirmations + alerts

---

### Step 3: M-Pesa Sandbox (30 min)
1. Go to https://developer.safaricom.co.ke → Create app
2. Get credentials (Consumer Key, Secret, Shortcode, Passkey)
3. Add to `.env.local`:
   ```
   MPESA_ENVIRONMENT=sandbox
   MPESA_CONSUMER_KEY=xxxx
   MPESA_CONSUMER_SECRET=xxxx
   MPESA_SHORT_CODE=xxxx
   MPESA_PASSKEY=xxxx
   MPESA_CALLBACK_URL=http://localhost:3000/api/mpesa/callback
   ```
4. Test STK Push (see MPESA_SETUP_COMPLETE.md for curl command)

**What you get:** Payment processing (sandbox testing)

---

### Step 4: GitHub (5 min)
```bash
git add .
git commit -m "Initial: Full Shoma platform"
git remote add origin https://github.com/YOUR/REPO.git
git push -u origin main
```

---

## 🌐 Next Week (Deployment Phase)

### Step 1: Vercel (10 min)
1. Go to https://vercel.com
2. Import project from GitHub
3. Add environment variables (from `.env.local`)
4. Deploy!

```bash
# Or use CLI:
npm install -g vercel
vercel --prod
```

### Step 2: Domain (5 min)
1. Vercel Dashboard → Domains
2. Add: `shoma.nl` and `www.shoma.nl`
3. Update DNS at registrar with Vercel's nameservers

**✅ Site now live at https://shoma.nl**

---

## 📚 Important Files

| File | Purpose |
|------|---------|
| `FINAL_SUMMARY.md` | Everything accomplished |
| `COMPLETE_SETUP_REFERENCE.md` | Full technical reference |
| `SUPABASE_SETUP_COMPLETE.md` | Supabase step-by-step |
| `MPESA_SETUP_COMPLETE.md` | M-Pesa integration guide |
| `PRODUCTION_DEPLOYMENT_GUIDE.md` | Vercel + monitoring |
| `.env.local.example` | Environment template |

---

## 🔑 Key Credentials You'll Need

```
Supabase:
  - Project URL
  - ANON_KEY
  - SERVICE_ROLE_KEY

Resend:
  - API Key
  - Domain verification

M-Pesa Sandbox:
  - Consumer Key
  - Consumer Secret
  - Shortcode
  - Passkey

Vercel:
  - GitHub connected
  - Environment variables set
```

---

## 🆘 Troubleshooting

**Build fails?**
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**Database connection error?**
- Check .env.local has correct Supabase credentials
- Verify project is running (Supabase Dashboard)

**M-Pesa test fails?**
- Verify credentials in .env.local
- Check ngrok tunnel active (if using local callback)
- See MPESA_SETUP_COMPLETE.md for detailed troubleshooting

**Deploy fails?**
- Check Vercel dashboard for logs
- Ensure all environment variables are set
- Run `npm run build` locally first

---

## 📞 Contact

- Email: info@shoma.nl
- Docs: See `/` directory (8 guides)
- Support: Check COMPLETE_SETUP_REFERENCE.md

---

## ✨ What's Ready

- ✅ Website (23 pages)
- ✅ Donation system (KEMPS + Regular)
- ✅ CO₂ compensation platform
- ✅ Admin dashboard
- ✅ Image upload system
- ✅ Email service
- ✅ Payment processing (Mollie + M-Pesa)
- ✅ Newsletter (23 items)
- ✅ Full documentation

---

**Status: PRODUCTION-READY** 🚀

Follow steps above → Deploy → Go live!
