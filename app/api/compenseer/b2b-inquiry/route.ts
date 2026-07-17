import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Import Resend only at runtime
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();

    const {
      company_name,
      contact_name,
      email,
      phone,
      team_size,
      co2_scope,
      message,
    } = body;

    // Validation
    if (!company_name || !contact_name || !email || !team_size) {
      return NextResponse.json(
        { error: 'Vul alstublieft alle verplichte velden in.' },
        { status: 400 }
      );
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Ongeldig e-mailadres.' },
        { status: 400 }
      );
    }

    // Send email to Shoma
    const emailResult = await resend.emails.send({
      from: 'Compenseer & Leer <noreply@shoma.nl>',
      to: process.env.PARTNER_EMAIL || 'partners@shoma.nl',
      subject: `Nieuw B2B-verzoek: ${company_name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a6659;">Nieuw Compenseer & Leer B2B-verzoek</h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Bedrijf:</strong> ${company_name}</p>
            <p><strong>Contactperson:</strong> ${contact_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Telefoon:</strong> ${phone || '(niet opgegeven)'}</p>
            <p><strong>Team-grootte:</strong> ${team_size} medewerkers</p>
            <p><strong>CO₂-scope voorkeur:</strong> ${co2_scope || '(niet opgegeven)'}</p>
          </div>

          ${message ? `
            <div style="background-color: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; border-radius: 4px;">
              <strong>Opmerkingen:</strong><br/>
              ${message.replace(/\n/g, '<br/>')}
            </div>
          ` : ''}

          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Dit verzoek is via de Shoma-website verstuurd via /compenseer-bedrijven.
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error('Email send error:', emailResult.error);
      return NextResponse.json(
        { error: 'E-mail kon niet worden verstuurd. Probeer het later opnieuw.' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Stichting Shoma <noreply@shoma.nl>',
      to: email,
      subject: 'Dank u voor uw interesse in Compenseer & Leer voor bedrijven',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a6659;">Dank u, ${contact_name}!</h2>

          <p>We hebben uw verzoek ontvangen en nemen binnenkort contact met u op om alles te bespreken.</p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ontvangen gegevens:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Bedrijf: ${company_name}</li>
              <li>Team-grootte: ${team_size}</li>
              <li>CO₂-scope: ${co2_scope || 'nog te bepalen'}</li>
            </ul>
          </div>

          <p>Heeft u vragen? Stuur dan een e-mail naar <a href="mailto:partners@shoma.nl">partners@shoma.nl</a></p>

          <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
            Stichting Shoma | Onderwijs in Tanzania<br/>
            <a href="https://www.shoma.nl">www.shoma.nl</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Uw aanvraag is succesvol verstuurd.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('B2B inquiry error:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden. Probeer het later opnieuw.' },
      { status: 500 }
    );
  }
}
