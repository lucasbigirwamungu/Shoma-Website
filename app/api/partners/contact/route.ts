import { NextResponse } from 'next/server';
import { b2bLeadSchema } from '@/lib/validations';
import { createServerClient } from '@/lib/supabase';
import { sendB2BLeadNotification } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = b2bLeadSchema.safeParse(rawBody);

    if (!validation.success) {
      // Formatteer veldfouten voor inline feedback in de form
      const formatted = validation.error.format();
      const fieldErrors: Record<string, string> = {};

      for (const [key, value] of Object.entries(formatted)) {
        if (key !== '_errors' && value && '_errors' in value) {
          const msgs = (value as { _errors: string[] })._errors;
          if (msgs.length > 0) fieldErrors[key] = msgs[0];
        }
      }

      return NextResponse.json(
        { error: 'Validatiefout', fieldErrors },
        { status: 400 }
      );
    }

    const lead = validation.data;

    // ─── Sla de lead op in Supabase ───────────────────────────────────────────
    try {
      const db = createServerClient();
      await db.from('b2b_leads').insert({
        company_name:       lead.companyName,
        contact_name:       lead.contactName,
        corporate_email:    lead.corporateEmail,
        phone_number:       lead.phoneNumber ?? null,
        mvo_interest_area:  lead.mvoInterestArea,
        project_preference: lead.projectPreference ?? null,
        message:            lead.message ?? null,
        is_followed_up:     false,
      });
    } catch (dbError) {
      console.error('[Shoma B2B] Supabase insert mislukt:', dbError);
      // Ga door met e-mail — DB-fout blokkeert niet
    }

    // ─── Stuur notificatie naar partners@shoma.nl ─────────────────────────────
    await sendB2BLeadNotification(lead);

    return NextResponse.json(
      { success: true, message: 'Aanvraag succesvol ontvangen' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Shoma B2B] Onverwachte fout:', error);
    return NextResponse.json(
      { error: 'Er is een serverfout opgetreden. Probeer het opnieuw of stuur een e-mail naar partners@shoma.nl.' },
      { status: 500 }
    );
  }
}
