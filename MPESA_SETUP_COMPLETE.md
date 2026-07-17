# M-Pesa Daraja API Setup - Stap voor Stap

## 📋 Overzicht

Volledige M-Pesa (Safaricom) integratie voor:
- STK Push (Customer enters PIN on phone)
- Payment confirmation callbacks
- Transaction status queries
- B2C payments (payouts to caretakers)

**Totale setup tijd:** ~30 minuten

---

## **STAP 1: Register M-Pesa Developer Account**

### 1.1 Ga naar Daraja Portal

```
https://developer.safaricom.co.ke/
```

### 1.2 Sign up / Log in

```
- Create account with email
- Verify email
- Complete profile
```

### 1.3 Get sandbox credentials

```
Dashboard → My Applications → "Create New App"

App name:     Shoma Platform
App type:     MPESA STK

You'll get:
✅ Consumer Key
✅ Consumer Secret
✅ Shortcode
✅ Passkey

⚠️ SAVE THESE IMMEDIATELY! (security)
```

---

## **STAP 2: Environment Variables Setup**

### 2.1 Add to .env.local

```bash
# M-Pesa Daraja API
MPESA_CONSUMER_KEY=[from sandbox]
MPESA_CONSUMER_SECRET=[from sandbox]
MPESA_SHORT_CODE=[from sandbox]
MPESA_PASSKEY=[from sandbox]

# Callbacks
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback
# Or for dev:
MPESA_CALLBACK_URL=https://yourtunnel.ngrok.io/api/mpesa/callback

# Security (for B2C payments)
MPESA_SECURITY_CREDENTIAL=[encrypted password - see below]

# App URL (for callback generation)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # dev
NEXT_PUBLIC_APP_URL=https://yourdomain.com # prod
```

### 2.2 Generate Security Credential

**For B2C payouts, you need encrypted security credential:**

```bash
# 1. Get initiator password from Safaricom
# 2. Encrypt using Safaricom's public key (provided in API docs)
# 3. Base64 encode result

# For development: Use ngrok for tunneling
# For production: Use actual domain
```

---

## **STAP 3: Test Sandbox Integration**

### 3.1 Start dev server

```bash
npm run dev
# http://localhost:3000
```

### 3.2 Create test payment

```bash
# Test STK Push
curl -X POST http://localhost:3000/api/mpesa/stk-push \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "255741123456",
    "amount": 1000,
    "accountReference": "DONATION-001",
    "transactionDescription": "Test donation"
  }'

# Response should be:
{
  "success": true,
  "checkoutRequestId": "...",
  "merchantRequestId": "...",
  "message": "STK prompt sent to customer phone"
}
```

### 3.3 Test with Sandbox credentials

```
Sandbox provides test phone numbers:
- 254708374149 (success scenario)
- 254714234567 (various test scenarios)

PIN: 1234
```

---

## **STAP 4: Integrate into Donation Flow**

### 4.1 Update Compenseer & Leer donatie form

```typescript
// components/compenseer/IndividualDonationForm.tsx

const handleMpesaPayment = async () => {
  const response = await fetch('/api/mpesa/stk-push', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phoneNumber: formData.phoneNumber,
      amount: calculatedAmount,
      accountReference: `DONATION-${donationId}`,
      transactionDescription: `Shoma Donation - ${formData.type}`,
    }),
  });

  const data = await response.json();

  if (data.success) {
    // Show: "Check your phone for payment prompt"
    setStatus('awaiting-payment');
    
    // Poll for status
    pollTransactionStatus(data.checkoutRequestId);
  }
};
```

### 4.2 Create transaction status poller

```typescript
// lib/mpesa-poller.ts

export async function pollTransactionStatus(
  checkoutRequestId: string,
  maxAttempts = 30
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch('/api/mpesa/query-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkoutRequestId }),
    });

    const data = await response.json();

    if (data.status === 'completed') {
      console.log('✅ Payment completed!');
      return true;
    } else if (data.status === 'failed') {
      console.log('❌ Payment failed');
      return false;
    }

    // Wait 2 seconds before next attempt
    await new Promise((r) => setTimeout(r, 2000));
  }

  return false;
}
```

---

## **STAP 5: Setup Callbacks (Webhooks)**

### 5.1 Safaricom needs your callback URL

```
Daraja Dashboard → My Applications → Settings

Callback URL: https://yourdomain.com/api/mpesa/callback

M-Pesa will POST transaction results here
```

### 5.2 Public internet access (ngrok for dev)

```bash
# Install ngrok
brew install ngrok

# Expose localhost:3000 to internet
ngrok http 3000

# You get: https://abcd1234.ngrok.io
# Update .env.local:
MPESA_CALLBACK_URL=https://abcd1234.ngrok.io/api/mpesa/callback

# Update Safaricom dashboard with this URL
```

### 5.3 Log callback data

```
API route /api/mpesa/callback receives:
{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "...",
      "CheckoutRequestID": "...",
      "ResultCode": 0,  // 0 = success
      "ResultDesc": "The service request has been accepted successully",
      "CallbackMetadata": {
        "Item": [
          { "Name": "Amount", "Value": 1000 },
          { "Name": "MpesaReceiptNumber", "Value": "LHG31ZA5RV" },
          { "Name": "TransactionDate", "Value": "20240610123456" },
          { "Name": "PhoneNumber", "Value": "254741123456" }
        ]
      }
    }
  }
}

Callback route processes and logs to database.
```

---

## **STAP 6: Production Setup**

### 6.1 Switch from Sandbox to Production

```bash
# Daraja Dashboard → Credentials → Production

# Update .env.local
MPESA_ENVIRONMENT=production
MPESA_CONSUMER_KEY=[production key]
MPESA_CONSUMER_SECRET=[production secret]
```

