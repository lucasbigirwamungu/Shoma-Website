import type { B2BLeadInput, ContactInput } from '@/lib/validations';

// ─── B2B Lead Notificatie E-mail ──────────────────────────────────────────────
// Stuurt een gestructureerde notificatie naar partners@shoma.nl wanneer
// een nieuw B2B-intakeformulier wordt ingediend.

const MVO_LABELS: Record<string, string> = {
  education: 'Onderwijsprojecten (KEMPS)',
  water: 'Schoon Water & Sanitair (SDG 6)',
  energy: 'Duurzame Energie (Solar & Moestuin)',
  general: 'Algemene Bedrijfssponsoring / MVO-advies',
};

function buildEmailHtml(lead: B2BLeadInput): string {
  return `
    <!DOCTYPE html>
    <html lang="nl">
    <head>
      <meta charset="UTF-8" />
      <title>Nieuwe B2B Partner Aanvraag – Stichting Shoma</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; background: #F4F1DE; margin: 0; padding: 20px; }
        .card { background: #ffffff; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .header { background: #0D5C63; color: white; padding: 24px 32px; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
        .header p { margin: 4px 0 0; opacity: 0.8; font-size: 14px; }
        .body { padding: 32px; }
        .field { margin-bottom: 20px; }
        .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #0D5C63; margin-bottom: 4px; }
        .value { font-size: 16px; color: #2F3E46; font-weight: 500; }
        .message { background: #F4F1DE; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; color: #2F3E46; line-height: 1.6; }
        .footer { background: #F4F1DE; padding: 16px 32px; text-align: center; font-size: 12px; color: #8A9BA8; }
        .badge { display: inline-block; background: #E07A5F; color: white; border-radius: 20px; padding: 4px 12px; font-size: 12px; font-weight: 600; }
        .divider { border: none; border-top: 1px solid #EEE; margin: 24px 0; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>🤝 Nieuwe Partner Aanvraag</h1>
          <p>Via het B2B intakeformulier op shoma.nl</p>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">Bedrijf</div>
            <div class="value">${lead.companyName}</div>
          </div>
          <div class="field">
            <div class="label">Contactpersoon</div>
            <div class="value">${lead.contactName}</div>
          </div>
          <div class="field">
            <div class="label">E-mailadres</div>
            <div class="value"><a href="mailto:${lead.corporateEmail}" style="color: #0D5C63;">${lead.corporateEmail}</a></div>
          </div>
          ${lead.phoneNumber ? `
          <div class="field">
            <div class="label">Telefoonnummer</div>
            <div class="value">${lead.phoneNumber}</div>
          </div>` : ''}
          <hr class="divider" />
          <div class="field">
            <div class="label">MVO Interessegebied</div>
            <div class="value"><span class="badge">${MVO_LABELS[lead.mvoInterestArea] ?? lead.mvoInterestArea}</span></div>
          </div>
          ${lead.message ? `
          <div class="field">
            <div class="label">Bericht</div>
            <div class="message">${lead.message.replace(/\n/g, '<br />')}</div>
          </div>` : ''}
        </div>
        <div class="footer">
          Stichting Shoma &bull; Geregistreerd ANBI &bull; RSIN 8143.90.249<br />
          Volg dit op binnen 2 werkdagen via <a href="mailto:${lead.corporateEmail}">${lead.corporateEmail}</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendB2BLeadNotification(lead: B2BLeadInput): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@shoma.nl';
  const toEmail = process.env.PARTNER_EMAIL ?? 'partners@shoma.nl';

  const subject = `Nieuwe B2B aanvraag: ${lead.companyName} – ${MVO_LABELS[lead.mvoInterestArea] ?? lead.mvoInterestArea}`;

  if (!resendApiKey) {
    // Development fallback: log naar console
    console.log('─── [DEV] B2B Lead E-mail (geen RESEND_API_KEY gevonden) ───');
    console.log(`Aan:     ${toEmail}`);
    console.log(`Onderwerp: ${subject}`);
    console.log('Payload:', JSON.stringify(lead, null, 2));
    console.log('─────────────────────────────────────────────────────────────');
    return;
  }

  // Resend API call via fetch (geen SDK nodig, houdt bundle klein)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: lead.corporateEmail,
      subject,
      html: buildEmailHtml(lead),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Resend API fout:', error);
    throw new Error(`E-mail verzending mislukt: ${response.status}`);
  }
}

// ─── Contactformulier Notificatie E-mail ──────────────────────────────────────
// Stuurt een bericht uit het algemene contactformulier door naar info@shoma.nl.

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function sendContactNotification(contact: ContactInput): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'noreply@shoma.nl';
  const toEmail = process.env.CONTACT_EMAIL ?? 'info@shoma.nl';

  const subject = `Contactformulier: ${contact.subject || `bericht van ${contact.name}`}`;

  if (!resendApiKey) {
    // Development fallback: log naar console
    console.log('─── [DEV] Contact E-mail (geen RESEND_API_KEY gevonden) ───');
    console.log(`Aan:     ${toEmail}`);
    console.log(`Onderwerp: ${subject}`);
    console.log('Payload:', JSON.stringify(contact, null, 2));
    console.log('────────────────────────────────────────────────────────────');
    return;
  }

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif; max-width: 600px; margin: 0 auto; color: #3d2807;">
      <h1 style="font-size: 20px; color: #6e4d1c;">Nieuw bericht via het contactformulier</h1>
      <p><strong>Naam:</strong> ${escapeHtml(contact.name)}</p>
      <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></p>
      ${contact.subject ? `<p><strong>Onderwerp:</strong> ${escapeHtml(contact.subject)}</p>` : ''}
      <div style="background: #faf6ee; border-radius: 8px; padding: 16px; line-height: 1.6;">
        ${escapeHtml(contact.message).replace(/\n/g, '<br />')}
      </div>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: contact.email,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Resend API fout:', error);
    throw new Error(`E-mail verzending mislukt: ${response.status}`);
  }
}
