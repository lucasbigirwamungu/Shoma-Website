import { NextResponse } from 'next/server';
import { getMollieClient } from '@/lib/mollie';
import { checkoutSchema } from '@/lib/validations';
import { createServerClient } from '@/lib/supabase';
import { SequenceType } from '@mollie/api-client';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = checkoutSchema.safeParse(rawBody);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validatiefout in de betaalgegevens', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { amount, frequency, donorName, donorEmail, newsletterOptIn, selectedProjectId } =
      validation.data;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    // ─── Mollie betaling aanmaken ──────────────────────────────────────────────
    const mollie = getMollieClient();

    const payment = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value: amount.toFixed(2),
      },
      description: `Stichting Shoma – ${
        frequency === 'monthly' ? 'Maandelijkse bijdrage' : 'Eenmalige donatie'
      } – ${donorName}`,
      redirectUrl: `${siteUrl}/doneren/bedankt`,
      webhookUrl: `${siteUrl}/api/donate/webhook`,
      metadata: {
        donorName,
        donorEmail,
        frequency,
        projectId: selectedProjectId ?? 'general_fund',
      },
      // NOTITIE VOOR ONTWIKKELAAR:
      // Voor echte maandelijkse SEPA Direct Debit: verander naar SequenceType.first
      // en implementeer de recurring-mandate flow via Mollie subscriptions.
      // De metadata `frequency: 'monthly'` garandeert dat dit later eenvoudig
      // uitgebreid kan worden zonder datamigratie.
      sequenceType: SequenceType.oneoff,
    });

    // Mollie Payment object: checkout URL zit in _links
    const checkoutUrl =
      (payment as unknown as { _links?: { checkout?: { href: string } } })
        ._links?.checkout?.href;

    if (!checkoutUrl) {
      throw new Error('Mollie gaf geen checkout URL terug');
    }

    const paymentId =
      (payment as unknown as { id?: string }).id ?? '';

    // ─── Sla de pending transactie op in Supabase ──────────────────────────────
    try {
      const db = createServerClient();

      // 1. Upsert donor (e-mailadres is UNIQUE)
      const { data: donor } = await db
        .from('donors')
        .upsert(
          {
            first_name: donorName.split(' ')[0] ?? donorName,
            last_name: donorName.split(' ').slice(1).join(' ') || '-',
            email: donorEmail,
            newsletter_opt_in: newsletterOptIn,
          },
          { onConflict: 'email', ignoreDuplicates: false }
        )
        .select('id')
        .single();

      // 2. Maak donatie-record aan
      if (donor && paymentId) {
        await db.from('donations').insert({
          donor_id: donor.id,
          project_id: selectedProjectId ?? null,
          mollie_payment_id: paymentId,
          amount: amount,
          frequency: frequency,
          status: 'pending',
          donor_name_snapshot: donorName,
        });
      }
    } catch (dbError) {
      // DB-fouten mogen de checkout NOOIT blokkeren
      console.error('[Shoma] Supabase write mislukt (niet-blokkerend):', dbError);
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error('[Shoma] Mollie checkout fout:', error);
    return NextResponse.json(
      { error: 'Fout bij het aanmaken van de betaalsessie. Probeer het opnieuw.' },
      { status: 500 }
    );
  }
}