### 6.2 Register Initiator Account

```
You need to register your business:

1. Contact Safaricom M-Pesa team
2. Provide:
   - Organization name: Stichting Shoma
   - Registration number: [RSIN: 814390249]
   - Bank account
   - Use case: Educational donations

3. They assign:
   - Shortcode
   - Initiator password
   - B2C credentials

Time: ~5-7 working days
```

### 6.3 Setup SSL/TLS (required)

```
Safaricom requires HTTPS only:

Vercel: Automatic ✅
Self-hosted: Use Let's Encrypt

MPESA_CALLBACK_URL must use HTTPS!
```

### 6.4 Verify production test

```bash
# Test with real M-Pesa account
# Send 1 TZS to your Shoma M-Pesa number

# Check:
1. Payment received in M-Pesa
2. Callback received and logged
3. Database updated
```

---

## **STAP 7: B2C Payments (Caretaker Payouts)**

### 7.1 Setup for payouts to local caretakers

```typescript
// Pay caretaker for tree maintenance
const payCaretaker = async (
  caretakerId: string,
  amount: number,
  phone: string
) => {
  try {
    const response = await mpesa.b2cPayment(phone, amount, 'Shoma Tree Care');
    
    // Log transaction
    await supabase.from('mpesa_payments').insert({
      recipient_id: caretakerId,
      amount,
      type: 'b2c',
      status: 'pending',
    });

    console.log(`Payout initiated: ${amount} TZS to ${phone}`);
  } catch (error) {
    console.error('B2C payout failed:', error);
  }
};
```

### 7.2 B2C requires:

```
- Security credential (encrypted password)
- Initiator account with sufficient balance
- Approved for B2C in production
```

---

## **STAP 8: Error Handling & Retries**

### 8.1 Common errors

```
ResultCode meanings:
0    = Success
1    = Insufficient funds
17   = Transaction timeout
24   = Invalid shortcode format
32   = Transaction cancelled by user
...

Implement retry logic for network errors.
```

### 8.2 Retry strategy

```typescript
export async function retryMpesaRequest(
  fn: () => Promise<any>,
  maxRetries = 3
): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = Math.pow(2, i) * 1000; // exponential backoff
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}
```

---

## **STAP 9: Security Best Practices**

### 9.1 Protect credentials

```bash
# ✅ DO:
- Store in .env.local (git-ignored)
- Use SUPABASE_SERVICE_ROLE_KEY for server-side only
- Rotate keys regularly

# ❌ DON'T:
- Commit .env.local to git
- Log full credentials
- Use consumer secret in frontend
- Skip HTTPS in production
```

### 9.2 Validate callbacks

```typescript
// In /api/mpesa/callback:
// 1. Verify signature header (X-Daraja-Signature)
// 2. Check ResultCode validity
// 3. Validate amount matches expected
// 4. Idempotency: don't process same callback twice
```

### 9.3 Rate limiting

```bash
# Prevent abuse:
- Max 5 requests per minute per IP
- Max amount: 150,000 TZS per transaction
- Require verified email before M-Pesa payment
```

---

## **STAP 10: Monitoring & Analytics**

### 10.1 Track transactions

```sql
-- Supabase: mpesa_payments table

SELECT
  COUNT(*) as total_transactions,
  SUM(amount) as total_amount,
  status,
  DATE(created_at) as date
FROM mpesa_payments
GROUP BY status, DATE(created_at)
ORDER BY date DESC;
```

### 10.2 Dashboard metrics

```typescript
// Admin dashboard shows:
- Total M-Pesa donations
- Success rate
- Average transaction size
- Failed transactions (with errors)
- Revenue trends
```

### 10.3 Alert on failures

```typescript
// If success rate < 95%, send email to admin
const successRate = successCount / totalCount;
if (successRate < 0.95) {
  await sendAlert('M-Pesa success rate low: ' + (successRate * 100).toFixed(2) + '%');
}
```

---

## **Troubleshooting**

### ❌ "Consumer key/secret invalid"

```
→ Copy exact credentials from Daraja
→ Check .env.local has no extra spaces
→ Restart dev server: npm run dev
```

### ❌ "Shortcode invalid"

```
→ Sandbox vs Production mismatch?
→ Check Daraja environment setting
```

### ❌ "Callback not received"

```
→ Callback URL must be HTTPS (production)
→ Firewall/security group allows Safaricom IPs?
→ Check ngrok tunnel still active (dev)
→ Safaricom dashboard has correct URL
```

### ❌ "Transaction timeout"

```
→ Normal: User didn't enter PIN in time
→ Show message: "Payment expired, try again"
→ Allow retry after 30 seconds
```

---

## **Checklist: Production Ready**

- [ ] Sandbox credentials tested & working
- [ ] STK Push → Phone → Payment complete
- [ ] Callbacks received and logged
- [ ] Database updated on success
- [ ] Error handling for all scenarios
- [ ] Production credentials received from Safaricom
- [ ] SSL/TLS certificate installed
- [ ] Callback URL registered in Safaricom
- [ ] Security credential encrypted (B2C)
- [ ] Rate limiting implemented
- [ ] Monitoring/alerting configured
- [ ] User-facing error messages clear
- [ ] Retry logic tested

✅ **All checks done? → LIVE!**

---

## **Next: Integration with Donations Page**

See: `/components/compenseer/IndividualDonationForm.tsx`

Update checkout flow:
1. Show M-Pesa as payment option
2. Call STK Push API
3. Poll transaction status
4. On success: save donation, send email
5. On failure: show error, allow retry

Done! 🎉
