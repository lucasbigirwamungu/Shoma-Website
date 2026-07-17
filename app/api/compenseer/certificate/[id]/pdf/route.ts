import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { supabase } from '@/lib/compenseer/supabase-client';
import {
  generateCertificateHTML,
  generateBusinessCertificateHTML,
} from '@/lib/compenseer/certificate-generator';

/**
 * GET /api/compenseer/certificate/[id]/pdf
 * Generate PDF certificate on demand
 *
 * In production: consider caching PDFs in S3/storage
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: certificateId } = await params;

  try {
    // Get certificate from Supabase
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
      {
        id: '3',
        name: 'Eucalyptus',
        scientificName: 'Eucalyptus globulus',
        co2KgPerYear: 24.1,
        lifecycleYears: 30,
        description: 'Fast-growing timber',
        region: 'Tanzania',
      },
    ];

    // Generate HTML based on certificate type
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

    // Convert HTML to PDF with Puppeteer
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });

      // Generate PDF
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
      });

      await browser.close();

      // Return PDF
      return new NextResponse(Buffer.from(pdf), {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="certificate_${certificateId}.pdf"`,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Length': Buffer.from(pdf).length.toString(),
        },
      });
    } catch (puppeteerError) {
      if (browser) {
        try {
          await browser.close();
        } catch (e) {
          // Ignore
        }
      }

      console.error('Puppeteer error:', puppeteerError);

      // Fallback: return HTML (for development)
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': `inline; filename="certificate_${certificateId}.html"`,
        },
      });
    }
  } catch (error) {
    console.error('Certificate generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate certificate',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
