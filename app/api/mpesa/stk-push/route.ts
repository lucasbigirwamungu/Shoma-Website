import { NextRequest, NextResponse } from 'next/server';
import { mpesa } from '@/lib/mpesa-service';

/**
 * M-Pesa STK Push Initiator
 * Sends STK prompt to customer's phone for payment
 */

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, accountReference, transactionDescription } = await request.json();

    // Validate inputs
    if (!phoneNumber || !amount || !accountReference) {
      return NextResponse.json(
        { error: 'Missing required fields: phoneNumber, amount, accountReference' },
        { status: 400 }
      );
    }

    if (amount < 1 || amount > 150000) {
      return NextResponse.json(
        { error: 'Amount must be between 1 and 150,000 TZS' },
        { status: 400 }
      );
    }

    // Initiate STK Push
    const response = await mpesa.stkPush({
      phoneNumber,
      amount: Math.round(amount),
      accountReference,
      transactionDescription: transactionDescription || 'Shoma Donation',
    });

    if (response.ResponseCode === '0') {
      return NextResponse.json({
        success: true,
        checkoutRequestId: response.CheckoutRequestID,
        merchantRequestId: response.MerchantRequestID,
        message: 'STK prompt sent to customer phone',
      });
    } else {
      return NextResponse.json(
        {
          error: response.ResponseDescription,
          code: response.ResponseCode,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('STK Push error:', error);

    return NextResponse.json(
      {
        error: 'STK Push failed',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
