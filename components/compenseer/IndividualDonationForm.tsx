'use client';

import { useState } from 'react';
import {
  calculateIndividualCO2,
  calculateCompensation,
  formatCO2,
  formatPrice,
  PRESETS,
} from '@/lib/compenseer/calculator';
import { TreeSpecies, IndividualFootprint } from '@/lib/compenseer/types';
import CompenseerImpactDisplay from './CompenseerImpactDisplay';

const DEFAULT_SPECIES: TreeSpecies[] = [
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

export default function IndividualDonationForm() {
  const [step, setStep] = useState<'input' | 'impact' | 'checkout' | 'success'>('input');
  const [footprint, setFootprint] = useState<IndividualFootprint>({});
  const [co2Kg, setCo2Kg] = useState(0);
  const [selectedSpecies] = useState<TreeSpecies[]>(DEFAULT_SPECIES);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const calculation = calculateCompensation(co2Kg, selectedSpecies);

  const handleFlightHours = (hours: number) => {
    setFootprint({ ...footprint, flightHours: hours });
    const newCo2 = calculateIndividualCO2({
      ...footprint,
      flightHours: hours,
    });
    setCo2Kg(newCo2);
  };

  const handleDistanceKm = (km: number) => {
    setFootprint({ ...footprint, distanceKm: km });
    const newCo2 = calculateIndividualCO2({
      ...footprint,
      distanceKm: km,
    });
    setCo2Kg(newCo2);
  };

  const handleAnnualFootprint = (kg: number) => {
    setFootprint({ ...footprint, annualFootprintKg: kg });
    const newCo2 = calculateIndividualCO2({
      ...footprint,
      annualFootprintKg: kg,
    });
    setCo2Kg(newCo2);
  };

  const handlePreset = (presetKey: keyof typeof PRESETS.individual) => {
    const preset = PRESETS.individual[presetKey];
    setFootprint(preset);
    const newCo2 = calculateIndividualCO2(preset);
    setCo2Kg(newCo2);
  };

  const handleNextStep = () => {
    if (step === 'input') {
      setStep('impact');
    } else if (step === 'impact') {
      setStep('checkout');
    }
  };

  const handlePrevStep = () => {
    if (step === 'impact') {
      setStep('input');
    } else if (step === 'checkout') {
      setStep('impact');
    }
  };

  const handleSubmitDonation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/compenseer/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName,
          donorEmail,
          donationType: 'individual',
          co2Kg,
          amountEur: calculation.amountEur,
          treesAllocated: calculation.treesAllocated,
          inputType: footprint.flightHours
            ? 'flight_hours'
            : footprint.distanceKm
              ? 'distance_km'
              : 'annual_footprint',
          flightHours: footprint.flightHours,
          distanceKm: footprint.distanceKm,
          annualFootprintKg: footprint.annualFootprintKg,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process donation');
      }

      const data = await response.json();

      // Process payment
      const paymentResponse = await fetch('/api/compenseer/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donationId: data.donation.id,
          amountEur: calculation.amountEur,
          paymentMethod: 'ideal',
        }),
      });

      const paymentData = await paymentResponse.json();

      setSuccessData({ ...data, payment: paymentData });
      setStep('success');
    } catch (error) {
      alert('Fout bij verwerking donatie: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {['input', 'impact', 'checkout'].map((s, idx) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  step === s
                    ? 'bg-shoma-terracotta'
                    : idx < ['input', 'impact', 'checkout'].indexOf(step)
                      ? 'bg-green-600'
                      : 'bg-gray-300'
                }`}
              >
                {idx + 1}
              </div>
              <span className="ml-2 text-sm font-medium">
                {s === 'input' ? 'Je voetafdruk' : s === 'impact' ? 'Impact' : 'Betaling'}
              </span>
              {idx < 2 && <div className="w-12 h-0.5 bg-gray-300 ml-4" />}
            </div>
          ))}
        </div>
      </div>

      {step === 'input' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-shoma-teal mb-6">
            Bereken jouw CO₂ uitstoot
          </h2>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              💡 Kies één optie hieronder, of voeg meerdere in voor totaal:
            </p>
          </div>

          {/* Flight hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ✈️ Vlieguren (retour)
            </label>
            <input
              type="range"
              min="0"
              max="24"
              step="1"
              value={footprint.flightHours || 0}
              onChange={(e) => handleFlightHours(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold text-shoma-terracotta">
                {footprint.flightHours || 0} uur
              </span>
              <span className="text-sm text-gray-600">
                ~{Math.round((footprint.flightHours || 0) * CO2_FACTORS.flight)} kg CO₂
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              {Object.entries(PRESETS.individual)
                .filter(([k]) => k.includes('flight'))
                .map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handlePreset(key as keyof typeof PRESETS.individual)}
                    className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    {preset.description}
                  </button>
                ))}
            </div>
          </div>

          {/* Distance km */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🚗 Gereden km (per jaar)
            </label>
            <input
              type="range"
              min="0"
              max="20000"
              step="100"
              value={footprint.distanceKm || 0}
              onChange={(e) => handleDistanceKm(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold text-shoma-terracotta">
                {footprint.distanceKm || 0} km
              </span>
              <span className="text-sm text-gray-600">
                ~{Math.round((footprint.distanceKm || 0) * 0.192)} kg CO₂
              </span>
            </div>
          </div>

          {/* Annual footprint */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jaarlijkse voetafdruk (kg CO₂)
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="250"
              value={footprint.annualFootprintKg || 0}
              onChange={(e) => handleAnnualFootprint(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold text-shoma-terracotta">
                {footprint.annualFootprintKg || 0} kg
              </span>
              <span className="text-sm text-gray-600">
                EU gemiddelde: ~4500 kg/jaar
              </span>
            </div>
          </div>

          <div className="bg-shoma-sand p-4 rounded-lg border-l-4 border-shoma-terracotta">
            <div className="text-3xl font-bold text-shoma-teal mb-2">
              {formatCO2(co2Kg)}
            </div>
            <p className="text-sm text-gray-600">totale CO₂ uitstoot</p>
          </div>

          <button
            onClick={handleNextStep}
            disabled={co2Kg === 0}
            className="w-full bg-shoma-terracotta hover:bg-orange-500 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition"
          >
            Volgende: Impact zien →
          </button>
        </div>
      )}

      {step === 'impact' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-shoma-teal mb-6">
            Jouw impact
          </h2>

          <CompenseerImpactDisplay calculation={calculation} />

          <div className="flex gap-4">
            <button
              onClick={handlePrevStep}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition"
            >
              ← Terug
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 bg-shoma-terracotta hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition"
            >
              Doneren →
            </button>
          </div>
        </div>
      )}

      {step === 'checkout' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-shoma-teal mb-6">
            Donatie afronden
          </h2>

          <div className="bg-shoma-sand p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600">CO₂ offset:</span>
                <p className="font-bold text-shoma-teal">{formatCO2(co2Kg)}</p>
              </div>
              <div>
                <span className="text-gray-600">Bomen te planten:</span>
                <p className="font-bold text-shoma-teal">{calculation.treesAllocated}</p>
              </div>
              <div>
                <span className="text-gray-600">Donatie bedrag:</span>
                <p className="font-bold text-shoma-terracotta">
                  {formatPrice(calculation.amountEur)}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Kinderen ondersteund:</span>
                <p className="font-bold text-shoma-teal">
                  ~{Math.round(calculation.treesAllocated / 2)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Naam
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shoma-terracotta"
                placeholder="Je naam"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shoma-terracotta"
                placeholder="jouw@email.nl"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePrevStep}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition"
            >
              ← Terug
            </button>
            <button
              onClick={handleSubmitDonation}
              disabled={!donorName || !donorEmail || isLoading}
              className="flex-1 bg-shoma-terracotta hover:bg-orange-500 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition"
            >
              {isLoading ? 'Verwerking...' : 'Betalen met iDEAL'}
            </button>
          </div>
        </div>
      )}

      {step === 'success' && successData && (
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-3xl font-bold text-shoma-teal mb-2">
              Donatie geslaagd!
            </h2>
            <p className="text-gray-600">
              Bedankt {donorName}! Je bijdrage maakt verschil.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-900 mb-4">Jouw impact</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {successData.donation.trees_allocated}
                </div>
                <div className="text-xs text-green-800">Bomen gepland</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round(successData.donation.co2_kg / 1000 * 100) / 100}t
                </div>
                <div className="text-xs text-blue-800">CO₂ offset</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">
                  €{successData.donation.amount_eur.toFixed(2)}
                </div>
                <div className="text-xs text-orange-800">Gedoneerd</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3">Volgende stappen</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>✓ Je certificaat is gegenereerd</li>
              <li>✓ Betalingsref: <code className="bg-white px-2 py-1">{successData.payment.receiptNumber}</code></li>
              <li>→ Check je email voor certificate (pdf download)</li>
              <li>→ Updates over boomgroei via newsletter</li>
            </ul>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-shoma-teal hover:bg-shoma-teal text-white font-bold py-3 rounded-lg transition"
          >
            Terug naar homepage
          </button>
        </div>
      )}
    </div>
  );
}

const CO2_FACTORS = {
  flight: 0.255,
  car: 0.192,
};
