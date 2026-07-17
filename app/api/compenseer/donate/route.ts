import { NextRequest, NextResponse } from 'next/server';
import { createDonation, createTrees, logCampaignData, createCertificate } from '@/lib/compenseer/supabase-client';
import { generateCertificateHTML } from '@/lib/compenseer/certificate-generator';
import { sendDonationConfirmationEmail, sendBusinessCertificateEmail } from '@/lib/compenseer/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      donorName,
      donorEmail,
      donationType,
      co2Kg,
      amountEur,
      treesAllocated,
      inputType,
      flightHours,
      distanceKm,
      annualFootprintKg,
      businessCategory,
      businessEmployees,
      businessVehicles,
    } = body;

    // Validate required fields
    if (!donorName || !donorEmail || !co2Kg || !amountEur) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate donor ID (in production, use auth)
    const donorId = `donor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create donation record
    const donation = await createDonation({
      donorId,
      donationType: donationType || 'individual',
      co2Kg,
      amountEur,
      treesAllocated,
    });

    // Log campaign data
    await logCampaignData({
      donationId: donation.id,
      inputType: inputType || 'flight_hours',
      flightHours,
      distanceKm,
      annualFootprintKg,
      businessCategory,
      businessEmployees,
      businessVehicles,
    });

    // Create tree records (mock species IDs)
    const mockSpeciesIds = [
      '550e8400-e29b-41d4-a716-446655440001', // Mango
      '550e8400-e29b-41d4-a716-446655440002', // Acacia
      '550e8400-e29b-41d4-a716-446655440003', // Eucalyptus
    ];

    const selectedSpecies = mockSpeciesIds.slice(0, Math.ceil(treesAllocated / 10));
    await createTrees({
      donationId: donation.id,
      speciesIds: selectedSpecies,
      locationDescription: 'Rubya, Kagera Region',
      schoolName: businessCategory ? 'Community School' : 'Primary School',
      mPesaPhone: '255712345678', // Mock phone
    });

    // Generate certificate HTML (in production, convert to PDF)
    const certificateHTML = generateCertificateHTML(
      {
        id: donation.id,
        donationId: donation.id,
        certificateType: donationType || 'individual',
        pdfUrl: '', // Placeholder
        donorName,
        donorEmail,
        treesCount: treesAllocated,
        co2OffsetKg: co2Kg,
        generatedAt: new Date(),
        createdAt: new Date(),
      },
      selectedSpecies.map((id, idx) => ({
        id,
        name: ['Mango', 'Acacia', 'Eucalyptus'][idx],
        scientificName: ['Mangifera indica', 'Acacia polyacantha', 'Eucalyptus globulus'][idx],
        co2KgPerYear: [21.5, 15.3, 24.1][idx],
        lifecycleYears: [40, 35, 30][idx],
        description: ['High-value fruit tree', 'Indigenous hardwood', 'Fast-growing timber'][idx],
        region: 'Tanzania',
      }))
    );

    // Create certificate record
    const certificate = await createCertificate({
      donationId: donation.id,
      certificateType: donationType || 'individual',
      pdfUrl: `/api/compenseer/certificate/${donation.id}/pdf`, // PDF route
      donorName,
      donorEmail,
      treesCount: treesAllocated,
      co2OffsetKg: co2Kg,
    });

    // Send confirmation email (async, non-blocking)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const certificateUrl = `${baseUrl}/api/compenseer/certificate/${donation.id}/pdf`;

    if (donationType === 'business') {
      sendBusinessCertificateEmail(
        donorEmail,
        donorName,
        treesAllocated,
        co2Kg,
        certificateUrl
      ).catch((err) => console.error('Email send error:', err));
    } else {
      sendDonationConfirmationEmail(
        donorEmail,
        donorName,
        treesAllocated,
        co2Kg,
        certificateUrl
      ).catch((err) => console.error('Email send error:', err));
    }

    return NextResponse.json(
      {
        success: true,
        donation,
        certificate,
        message: 'Donatie verwerkt! Je certificaat wordt gegenereerd en via email verzonden.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    );
  }
}
