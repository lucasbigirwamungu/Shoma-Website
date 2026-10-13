'use client';

import { useState } from 'react';
import { Heart, ArrowRight, ArrowLeft, Check, Repeat, Gift, BookOpen, GraduationCap, BadgeCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { DonationFrequency } from '@/types';

// ─── Donatietype ──────────────────────────────────────────────────────────────
type DonationType = 'kemps' | 'regular' | 'water' | 'general';

interface TypeConfig {
  id: DonationType;
  icon: React.ElementType;
  label: string;
  subtitle: string;
  color: string;
  borderColor: string;
  presets: {
    amount: number;
    frequency: DonationFrequency;
    label: string;
    description: string;
    highlight?: boolean;
  }[];
  defaultFrequency: DonationFrequency;
}

const DONATION_TYPES: TypeConfig[] = [
  {
    id: 'kemps',
    icon: GraduationCap,
    label: 'KEMPS Onderwijs',
    subtitle: 'Engelstalig onderwijs · €350/jaar per kind',
    color: 'text-shoma-teal',
    borderColor: 'border-shoma-teal',
    defaultFrequency: 'monthly',
    presets: [
      { amount: 30,  frequency: 'monthly', label: '€ 30/mnd', description: '≈ 1 kind per jaar naar KEMPS' },
      { amount: 60,  frequency: 'monthly', label: '€ 60/mnd', description: '2 kinderen per jaar naar KEMPS', highlight: true },
      { amount: 350, frequency: 'once',    label: '€ 350',    description: '1 volledig jaar KEMPS voor 1 kind', highlight: true },
      { amount: 700, frequency: 'once',    label: '€ 700',    description: '1 volledig jaar KEMPS voor 2 kinderen' },
    ],
  },
  {
    id: 'regular',
    icon: BookOpen,
    label: 'Regulier Onderwijs',
    subtitle: 'Overheidsschool · €40/jaar per kind',
    color: 'text-shoma-terracotta-ink',
    borderColor: 'border-shoma-terracotta',
    defaultFrequency: 'once',
    presets: [
      { amount: 40,  frequency: 'once',    label: '€ 40',     description: '1 jaar regulier onderwijs voor 1 kind', highlight: true },
      { amount: 80,  frequency: 'once',    label: '€ 80',     description: '2 kinderen 1 jaar naar school' },
      // €5 is het minimumbedrag van het formulier: 12 × €5 = €60 per jaar
      { amount: 5,   frequency: 'monthly', label: '€ 5/mnd',  description: 'Ruim 1 jaar regulier onderwijs voor 1 kind', highlight: true },
      { amount: 10,  frequency: 'monthly', label: '€ 10/mnd', description: '3 kinderen 1 jaar naar school' },
    ],
  },
];

interface FormState {
  donationType: DonationType;
  amount: number | '';
  customAmount: string;
  frequency: DonationFrequency;
  donorName: string;
  donorEmail: string;
  newsletterOptIn: boolean;
}

type Step = 1 | 2 | 3;

function defaultPresetFor(config: TypeConfig, frequency: DonationFrequency) {
  const options = config.presets.filter((p) => p.frequency === frequency);
  return options.find((p) => p.highlight) ?? options[0] ?? config.presets[0];
}

export default function DonationForm() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    donationType: 'kemps',
    amount: 60,
    customAmount: '',
    frequency: 'monthly',
    donorName: '',
    donorEmail: '',
    newsletterOptIn: false,
  });

  const activeType = DONATION_TYPES.find((t) => t.id === form.donationType) ?? DONATION_TYPES[0];

  const resolvedAmount =
    form.amount === '' ? parseFloat(form.customAmount) || 0 : form.amount;

  const isValidAmount = resolvedAmount >= 5 && resolvedAmount <= 10000;

  const selectType = (type: DonationType) => {
    const config = DONATION_TYPES.find((t) => t.id === type)!;
    const defaultPreset = defaultPresetFor(config, config.defaultFrequency);
    setForm((f) => ({
      ...f,
      donationType: type,
      amount: defaultPreset.amount,
      customAmount: '',
      frequency: config.defaultFrequency,
    }));
  };

  // Bedrag en frequentie horen bij elkaar: wisselen van frequentie kiest het
  // voorkeursbedrag van die frequentie, zodat €350 nooit ongemerkt maandelijks wordt.
  const selectFrequency = (frequency: DonationFrequency) => {
    setForm((f) => {
      if (f.frequency === frequency) return f;
      if (f.amount === '') return { ...f, frequency };
      return { ...f, frequency, amount: defaultPresetFor(activeType, frequency).amount };
    });
  };

  const visiblePresets = activeType.presets.filter((p) => p.frequency === form.frequency);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/donate/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: resolvedAmount,
          frequency: form.frequency,
          donorName: form.donorName,
          donorEmail: form.donorEmail,
          newsletterOptIn: form.newsletterOptIn,
          donationType: form.donationType,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Er is een onbekende fout opgetreden.');
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setError('Verbindingsfout. Controleer uw internetverbinding en probeer opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-lg w-full">
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100">
        <div
          className="h-full bg-shoma-terracotta transition-all duration-500 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        {(['Kies type', 'Gegevens', 'Betaling'] as const).map((label, i) => {
          const s = (i + 1) as Step;
          return (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step > s ? 'bg-shoma-teal text-white' : step === s ? 'bg-shoma-terracotta text-shoma-slate' : 'bg-gray-100 text-shoma-slate/70'
              }`}>
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === s ? 'text-shoma-slate' : 'text-shoma-slate/70'}`}>
                {label}
              </span>
              {i < 2 && <div className="w-8 sm:w-12 h-px bg-gray-200 mx-1" />}
            </div>
          );
        })}
      </div>

      <div className="px-6 pb-6 pt-4">

        {/* ─── Step 1: Type + Bedrag ─────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-shoma-slate">Kies uw bijdrage</h2>
              <p className="text-sm text-shoma-slate/70 mt-1">Elke euro gaat direct naar een kind in Rubya</p>
            </div>

            {/* Donatietype selector */}
            <div className="grid grid-cols-2 gap-3">
              {DONATION_TYPES.map((type) => {
                const Icon = type.icon;
                const active = form.donationType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectType(type.id)}
                    className={`flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all ${
                      active
                        ? `${type.borderColor} bg-shoma-sand`
                        : 'border-gray-200 hover:border-shoma-teal/30 bg-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${active ? type.color : 'text-shoma-slate/50'}`} aria-hidden="true" />
                    <span className={`font-bold text-sm ${active ? 'text-shoma-slate' : 'text-shoma-slate/75'}`}>
                      {type.label}
                    </span>
                    <span className="text-xs text-shoma-slate/70 mt-0.5 leading-tight">{type.subtitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Frequentie (KEMPS + Regulier Onderwijs) */}
            {(form.donationType === 'kemps' || form.donationType === 'regular') && (
              <div role="group" aria-label="Frequentie" className="flex rounded-xl overflow-hidden border border-shoma-teal/20 bg-shoma-sand p-1 gap-1">
                {(['monthly', 'once'] as DonationFrequency[]).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    aria-pressed={form.frequency === freq}
                    onClick={() => selectFrequency(freq)}
                    className={`flex-1 flex items-center justify-center gap-2 min-h-11 rounded-lg text-sm font-semibold transition-all ${
                      form.frequency === freq
                        ? 'bg-shoma-teal text-white shadow-sm'
                        : 'text-shoma-slate/70 hover:text-shoma-slate'
                    }`}
                  >
                    {freq === 'monthly' ? (
                      <><Repeat className="w-3.5 h-3.5" />Maandelijks</>
                    ) : (
                      <><Gift className="w-3.5 h-3.5" />Eenmalig</>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Bedrag presets */}
            <div className="grid grid-cols-2 gap-3">
              {visiblePresets.map((preset) => (
                <button
                  key={`${preset.frequency}-${preset.amount}`}
                  type="button"
                  aria-pressed={form.amount === preset.amount}
                  onClick={() => setForm((f) => ({ ...f, amount: preset.amount, frequency: preset.frequency, customAmount: '' }))}
                  className={`relative flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all ${
                    form.amount === preset.amount
                      ? 'border-shoma-terracotta bg-orange-50'
                      : 'border-gray-200 hover:border-shoma-teal/40 bg-white'
                  } ${preset.highlight ? 'ring-2 ring-shoma-terracotta/20' : ''}`}
                >
                  {preset.highlight && (
                    <span className="absolute -top-2.5 left-3 bg-shoma-terracotta text-shoma-slate text-xs font-bold px-2 py-0.5 rounded-full">
                      Meest gekozen
                    </span>
                  )}
                  <span className="font-extrabold text-shoma-slate text-lg">{preset.label}</span>
                  <span className="text-xs text-shoma-slate/70 mt-0.5 leading-tight">{preset.description}</span>
                </button>
              ))}
            </div>

            {/* Custom bedrag */}
            <div>
              <label htmlFor="custom-amount" className="block text-sm font-medium text-shoma-slate mb-2">
                Of voer een eigen bedrag in{form.frequency === 'monthly' ? ' per maand' : ''} (minimaal € 5)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-shoma-slate font-semibold">€</span>
                <input
                  id="custom-amount"
                  type="number"
                  min={5}
                  max={10000}
                  inputMode="decimal"
                  value={form.customAmount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: '', customAmount: e.target.value.replace(/[^0-9.]/g, '') }))}
                  onFocus={() => setForm((f) => ({ ...f, amount: '' }))}
                  placeholder="Anders, namelijk..."
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:border-shoma-terracotta focus:ring-2 focus:ring-shoma-terracotta/20 focus:outline-none text-shoma-slate"
                />
              </div>
            </div>

            <Button
              size="lg"
              className="h-12 w-full bg-shoma-terracotta text-base font-semibold text-shoma-slate hover:bg-shoma-terracotta-dark"
              onClick={() => setStep(2)}
              disabled={!isValidAmount}
            >
              Verder <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* ─── Step 2: Gegevens ──────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-shoma-slate">Uw gegevens</h2>
              <p className="text-sm text-shoma-slate/70 mt-1">Alleen het hoognodige: voor uw fiscale ANBI-kwitantie.</p>
            </div>

            {/* Samenvatting */}
            <div className="bg-shoma-teal/5 border border-shoma-teal/15 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-shoma-teal/70 uppercase tracking-wider font-medium">
                  {activeType.label}
                </span>
                <p className="font-bold text-shoma-slate text-lg">
                  € {resolvedAmount.toFixed(2)}{' '}
                  <span className="text-sm font-normal text-shoma-slate/60">
                    {form.frequency === 'monthly' ? '/ maand' : 'eenmalig'}
                  </span>
                </p>
              </div>
              <button type="button" onClick={() => setStep(1)} className="-m-2 p-2 text-sm font-medium text-shoma-teal underline underline-offset-2">Wijzigen</button>
            </div>

            <div>
              <label htmlFor="donor-name" className="block text-sm font-medium text-shoma-slate mb-1.5">
                Voor- en achternaam <span className="text-red-700" aria-hidden="true">*</span>
              </label>
              <input
                id="donor-name"
                type="text"
                autoComplete="name"
                required
                value={form.donorName}
                onChange={(e) => setForm((f) => ({ ...f, donorName: e.target.value }))}
                placeholder="Jan de Vries"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-shoma-terracotta focus:ring-2 focus:ring-shoma-terracotta/20 focus:outline-none text-shoma-slate"
              />
            </div>

            <div>
              <label htmlFor="donor-email" className="block text-sm font-medium text-shoma-slate mb-1.5">
                E-mailadres <span className="text-red-700" aria-hidden="true">*</span>
              </label>
              <input
                id="donor-email"
                type="email"
                autoComplete="email"
                required
                value={form.donorEmail}
                onChange={(e) => setForm((f) => ({ ...f, donorEmail: e.target.value }))}
                placeholder="jan@voorbeeld.nl"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-shoma-terracotta focus:ring-2 focus:ring-shoma-terracotta/20 focus:outline-none text-shoma-slate"
              />
              <p className="text-xs text-shoma-slate/70 mt-1.5">Uw fiscale ANBI-kwitantie wordt naar dit adres gestuurd.</p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input type="checkbox" checked={form.newsletterOptIn} onChange={(e) => setForm((f) => ({ ...f, newsletterOptIn: e.target.checked }))} className="peer sr-only" />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-shoma-teal ${form.newsletterOptIn ? 'bg-shoma-teal border-shoma-teal' : 'border-shoma-slate/40 group-hover:border-shoma-teal'}`}>
                  {form.newsletterOptIn && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm text-shoma-slate/70 leading-relaxed">
                Ja, ik ontvang graag updates over de voortgang in Rubya (max. 4× per jaar).
              </span>
            </label>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="lg" className="h-12 w-12 shrink-0" aria-label="Terug naar bedrag" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4" /></Button>
              <Button
                size="lg"
                className="h-12 w-full bg-shoma-terracotta text-base font-semibold text-shoma-slate hover:bg-shoma-terracotta-dark"
                onClick={() => setStep(3)}
                disabled={form.donorName.length < 2 || !form.donorEmail.includes('@')}
              >
                Naar betaling <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* ─── Step 3: Betaling ─────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-shoma-slate">Bevestig uw donatie</h2>
              <p className="text-sm text-shoma-slate/70 mt-1">U wordt doorgestuurd naar de beveiligde Mollie-betaalpagina.</p>
            </div>

            <div className="bg-shoma-sand rounded-2xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-shoma-slate/60">Type</span>
                <span className="font-medium text-shoma-slate">{activeType.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-shoma-slate/60">Donateur</span>
                <span className="font-medium text-shoma-slate">{form.donorName}</span>
              </div>
              <div className="border-t border-shoma-teal/10 pt-3 flex justify-between">
                <span className="text-shoma-slate/60">Bedrag</span>
                <span className="font-extrabold text-shoma-terracotta-ink text-lg">
                  € {resolvedAmount.toFixed(2)}{' '}
                  <span className="text-sm font-normal text-shoma-slate/50">
                    {form.frequency === 'monthly' ? '/ maand' : 'eenmalig'}
                  </span>
                </span>
              </div>
            </div>

            {/* Fiscaal aftrekbaar badge */}
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <BadgeCheck className="h-5 w-5 shrink-0 text-green-700" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-green-800">Fiscaal aftrekbaar (ANBI)</p>
                <p className="text-xs text-green-700 mt-0.5">
                  Als erkende ANBI-instelling is uw donatie aftrekbaar van de inkomstenbelasting.{' '}
                  <a href="/over-ons#fiscaal" className="underline font-medium">Meer info →</a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <Lock className="h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Beveiligd via <strong>Mollie</strong>: iDEAL, Apple Pay, Google Pay en creditcard.
              </p>
            </div>

            {error && (
              <div role="alert" className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{error}</div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" size="lg" className="h-12 w-12 shrink-0" aria-label="Terug naar gegevens" onClick={() => setStep(2)} disabled={loading}><ArrowLeft className="w-4 h-4" /></Button>
              <Button
                size="lg"
                className="h-12 w-full bg-shoma-terracotta text-base font-semibold text-shoma-slate hover:bg-shoma-terracotta-dark"
                disabled={loading}
                onClick={handleCheckout}
              >
                <Heart className="w-5 h-5" />
                {loading ? 'Betaling aanmaken…' : 'Betaal nu'}
              </Button>
            </div>

            <p className="text-xs text-shoma-slate/70 text-center">
              Door te betalen gaat u akkoord met onze{' '}
              <a href="/privacyverklaring" className="underline hover:text-shoma-teal">privacyverklaring</a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
