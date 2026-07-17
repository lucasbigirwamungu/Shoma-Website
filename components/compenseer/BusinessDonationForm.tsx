'use client';

import { useState } from 'react';
import {
  calculateBusinessCO2,
  calculateCompensation,
  formatCO2,
  formatPrice,
  PRESETS,
} from '@/lib/compenseer/calculator';
import { TreeSpecies, BusinessFootprint } from '@/lib/compenseer/types';
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
];

export default function BusinessDonationForm() {
  const [step, setStep] = useState<'input' | 'impact' | 'checkout' | 'success'>('input');
  const [footprint, setFootprint] = useState<BusinessFootprint>({
    category: 'offices',
  });
  const [co2Kg, setCo2Kg] = useState(0);
  const [selectedSpecies] = useState<TreeSpecies[]>(DEFAULT_SPECIES);
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const calculation = calculateCompensation(co2Kg, selectedSpecies);

  const handleCategoryChange = (category: string) => {
    setFootprint({ ...footprint, category });
    const newCo2 = calculateBusinessCO2({
      ...footprint,
      category,
    });
    setCo2Kg(newCo2);
  };

  const handleEmployees = (employees: number) => {
    setFootprint({ ...footprint, employees });
    const newCo2 = calculateBusinessCO2({
      ...footprint,
      employees,
    });
    setCo2Kg(newCo2);
  };

  const handleVehicles = (vehicles: number) => {
    setFootprint({ ...footprint, vehicles });
    const newCo2 = calculateBusinessCO2({
      ...footprint,
      vehicles,
    });
    setCo2Kg(newCo2);
  };

  const handleCustomScope = (kg: number) => {
    setFootprint({ ...footprint, customScopeKg: kg });
    setCo2Kg(kg);
  };

  const handlePreset = (presetKey: keyof typeof PRESETS.business) => {
    const preset = PRESETS.business[presetKey] as Partial<BusinessFootprint>;
    setFootprint({
      category: preset.category || 'offices',
      employees: preset.employees,
      vehicles: preset.vehicles,
      customScopeKg: preset.customScopeKg,
    });
    const newCo2 = calculateBusinessCO2(preset as BusinessFootprint);
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
          donorName: companyName,
          donorEmail: companyEmail,
          donationType: 'business',
          co2Kg,
          amountEur: calculation.amountEur,
          treesAllocated: calculation.treesAllocated,
          inputType: 'business_scope',
          businessCategory: footprint.category,
          businessEmployees: footprint.employees,
          businessVehicles: footprint.vehicles,
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
          paymentMethod: 'creditcard',
        }),
      });

      const paymentData = await paymentResponse.json();

      setSuccessData({ ...data, payment: paymentData });
      setStep('success');
    } catch (error) {
      alert('Fout bij verwerking: ' + (error as Error).message);
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
                {s === 'input'
                  ? 'Bedrijfsgegevens'
                  : s === 'impact'
                    ? 'Impact'
                    : 'MVO-certificaat'}
              </span>
              {idx < 2 && <div className="w-12 h-0.5 bg-gray-300 ml-4" />}
            </div>
          ))}
        </div>
      </div>

      {step === 'input' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-shoma-teal mb-6">
            Bedrijfs CO₂ voetafdruk
          </h2>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              💼 Kies je bedrijfscategorie en voer gegevens in
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bedrijfscategorie
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(PRESETS.business).map(([key, preset]) => {
                const presetData = preset as any;
                return (
                  <button
                    key={key}
                    onClick={() => handlePreset(key as keyof typeof PRESETS.business)}
                    className={`p-3 rounded-lg text-sm font-medium transition ${
                      footprint.category === presetData.category
                        ? 'bg-shoma-terracotta text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {presetData.description || key}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Employees */}
          {footprint.category !== 'logistics' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👥 Aantal medewerkers
              </label>
              <input
                type="range"
                min="1"
                max="500"
                step="5"
                value={footprint.employees || 20}
                onChange={(e) => handleEmployees(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-shoma-terracotta">
                  {footprint.employees || 20}
                </span>
                <span className="text-sm text-gray-600">
                  ~{Math.round(((footprint.employees || 20) * 1200) / 1000)} ton CO₂/jaar
                </span>
              </div>
            </div>
          )}

          {/* Vehicles */}
          {footprint.category === 'logistics' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🚚 Aantal voertuigen
              </label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={footprint.vehicles || 5}
                onChange={(e) => handleVehicles(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-shoma-terracotta">
                  {footprint.vehicles || 5}
                </span>
                <span className="text-sm text-gray-600">
                  ~{Math.round(((footprint.vehicles || 5) * 8000) / 1000)} ton CO₂/jaar
                </span>
              </div>
            </div>
          )}

          {/* Custom scope */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom CO₂ scope (optioneel, kg/jaar)
            </label>
            <input
              type="number"
              value={footprint.customScopeKg || 0}
              onChange={(e) => handleCustomScope(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shoma-terracotta"
              placeholder="Voer je totale CO2 in als je deze weet"
            />
          </div>

          <div className="bg-shoma-sand p-4 rounded-lg border-l-4 border-shoma-terracotta">
            <div className="text-3xl font-bold text-shoma-teal mb-2">
              {formatCO2(co2Kg)}
            </div>
            <p className="text-sm text-gray-600">jaarlijkse CO₂ voetafdruk bedrijf</p>
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
            Bedrijfsimpact
          </h2>

          <CompenseerImpactDisplay calculation={calculation} />

          <div className="bg-gradient-to-r from-shoma-teal to-shoma-terracotta p-6 rounded-lg text-white">
            <h3 className="font-bold mb-2">✓ MVO Certificaat</h3>
            <p className="text-sm">
              Na betaling ontvang je een professioneel MVO-certificaat voor jouw
              stakeholders, partners en klanten. Perfect voor jouw duurzaamheidsrapport.
            </p>
          </div>

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
              MVO Certificaat aanvragen →
            </button>
          </div>
        </div>
      )}

      {step === 'checkout' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-shoma-teal mb-6">
            MVO-certificaat afronden
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
                <span className="text-gray-600">Certificaattype:</span>
                <p className="font-bold text-shoma-teal">MVO Business</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrijfsnaam
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shoma-terracotta"
                placeholder="Naam van je bedrijf"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contactemail
              </label>
              <input
                type="email"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shoma-terracotta"
                placeholder="contact@bedrijf.nl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefoonnummer
              </label>
              <input
                type="tel"
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-shoma-terracotta"
                placeholder="+31 (0)6 1234 5678"
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
              disabled={!companyName || !companyEmail || isLoading}
              className="flex-1 bg-shoma-terracotta hover:bg-orange-500 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition"
            >
              {isLoading ? 'Verwerking...' : 'Betalen (iDEAL / Creditcard)'}
            </button>
          </div>
        </div>
      )}

      {step === 'success' && successData && (
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-shoma-teal mb-2">
              MVO-commitmentgeregistreerd!
            </h2>
            <p className="text-gray-600">
              Bedankt {companyName}! Jullie duurzaamheidsinspanning is nu actief.
            </p>
          </div>

          <div className="bg-gradient-to-r from-shoma-teal to-shoma-terracotta p-6 rounded-lg text-white">
            <h3 className="font-bold mb-4">Bedrijfsimpact</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">
                  {successData.donation.trees_allocated}
                </div>
                <div className="text-xs opacity-90">Bomen</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {Math.round(successData.donation.co2_kg / 1000 * 100) / 100}t
                </div>
                <div className="text-xs opacity-90">CO₂ offset</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  ~{Math.round(successData.donation.trees_allocated / 2)}
                </div>
                <div className="text-xs opacity-90">Kinderen</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3">Download je certificaat</h3>
            <p className="text-sm text-blue-800 mb-4">
              Je MVO-certificaat is klaar voor gebruik in jaarverslagen, marketing, en stakeholder communicatie.
            </p>
            <a
              href={`/api/compenseer/certificate/${successData.certificate.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              📄 Download certificaat
            </a>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-900 mb-3">Volgende stappen</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>✓ Betaling verwerkt (ref: {successData.payment.receiptNumber})</li>
              <li>✓ Bomen gepland in Rubya schooltuinen</li>
              <li>→ Groei-updates via email (maandelijks)</li>
              <li>→ Contact: info@shoma.nl voor vragen</li>
            </ul>
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-shoma-teal hover:opacity-90 text-white font-bold py-3 rounded-lg transition"
          >
            Terug naar homepage
          </button>
        </div>
      )}
    </div>
  );
}
