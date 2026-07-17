import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/compenseer/supabase-client';

/**
 * Mock M-Pesa payment processor
 * In production: integrate with Safaricom Daraja API
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donationId, amountEur, phoneNumber, paymentMethod } = body;

    if (!donationId || !amountEur) {
      return NextResponse.json(
        { error: 'Missing donation ID or amount' },
        { status: 400 }
      );
    }

    // Update donation status
    await supabase
      .from('compenseer_donations')
      .update({ status: 'completed' })
      .eq('id', donationId);

    // Mock M-Pesa transaction
    const mpesaRef = `SHOMA${Date.now()}`;
    const receiptNumber = `RCPT${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // For tree caretakers: create M-Pesa payment records
    const { data: trees } = await supabase
      .from('compenseer_trees')
      .select('id, m_pesa_phone')
      .eq('donation_id', donationId)
      .limit(5);

    if (trees && trees.length > 0) {
      // Split payment equally among caretakers
      const amountPerCaretaker = Math.floor((amountEur * 0.5 * 130) / trees.length); // 50% to trees, * 130 KSH/EUR

      for (const tree of trees) {
        await supabase
          .from('compenseer_mpesa_payments')
          .insert({
            tree_id: tree.id,
            phone_number: tree.m_pesa_phone,
            amount_ksh: amountPerCaretaker,
            status: 'successful',
            m_pesa_ref: mpesaRef,
            m_pesa_receipt_number: receiptNumber,
            reason: 'tree_growth_validation',
          });
      }
    }

    // Send mock success response
    return NextResponse.json(
      {
        success: true,
        paymentId: mpesaRef,
        receiptNumber,
        amount: amountEur,
        currency: 'EUR',
        status: 'completed',
        message: 'Betaling succesvol verwerkt',
        caretakerPayments: trees?.length || 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

/**
 * M-Pesa STK Push (for real implementation)
 * POST /api/compenseer/payment/mpesa-stk
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, amount } = body;

    // In production: call Safaricom Daraja API
    // For now: mock callback after 5 seconds

    setTimeout(async () => {
      // Mock webhook callback
      console.log(`[M-Pesa Mock] Payment of ${amount} KSH from ${phoneNumber} would be processed`);
    }, 5000);

    return NextResponse.json(
      {
        success: true,
        message: 'STK push initiated (mock)',
        checkoutRequestId: `SHOMA_${Date.now()}`,
      },
      { status: 202 }
    );
  } catch (error) {
    console.error('STK error:', error);
    return NextResponse.json({ error: 'STK push failed' }, { status: 500 });
  }
}
