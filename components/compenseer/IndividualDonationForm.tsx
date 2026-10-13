'use client';

import { useState } from 'react';
import {
  calculateIndividualCO2,
  calculateCompensation,
  formatCO2,
  formatPrice,
  PRESETS,
} from '@/lib/compenseer/calculator';
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react';
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
      {step === 'input' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-shoma-teal mb-3">
            Bereken uw CO₂-uitstoot
          </h2>
          <p className="text-shoma-slate/75 leading-relaxed">
            Vul in hoeveel uur u vliegt, hoeveel kilometer u per jaar met de auto rijdt, of wat
            uw jaarlijkse voetafdruk is. Wij tellen dat op tot uw CO₂-uitstoot in kilo&apos;s. Daar
            hoort een compensatiebedrag bij: 1,5 tot 2,5 cent per kilo CO₂, afhankelijk van uw
            totaal. Met uw donatie planten lokale teams bomen op schoolterreinen in Rubya,
            Tanzania, een project van Stichting Shoma dat ook het onderwijs daar steunt.
          </p>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-center">
          {['input', 'impact', 'checkout'].map((s, idx) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === s
                    ? 'bg-shoma-terracotta text-shoma-slate'
                    : idx < ['input', 'impact', 'checkout'].indexOf(step)
                      ? 'bg-shoma-teal text-white'
                      : 'bg-shoma-cream text-shoma-slate/75'
                }`}
              >
                {idx + 1}
              </div>
              <span className={`ml-2 text-sm font-medium ${step === s ? '' : 'hidden sm:inline'}`}>
                {s === 'input' ? 'Uw voetafdruk' : s === 'impact' ? 'Impact' : 'Betaling'}
              </span>
              {idx < 2 && <div className="w-6 sm:w-12 h-0.5 bg-shoma-clay ml-2 sm:ml-4" />}
            </div>
          ))}
        </div>
      </div>

      {step === 'input' && (
        <div className="space-y-8">
          <div className="bg-shoma-sand p-4 rounded-lg border border-shoma-teal/15">
            <p className="text-sm text-shoma-slate">
              Vul één veld in, of meerdere voor een totaal:
            </p>
          </div>

          {/* Flight hours */}
          <div>
            <label htmlFor="voetafdruk-vlieguren" className="block text-sm font-medium text-shoma-slate mb-2">
              Vlieguren (retour)
            </label>
            <input
              id="voetafdruk-vlieguren"
              name="flightHours"
              type="range"
              min="0"
              max="24"
              step="1"
              value={footprint.flightHours || 0}
              onChange={(e) => handleFlightHours(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold text-shoma-terracotta-ink">
                {footprint.flightHours || 0} uur
              </span>
              <span className="text-sm text-shoma-slate/75">
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
                    className="text-xs px-2 py-1 bg-shoma-cream hover:bg-shoma-clay rounded"
                  >
                    {preset.description}
                  </button>
                ))}
            </div>
          </div>

          {/* Distance km */}
          <div>
            <label htmlFor="voetafdruk-km" className="block text-sm font-medium text-shoma-slate mb-2">
              Gereden km (per jaar)
            </label>
            <input
              id="voetafdruk-km"
              name="distanceKm"
              type="range"
              min="0"
              max="20000"
              step="100"
              value={footprint.distanceKm || 0}
              onChange={(e) => handleDistanceKm(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold text-shoma-terracotta-ink">
                {footprint.distanceKm || 0} km
              </span>
              <span className="text-sm text-shoma-slate/75">
                ~{Math.round((footprint.distanceKm || 0) * 0.192)} kg CO₂
              </span>
            </div>
          </div>

          {/* Annual footprint */}
          <div>
            <label htmlFor="voetafdruk-jaar" className="block text-sm font-medium text-shoma-slate mb-2">
              Jaarlijkse voetafdruk (kg CO₂)
            </label>
            <input
              id="voetafdruk-jaar"
              name="annualFootprintKg"
              type="range"
              min="0"
              max="10000"
              step="250"
              value={footprint.annualFootprintKg || 0}
              onChange={(e) => handleAnnualFootprint(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold text-shoma-terracotta-ink">
                {footprint.annualFootprintKg || 0} kg
              </span>
              <span className="text-sm text-shoma-slate/75">
                EU gemiddelde: ~4500 kg/jaar
              </span>
            </div>
          </div>

          <div className="bg-shoma-sand p-4 rounded-lg border border-shoma-terracotta/40">
            <div className="text-3xl font-bold text-shoma-teal mb-2">
              {formatCO2(co2Kg)}
            </div>
            <p className="text-sm text-shoma-slate/75">totale CO₂ uitstoot</p>
          </div>

          <button
            onClick={handleNextStep}
            disabled={co2Kg === 0}
            className="w-full bg-shoma-terracotta hover:bg-shoma-terracotta-dark disabled:bg-shoma-clay disabled:text-shoma-slate/60 text-shoma-slate font-bold py-3 rounded-lg transition"
          >
            Volgende: Impact zien
              <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {step === 'impact' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-shoma-teal mb-6">
            Uw impact
          </h2>

          <CompenseerImpactDisplay calculation={calculation} />

          <div className="flex gap-4">
            <button
              onClick={handlePrevStep}
              className="flex-1 bg-shoma-cream hover:bg-shoma-clay text-shoma-slate font-bold py-3 rounded-lg transition"
            >
              <ArrowLeft className="mr-1 inline h-4 w-4" aria-hidden="true" />
              Terug
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 bg-shoma-terracotta hover:bg-shoma-terracotta-dark text-shoma-slate font-bold py-3 rounded-lg transition"
            >
              Doneren
              <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
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
                <span className="text-shoma-slate/75">CO₂ offset:</span>
                <p className="font-bold text-shoma-teal">{formatCO2(co2Kg)}</p>
              </div>
              <div>
                <span className="text-shoma-slate/75">Bomen te planten:</span>
                <p className="font-bold text-shoma-teal">{calculation.treesAllocated}</p>
              </div>
              <div>
                <span className="text-shoma-slate/75">Donatie bedrag:</span>
                <p className="font-bold text-shoma-terracotta-ink">
                  {formatPrice(calculation.amountEur)}
                </p>
              </div>
              <div>
                <span className="text-shoma-slate/75">Kinderen ondersteund:</span>
                <p className="font-bold text-shoma-teal">
                  ~{Math.round(calculation.treesAllocated / 2)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="donateur-naam" className="block text-sm font-medium text-shoma-slate mb-2">
                Naam
              </label>
              <input
                id="donateur-naam"
                name="donorName" autoComplete="name"
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-2 border border-shoma-teal/25 rounded-lg focus:ring-2 focus:ring-shoma-terracotta"
                placeholder="Uw naam"
              />
            </div>

            <div>
              <label htmlFor="donateur-email" className="block text-sm font-medium text-shoma-slate mb-2">
                Email
              </label>
              <input
                id="donateur-email"
                name="donorEmail" autoComplete="email"
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-4 py-2 border border-shoma-teal/25 rounded-lg focus:ring-2 focus:ring-shoma-terracotta"
                placeholder="naam@voorbeeld.nl"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handlePrevStep}
              className="flex-1 bg-shoma-cream hover:bg-shoma-clay text-shoma-slate font-bold py-3 rounded-lg transition"
            >
              <ArrowLeft className="mr-1 inline h-4 w-4" aria-hidden="true" />
              Terug
            </button>
            <button
              onClick={handleSubmitDonation}
              disabled={!donorName || !donorEmail || isLoading}
              className="flex-1 bg-shoma-terracotta hover:bg-shoma-terracotta-dark disabled:bg-shoma-clay disabled:text-shoma-slate/60 text-shoma-slate font-bold py-3 rounded-lg transition"
            >
              {isLoading ? 'Verwerking...' : 'Betalen met iDEAL'}
            </button>
          </div>
        </div>
      )}

      {step === 'success' && successData && (
        <div className="space-y-8">
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-shoma-teal" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-shoma-teal mb-2">
              Donatie geslaagd
            </h2>
            <p className="text-shoma-slate/75">
              Bedankt {donorName}! Uw bijdrage maakt verschil.
            </p>
          </div>

          <div className="bg-shoma-cream p-6 rounded-lg border border-shoma-teal/15">
            <h3 className="font-bold text-shoma-slate mb-4">Uw impact</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-shoma-teal">
                  {successData.donation.trees_allocated}
                </div>
                <div className="text-xs text-shoma-slate">Bomen gepland</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-shoma-teal">
                  {Math.round(successData.donation.co2_kg / 1000 * 100) / 100}t
                </div>
                <div className="text-xs text-shoma-slate">CO₂ offset</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-shoma-terracotta-ink">
                  €{successData.donation.amount_eur.toFixed(2)}
                </div>
                <div className="text-xs text-shoma-slate">Gedoneerd</div>
              </div>
            </div>
          </div>

          <div className="bg-shoma-sand p-6 rounded-lg border border-shoma-teal/15">
            <h3 className="font-bold text-shoma-slate mb-3">Volgende stappen</h3>
            <ul className="text-sm text-shoma-slate space-y-2">
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>Uw certificaat is gemaakt</span></li>
              <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>Betalingsref: <code className="bg-white px-2 py-1">{successData.payment.receiptNumber}</code></span></li>
              <li className="flex items-start gap-2"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>Het certificaat (pdf) staat in uw e-mail</span></li>
              <li className="flex items-start gap-2"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><span>Updates over de boomgroei via de nieuwsbrief</span></li>
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
