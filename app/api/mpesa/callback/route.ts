import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * M-Pesa Callback Handler
 * Receives STK Push and B2C payment callbacks from Safaricom
 */

interface MpesaCallback {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as MpesaCallback;

    const { stkCallback } = body.Body;
    const { ResultCode, CallbackMetadata, CheckoutRequestID } = stkCallback;

    // Initialize Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (ResultCode === 0) {
      // Success
      const metadata = CallbackMetadata?.Item || [];

      const amount = metadata.find((item) => item.Name === 'Amount')?.Value || 0;
      const phoneNumber = metadata.find((item) => item.Name === 'PhoneNumber')?.Value || '';
      const mpesaCode = metadata.find((item) => item.Name === 'MpesaReceiptNumber')?.Value || '';
      const transactionDate = metadata.find((item) => item.Name === 'TransactionDate')?.Value || '';

      // Log successful payment
      await supabase.from('mpesa_payments').insert({
        checkout_request_id: CheckoutRequestID,
        amount: Number(amount),
        phone_number: String(phoneNumber),
        mpesa_receipt_code: String(mpesaCode),
        transaction_date: String(transactionDate),
        status: 'completed',
        created_at: new Date().toISOString(),
      });

      console.log(`M-Pesa Payment: ${mpesaCode} - ${amount} TZS from ${phoneNumber}`);

      return NextResponse.json({ success: true });
    } else {
      // Payment failed or cancelled
      await supabase.from('mpesa_payments').insert({
        checkout_request_id: CheckoutRequestID,
        status: 'failed',
        error_message: stkCallback.ResultDesc,
        created_at: new Date().toISOString(),
      });

      console.log(`M-Pesa Payment Failed: ${stkCallback.ResultDesc}`);

      return NextResponse.json({ success: false, error: stkCallback.ResultDesc });
    }
  } catch (error) {
    console.error('M-Pesa callback error:', error);

    return NextResponse.json(
      { error: 'Callback processing failed' },
      { status: 500 }
    );
  }
}
