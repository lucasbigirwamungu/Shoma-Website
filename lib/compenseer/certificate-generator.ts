import { Donation, Certificate, TreeSpecies } from './types';

/**
 * Generate PDF certificate HTML (server-side template)
 * Use external PDF service (e.g., Puppeteer, pdfkit) to convert to PDF
 */
export function generateCertificateHTML(
  certificate: Certificate,
  species: TreeSpecies[]
): string {
  const dateStr = new Date().toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const speciesNames = species.map((s) => s.name).join(', ');
  const avgLifecycle =
    species.reduce((sum, s) => sum + s.lifecycleYears, 0) / species.length;

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: white;
      color: #333;
    }

    .certificate {
      width: 210mm;
      height: 297mm;
      padding: 20mm;
      background: linear-gradient(135deg, #6e4d1c 0%, #ef9403 100%);
      position: relative;
      overflow: hidden;
    }

    .certificate::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 20px 20px;
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: white;
      text-align: center;
    }

    .header {
      margin-bottom: 20px;
    }

    .logo {
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 10px;
      letter-spacing: 2px;
    }

    .logo-sub {
      font-size: 12px;
      opacity: 0.9;
      letter-spacing: 3px;
      text-transform: uppercase;
    }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 15px;
    }

    .title {
      font-size: 32px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }

    .subtitle {
      font-size: 14px;
      opacity: 0.95;
      letter-spacing: 1px;
    }

    .metrics {
      display: flex;
      justify-content: space-around;
      gap: 20px;
      margin: 20px 0;
      background: rgba(255,255,255,0.1);
      padding: 20px;
      border-radius: 10px;
      backdrop-filter: blur(5px);
    }

    .metric {
      text-align: center;
    }

    .metric-number {
      font-size: 36px;
      font-weight: bold;
      line-height: 1;
    }

    .metric-label {
      font-size: 11px;
      opacity: 0.9;
      margin-top: 5px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .species-list {
      font-size: 12px;
      opacity: 0.9;
      margin: 15px 0;
      line-height: 1.6;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      border-top: 2px solid rgba(255,255,255,0.3);
      font-size: 11px;
    }

    .signature {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }

    .line {
      width: 80px;
      height: 1px;
      background: white;
    }

    .date {
      text-align: left;
    }

    .code {
      font-family: monospace;
      font-size: 10px;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="content">
      <div class="header">
        <div class="logo">SHOMA</div>
        <div class="logo-sub">Onderwijs in Tanzania</div>
      </div>

      <div class="main">
        <div>
          <div class="title">Certificaat van</div>
          <div class="title" style="font-size: 28px;">CO₂ Compensatie</div>
        </div>

        <div>
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">
            ${certificate.donorName}
          </div>
          <div class="subtitle">
            heeft bijgedragen aan CO₂ reductie en onderwijsondersteuning
          </div>
        </div>

        <div class="metrics">
          <div class="metric">
            <div class="metric-number">${certificate.treesCount}</div>
            <div class="metric-label">Bomen geplant</div>
          </div>
          <div class="metric">
            <div class="metric-number">${Math.round(certificate.co2OffsetKg)}</div>
            <div class="metric-label">kg CO₂ offset</div>
          </div>
          <div class="metric">
            <div class="metric-number">${Math.round(certificate.treesCount / 2)}</div>
            <div class="metric-label">Kinderen ondersteund</div>
          </div>
        </div>

        <div class="species-list">
          Boomsoorten: <strong>${speciesNames}</strong>
          <br>
          Lifecycle: ${Math.round(avgLifecycle)} jaar
        </div>
      </div>

      <div class="footer">
        <div class="date">
          Afgegeven op: <strong>${dateStr}</strong>
        </div>
        <div class="signature">
          <div class="line"></div>
          <div style="font-size: 10px;">Stichting Shoma</div>
        </div>
        <div class="code">
          Ref: ${certificate.id.slice(0, 8).toUpperCase()}
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate business/MVO certificate
 */
export function generateBusinessCertificateHTML(
  certificate: Certificate,
  companyName: string,
  species: TreeSpecies[]
): string {
  const dateStr = new Date().toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const speciesNames = species.map((s) => s.name).join(', ');

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: white;
      color: #333;
    }

    .certificate {
      width: 210mm;
      height: 297mm;
      padding: 25mm;
      background: white;
      border: 3px solid #6e4d1c;
      position: relative;
    }

    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #ef9403;
      padding-bottom: 20px;
    }

    .logo {
      font-size: 40px;
      color: #6e4d1c;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .tagline {
      font-size: 12px;
      color: #ef9403;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      gap: 20px;
    }

    .certificate-title {
      font-size: 28px;
      color: #6e4d1c;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .awarded-to {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .company-name {
      font-size: 24px;
      color: #333;
      font-weight: bold;
      margin-bottom: 20px;
    }

    .impact-box {
      background: linear-gradient(135deg, #6e4d1c 0%, #ef9403 100%);
      color: white;
      padding: 25px;
      border-radius: 8px;
      margin: 20px 0;
    }

    .impact-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-bottom: 15px;
    }

    .impact-item {
      text-align: center;
    }

    .impact-number {
      font-size: 28px;
      font-weight: bold;
      line-height: 1;
    }

    .impact-label {
      font-size: 11px;
      opacity: 0.9;
      margin-top: 5px;
      text-transform: uppercase;
    }

    .commitment {
      font-size: 12px;
      line-height: 1.6;
      margin-bottom: 10px;
    }

    .species {
      font-size: 11px;
      color: #666;
      margin-bottom: 20px;
      font-style: italic;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 20px;
      border-top: 2px solid #ef9403;
      font-size: 10px;
    }

    .footer-left {
      text-align: left;
    }

    .footer-right {
      text-align: right;
    }

    .signature-line {
      width: 100px;
      height: 1px;
      background: #333;
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="content">
      <div class="header">
        <div class="logo">SHOMA</div>
        <div class="tagline">Duurzaamheid & Onderwijs</div>
      </div>

      <div class="main">
        <div class="certificate-title">MVO Certificaat</div>
        <div class="awarded-to">Dit certificaat wordt uitgereikt aan</div>

        <div class="company-name">${companyName}</div>

        <div class="impact-box">
          <div class="impact-grid">
            <div class="impact-item">
              <div class="impact-number">${certificate.treesCount}</div>
              <div class="impact-label">Bomen geplant</div>
            </div>
            <div class="impact-item">
              <div class="impact-number">${Math.round(certificate.co2OffsetKg / 1000)}</div>
              <div class="impact-label">Ton CO₂ offset</div>
            </div>
            <div class="impact-item">
              <div class="impact-number">€${Math.round(certificate.co2OffsetKg * 0.02)}</div>
              <div class="impact-label">EUR Gedoneerd</div>
            </div>
          </div>

          <div class="commitment">
            ✓ Voert actief maatregelen uit ter bestrijding van klimaatverandering
            <br>
            ✓ Ondersteunt onderwijs in Tanzania via schooltuinen
            <br>
            ✓ Draagt bij aan duurzame ontwikkelingsdoelen (SDG 4, 13, 15)
          </div>
        </div>

        <div class="species">
          Boomsoorten: ${speciesNames}
        </div>
      </div>

      <div class="footer">
        <div class="footer-left">
          <strong>Afgegeven:</strong> ${dateStr}
          <br>
          <strong>Referentie:</strong> ${certificate.id.slice(0, 8).toUpperCase()}
        </div>
        <div class="footer-right">
          <div>Stichting Shoma</div>
          <div class="signature-line"></div>
          <div style="margin-top: 20px; font-size: 9px;">
            ANBI Status: ✓
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Metadata for certificate (for storage, email, etc.)
 */
export function generateCertificateMetadata(
  donation: Donation,
  donorName: string,
  donorEmail: string
): Omit<Certificate, 'id' | 'createdAt' | 'pdfUrl'> {
  return {
    donationId: donation.id,
    certificateType: donation.donationType,
    donorName,
    donorEmail,
    treesCount: donation.treesAllocated,
    co2OffsetKg: donation.co2Kg,
    generatedAt: new Date(),
    downloadedAt: undefined,
  };
}
