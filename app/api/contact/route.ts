import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { sendContactNotification } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // Honeypot: bots vullen dit verborgen veld in, echte bezoekers niet
    if (typeof rawBody?.website === 'string' && rawBody.website.length > 0) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const validation = contactSchema.safeParse(rawBody);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }

      return NextResponse.json(
        { error: 'Validatiefout', fieldErrors },
        { status: 400 }
      );
    }

    // ─── Stuur het bericht door naar info@shoma.nl ────────────────────────────
    await sendContactNotification(validation.data);

    return NextResponse.json(
      { success: true, message: 'Bericht succesvol ontvangen' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Shoma Contact] Onverwachte fout:', error);
    return NextResponse.json(
      { error: 'Er is een serverfout opgetreden. Probeer het opnieuw of stuur een e-mail naar info@shoma.nl.' },
      { status: 500 }
    );
  }
}
