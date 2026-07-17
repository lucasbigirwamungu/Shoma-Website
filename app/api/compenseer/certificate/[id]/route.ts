import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/compenseer/supabase-client';
import { generateCertificateHTML, generateBusinessCertificateHTML } from '@/lib/compenseer/certificate-generator';

/**
 * GET /api/compenseer/certificate/[id]
 * Returns certificate as HTML (in production: PDF)
 *
 * In production with Puppeteer:
 * const browser = await puppeteer.launch();
 * const page = await browser.newPage();
 * await page.setContent(html);
 * const pdf = await page.pdf({ format: 'A4' });
 * await browser.close();
 * res.setHeader('Content-Type', 'application/pdf');
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: certificateId } = await params;

    // Get certificate from DB
    const { data: certificate, error } = await supabase
      .from('compenseer_certificates')
      .select('*')
      .eq('id', certificateId)
      .single();

    if (error || !certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    // Mock species data (in production: fetch from DB)
    const mockSpecies = [
      {
        id: '1',
        name: 'Mango',
        scientificName: 'Mangifera indica',
        co2KgPerYear: 21.5,
        lifecycleYears: 40,
        description: 'High-value fruit tree',
        region: 'Tanzania',
      },
      {
        id: '2',
        name: 'Acacia',
        scientificName: 'Acacia polyacantha',
        co2KgPerYear: 15.3,
        lifecycleYears: 35,
        description: 'Indigenous hardwood',
        region: 'Tanzania',
      },
    ];

    // Generate HTML based on type
    let html: string;
    if (certificate.certificate_type === 'business') {
      html = generateBusinessCertificateHTML(
        certificate,
        certificate.donor_name,
        mockSpecies
      );
    } else {
      html = generateCertificateHTML(certificate, mockSpecies);
    }

    // Return as HTML (for development)
    // In production: convert to PDF and return as application/pdf
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="certificate_${certificateId}.html"`,
      },
    });
  } catch (error) {
    console.error('Certificate error:', error);
    return NextResponse.json(
      { error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/compenseer/certificate/[id]/download
 * Mark certificate as downloaded (tracking)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: certificateId } = await params;

    await supabase
      .from('compenseer_certificates')
      .update({ downloaded_at: new Date() })
      .eq('id', certificateId);

    return NextResponse.json(
      { success: true, message: 'Download recorded' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Download tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to record download' },
      { status: 500 }
    );
  }
}
