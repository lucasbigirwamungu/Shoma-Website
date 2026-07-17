/**
 * Email templates for Compenseer & Leer
 */

export function getDonationConfirmationEmail(
  donorName: string,
  treesCount: number,
  co2Kg: number,
  certificateUrl: string
) {
  return {
    subject: `Je CO₂ compensatie is actief! ${treesCount} bomen gepland`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: #f9f6ee; padding: 40px 20px; }
    .header { background: linear-gradient(135deg, #6e4d1c 0%, #ef9403 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: white; padding: 40px; }
    .metric { display: inline-block; margin: 10px 20px; text-align: center; }
    .metric-number { font-size: 32px; font-weight: bold; color: #6e4d1c; }
    .metric-label { font-size: 12px; color: #999; text-transform: uppercase; margin-top: 5px; }
    .cta { display: inline-block; background: #ef9403; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; margin: 20px 0; font-weight: bold; }
    .footer { background: #f9f6ee; padding: 20px; text-align: center; font-size: 12px; color: #999; }
    .step { margin: 20px 0; }
    .step-num { display: inline-block; background: #6e4d1c; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Bedankt ${donorName}!</h1>
      <p>Je CO₂ compensatie is actief</p>
    </div>

    <div class="content">
      <p>Je donatie is verwerkt en <strong>${treesCount} bomen</strong> worden nu geplant in Rubya, Tanzania.</p>

      <div style="text-align: center; background: #f9f6ee; padding: 30px; border-radius: 8px; margin: 20px 0;">
        <div class="metric">
          <div class="metric-number">${treesCount}</div>
          <div class="metric-label">Bomen</div>
        </div>
        <div class="metric">
          <div class="metric-number">${Math.round(co2Kg / 1000 * 100) / 100}t</div>
          <div class="metric-label">CO₂ Offset</div>
        </div>
      </div>

      <h2>Download je certificaat</h2>
      <p>Je persoonlijke CO₂ certificaat is klaar:</p>
      <a href="${certificateUrl}" class="cta">📄 Certificaat downloaden</a>

      <h2>Volgende stappen</h2>
      <div class="step">
        <span class="step-num">1</span>
        <strong>Groei-updates</strong>
        <p>Je ontvangt maandelijks updates over hoe jouw bomen groeien in Tanzania.</p>
      </div>

      <div class="step">
        <span class="step-num">2</span>
        <strong>Deel je certificaat</strong>
        <p>Deel je impact op social media! (#CompenseerEnLeer #ShomaEducation)</p>
      </div>

      <div class="step">
        <span class="step-num">3</span>
        <strong>Vragen?</strong>
        <p>Contact ons op <strong>info@shoma.nl</strong> of bekijk <strong>www.shoma.nl</strong></p>
      </div>

      <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;">

      <p style="font-size: 12px; color: #999;">
        Deze email is verzonden naar je account. Niet ingediend door jou?
        <a href="https://www.shoma.nl/privacy" style="color: #6e4d1c;">Privacy</a>
      </p>
    </div>

    <div class="footer">
      <p>Stichting Shoma | ANBI Erkend | Onderwijs in Tanzania</p>
      <p><a href="https://www.shoma.nl" style="color: #6e4d1c;">www.shoma.nl</a></p>
    </div>
  </div>
</body>
</html>
    `,
  };
}

export function getBusinessCertificateEmail(
  companyName: string,
  treesCount: number,
  co2Kg: number,
  certificateUrl: string
) {
  return {
    subject: `🏢 MVO Certificaat klaar - ${companyName}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: white; border: 3px solid #6e4d1c; }
    .header { background: white; padding: 40px; text-align: center; border-bottom: 3px solid #ef9403; }
    .header h1 { color: #6e4d1c; margin: 0; }
    .content { padding: 40px; }
    .metric { display: inline-block; margin: 10px 30px; text-align: center; }
    .metric-number { font-size: 28px; font-weight: bold; color: #6e4d1c; }
    .metric-label { font-size: 11px; color: #999; text-transform: uppercase; margin-top: 5px; }
    .cta { display: inline-block; background: #6e4d1c; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; margin: 20px 0; font-weight: bold; }
    .commitment { background: linear-gradient(135deg, #6e4d1c 0%, #ef9403 100%); color: white; padding: 30px; border-radius: 8px; margin: 20px 0; }
    .footer { background: #f9f6ee; padding: 20px; text-align: center; font-size: 11px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>MVO Certificaat</h1>
      <p style="color: #ef9403; margin: 10px 0;">Duurzaamheidscommitment voltooid</p>
    </div>

    <div class="content">
      <p>Beste ${companyName},</p>

      <p>Uw duurzaamheidscommitment is geregistreerd. Stichting Shoma plant nu <strong>${treesCount} bomen</strong> in Tanzania als onderdeel van uw MVO-strategie.</p>

      <div style="text-align: center; background: #f9f6ee; padding: 30px; border-radius: 8px; margin: 20px 0;">
        <div class="metric">
          <div class="metric-number">${treesCount}</div>
          <div class="metric-label">Bomen</div>
        </div>
        <div class="metric">
          <div class="metric-number">${Math.round(co2Kg / 1000)}t</div>
          <div class="metric-label">CO₂ Offset</div>
        </div>
        <div class="metric">
          <div class="metric-number">~${Math.round(treesCount / 2)}</div>
          <div class="metric-label">Kinderen</div>
        </div>
      </div>

      <div class="commitment">
        <h3 style="margin-top: 0;">✓ Jouw commitments</h3>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>CO₂ reductie en neutraliteit</li>
          <li>Steun onderwijs in Tanzania</li>
          <li>Bijdrage aan duurzame ontwikkeling (SDG 4, 13, 15)</li>
        </ul>
      </div>

      <h3>Download je certificaat</h3>
      <p>Perfect voor jaarverslagen, website, en stakeholder communicatie:</p>
      <a href="${certificateUrl}" class="cta">📜 Download MVO-certificaat</a>

      <h3>Volgende stappen</h3>
      <ul>
        <li><strong>Groei-updates:</strong> Maandelijks foto's en voortgang uit Rubya</li>
        <li><strong>Impact tracking:</strong> Dashboard beschikbaar op www.shoma.nl/admin</li>
        <li><strong>Partnership:</strong> Contacteer ons voor uitbreiding</li>
      </ul>

      <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;">

      <p style="font-size: 12px; color: #999;">
        Voor vragen: <a href="mailto:info@shoma.nl" style="color: #6e4d1c;">info@shoma.nl</a>
      </p>
    </div>

    <div class="footer">
      <p><strong>Stichting Shoma</strong></p>
      <p>ANBI Erkend | Onderwijs en Duurzaamheid in Tanzania</p>
      <p><a href="https://www.shoma.nl" style="color: #6e4d1c;">www.shoma.nl</a></p>
    </div>
  </div>
</body>
</html>
    `,
  };
}

export function getNewsletterWelcomeEmail(donorName: string) {
  return {
    subject: '👋 Welkom bij Shoma!',
    html: `
<p>Hallo ${donorName},</p>

<p>Welkom bij de Stichting Shoma community! Vanaf nu ontvang je updates over:</p>
<ul>
  <li>Groei van jouw bomen in Tanzania</li>
  <li>📚 Onderwijs resultaten in Rubya</li>
  <li>🎉 Special events en campagnes</li>
</ul>

<p>Veel sterkte!</p>
<p>Stichting Shoma</p>
    `,
  };
}
