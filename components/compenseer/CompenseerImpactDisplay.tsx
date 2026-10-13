'use client';

import { CompenseerCalculation } from '@/lib/compenseer/types';

export default function CompenseerImpactDisplay({
  calculation,
}: {
  calculation: CompenseerCalculation;
}) {
  const educationBenefit = Math.round(calculation.treesAllocated / 2);
  const yearlySequestration = calculation.selectedSpecies.reduce(
    (sum, s) => sum + s.co2KgPerYear,
    0
  );

  return (
    <div className="space-y-8">
      {/* Main impact metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Trees */}
        <div className="bg-shoma-cream p-6 rounded-lg border border-shoma-teal/15">
          <div className="text-5xl font-bold text-shoma-teal mb-2">
            {calculation.treesAllocated}
          </div>
          <p className="text-sm font-medium text-shoma-slate">Bomen gepland</p>
          <p className="text-xs text-shoma-slate/75 mt-2">
            in schooltuinen in Rubya
          </p>
        </div>

        {/* CO2 */}
        <div className="bg-shoma-cream p-6 rounded-lg border border-shoma-teal/15">
          <div className="text-5xl font-bold text-shoma-teal mb-2">
            {Math.round(calculation.co2Kg / 1000 * 100) / 100}t
          </div>
          <p className="text-sm font-medium text-shoma-slate">CO₂ gecompenseerd</p>
          <p className="text-xs text-shoma-slate/75 mt-2">
            over {calculation.selectedSpecies[0]?.lifecycleYears || 30} jaar groei
          </p>
        </div>

        {/* Education */}
        <div className="bg-shoma-cream p-6 rounded-lg border border-shoma-teal/15">
          <div className="text-5xl font-bold text-shoma-terracotta-ink mb-2">
            ~{educationBenefit}
          </div>
          <p className="text-sm font-medium text-shoma-slate">Kinderen ondersteund</p>
          <p className="text-xs text-shoma-slate/75 mt-2">
            via schoolfonds inkomsten
          </p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white border border-shoma-teal/15 rounded-lg p-6">
        <h3 className="text-lg font-bold text-shoma-teal mb-4">Berekening</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-shoma-slate">CO₂ uitstoot:</span>
            <span className="font-bold text-shoma-teal">
              {Math.round(calculation.co2Kg)} kg
            </span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="text-shoma-slate">Prijs per kg:</span>
            <span className="font-bold text-shoma-slate">
              €{calculation.breakdown.pricePerKg.toFixed(3)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-shoma-slate">Donatie bedrag:</span>
            <span className="font-bold text-shoma-terracotta-ink text-lg">
              €{calculation.amountEur.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Species info */}
      <div className="bg-white border border-shoma-teal/15 rounded-lg p-6">
        <h3 className="text-lg font-bold text-shoma-teal mb-4">
          Boomsoorten mix
        </h3>
        <div className="space-y-3">
          {calculation.selectedSpecies.map((species) => (
            <div key={species.id} className="pb-3 border-b last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-shoma-slate">{species.name}</p>
                  <p className="text-xs text-shoma-slate/75">
                    {species.scientificName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-shoma-teal">
                    {species.co2KgPerYear} kg CO₂/jaar
                  </p>
                  <p className="text-xs text-shoma-slate/75">
                    {species.lifecycleYears}j lifecycle
                  </p>
                </div>
              </div>
              <p className="text-xs text-shoma-slate/75 mt-2">
                {species.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate preview */}
      <div className="bg-shoma-teal-dark p-8 rounded-lg text-white">
        <h3 className="text-lg font-bold mb-4">Uw persoonlijke certificaat</h3>
        <p className="text-sm opacity-90">
          Na betaling ontvangt u een pdf-certificaat dat u kunt delen op
          social media. Het toont uw impact: hoeveel bomen, hoeveel kinderen
          ondersteund, en regelmatig updates van groei in Rubya.
        </p>
      </div>
    </div>
  );
}
