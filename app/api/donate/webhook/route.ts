import { NextResponse } from 'next/server';
import { getMollieClient } from '@/lib/mollie';
import { createServerClient } from '@/lib/supabase';

// Mollie stuurt een POST naar deze URL zodra een betaalstatus verandert.
// De body bevat uitsluitend de payment `id` — de status moet ALTIJD opgehaald
// worden via de Mollie API om tampering te voorkomen.
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const paymentId = formData.get('id')?.toString();

    if (!paymentId) {
      return NextResponse.json({ error: 'Geen payment ID ontvangen' }, { status: 400 });
    }

    // ─── Haal de echte status op via Mollie ───────────────────────────────────
    const mollie = getMollieClient();
    const payment = await mollie.payments.get(paymentId);

    // Normaliseer Mollie status naar onze enum
    const statusMap: Record<string, string> = {
      paid:       'paid',
      failed:     'failed',
      canceled:   'failed',
      expired:    'expired',
      pending:    'pending',
      authorized: 'pending',
      open:       'pending',
    };

    const newStatus = statusMap[payment.status] ?? 'pending';

    // ─── Update de status in Supabase ─────────────────────────────────────────
    const db = createServerClient();

    const { error } = await db
      .from('donations')
      .update({ status: newStatus })
      .eq('mollie_payment_id', paymentId);

    if (error) {
      console.error('[Shoma Webhook] Supabase update mislukt:', error);
      // Stuur 200 terug aan Mollie zodat het niet blijft retrying —
      // we loggen de fout en kunnen later herstellen
    }

    // Als betaald: verhoog de current_funding van het bijbehorende project
    if (newStatus === 'paid' && payment.metadata?.projectId !== 'general_fund') {
      const { data: donation } = await db
        .from('donations')
        .select('project_id, amount')
        .eq('mollie_payment_id', paymentId)
        .single();

      if (donation?.project_id) {
        await db.rpc('increment_project_funding', {
          p_project_id: donation.project_id,
          p_amount: donation.amount,
        });
      }
    }

    // Mollie verwacht altijd een 200-status (anders retried het de webhook)
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('[Shoma Webhook] Onverwachte fout:', error);
    // Stuur toch 200 om oneindige Mollie-retries te voorkomen
    return new NextResponse(null, { status: 200 });
  }
}
