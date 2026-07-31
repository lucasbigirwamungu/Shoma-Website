'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { B2BLeadInput } from '@/lib/validations';

type FormState = B2BLeadInput & { _state: 'idle' | 'loading' | 'success' | 'error' };

const MVO_OPTIONS = [
  { value: 'education', label: 'Onderwijsprojecten (KEMPS)' },
  { value: 'water',     label: 'Schoon Water & Sanitair (SDG 6)' },
  { value: 'energy',    label: 'Duurzame Energie (Solar & Moestuin)', emoji: '☀️' },
  { value: 'general',   label: 'Algemene Bedrijfssponsoring / MVO-advies', emoji: '🤝' },
] as const;

const INITIAL: FormState = {
  companyName: '',
  contactName: '',
  corporateEmail: '',
  phoneNumber: '',
  mvoInterestArea: 'education',
  projectPreference: '',
  message: '',
  _state: 'idle',
};

export default function B2BContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof B2BLeadInput, string>>>({});

  const set = (key: keyof B2BLeadInput, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setForm((f) => ({ ...f, _state: 'loading' }));

    const payload: B2BLeadInput = {
      companyName:       form.companyName,
      contactName:       form.contactName,
      corporateEmail:    form.corporateEmail,
      phoneNumber:       form.phoneNumber || undefined,
      mvoInterestArea:   form.mvoInterestArea,
      projectPreference: form.projectPreference || undefined,
      message:           form.message || undefined,
    };

    try {
      const res = await fetch('/api/partners/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Toon veld-specifieke fouten indien aanwezig
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setForm((f) => ({ ...f, _state: 'error' }));
        return;
      }

      setForm({ ...INITIAL, _state: 'success' });
    } catch {
      setForm((f) => ({ ...f, _state: 'error' }));
    }
  };

  // ─── Successtatus ─────────────────────────────────────────────────────────────
  if (form._state === 'success') {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 text-center max-w-lg w-full">
        <div className="w-16 h-16 bg-shoma-teal/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-shoma-teal" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-shoma-slate mb-3">Aanvraag ontvangen!</h3>
        <p className="text-shoma-slate/65 leading-relaxed">
          Bedankt voor uw interesse in een partnerschap met Stichting Shoma. Een bestuurslid
          neemt binnen <strong>2 werkdagen</strong> contact op via{' '}
          <strong>{INITIAL.corporateEmail || 'het opgegeven e-mailadres'}</strong>.
        </p>
        <button
          className="mt-6 text-sm text-shoma-teal hover:underline underline-offset-2"
          onClick={() => setForm(INITIAL)}
        >
          Nog een aanvraag indienen
        </button>
      </div>
    );
  }

  const isLoading = form._state === 'loading';

  const inputClass = (field: keyof B2BLeadInput) =>
    `w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-shoma-teal/20 text-shoma-slate ${
      fieldErrors[field]
        ? 'border-red-400 focus:border-red-400 bg-red-50/30'
        : 'border-gray-200 focus:border-shoma-teal bg-white'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-3xl border border-gray-100 shadow-xl p-7 sm:p-8 max-w-lg w-full"
    >
      <h3 className="text-xl font-bold text-shoma-slate mb-1">Stuur ons een bericht</h3>
      <p className="text-sm text-shoma-slate/55 mb-6">
        Wij reageren binnen 2 werkdagen via <strong>partners@shoma.nl</strong>.
      </p>

      <div className="space-y-4">
        {/* Bedrijfsnaam */}
        <div>
          <label className="block text-sm font-medium text-shoma-slate mb-1.5">
            Bedrijfsnaam <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => set('companyName', e.target.value)}
            placeholder="Uw bedrijfsnaam"
            className={inputClass('companyName')}
            required
          />
          {fieldErrors.companyName && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.companyName}</p>
          )}
        </div>

        {/* Naam contactpersoon */}
        <div>
          <label className="block text-sm font-medium text-shoma-slate mb-1.5">
            Naam contactpersoon <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => set('contactName', e.target.value)}
            placeholder="Voor- en achternaam"
            className={inputClass('contactName')}
            required
          />
          {fieldErrors.contactName && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.contactName}</p>
          )}
        </div>

        {/* 2-koloms rij: e-mail + telefoon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-shoma-slate mb-1.5">
              Zakelijk e-mailadres <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={form.corporateEmail}
              onChange={(e) => set('corporateEmail', e.target.value)}
              placeholder="naam@bedrijf.nl"
              className={inputClass('corporateEmail')}
              required
            />
            {fieldErrors.corporateEmail && (
              <p className="text-xs text-red-500 mt-1">{fieldErrors.corporateEmail}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-shoma-slate mb-1.5">
              Telefoonnummer <span className="text-shoma-slate/40 text-xs font-normal">(optioneel)</span>
            </label>
            <input
              type="tel"
              value={form.phoneNumber}
              onChange={(e) => set('phoneNumber', e.target.value)}
              placeholder="+31 6 ..."
              className={inputClass('phoneNumber')}
            />
          </div>
        </div>

        {/* MVO Interessegebied */}
        <div>
          <label className="block text-sm font-medium text-shoma-slate mb-1.5">
            MVO Interessegebied <span className="text-red-400">*</span>
          </label>
          <select
            value={form.mvoInterestArea}
            onChange={(e) => set('mvoInterestArea', e.target.value)}
            className={`${inputClass('mvoInterestArea')} appearance-none cursor-pointer`}
            required
          >
            {MVO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Vrij tekstveld */}
        <div>
          <label className="block text-sm font-medium text-shoma-slate mb-1.5">
            Uw MVO-doelstellingen of vragen
            <span className="text-shoma-slate/40 text-xs font-normal ml-1">(optioneel)</span>
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="Wat zijn uw specifieke doelstellingen op het gebied van duurzaamheid of medewerkersbetrokkenheid?"
            className={`${inputClass('message')} resize-none`}
          />
          <p className="text-xs text-shoma-slate/40 mt-1 text-right">
            {form.message?.length ?? 0} / 2000
          </p>
        </div>
      </div>

      {form._state === 'error' && (
        <div className="mt-4 flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-700">
            Er is iets misgegaan. Controleer de gemarkeerde velden en probeer opnieuw.
          </p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="mt-6 w-full bg-shoma-terracotta text-white hover:bg-shoma-terracotta-dark"
      >
        <Send className="w-5 h-5" aria-hidden="true" />
        {isLoading ? 'Versturen…' : 'Aanvraag versturen'}
      </Button>

      <p className="text-xs text-shoma-slate/40 mt-3 text-center">
        Uw gegevens worden uitsluitend gebruikt voor opvolging door het Shoma-bestuur en nooit
        gedeeld met derden. Zie onze{' '}
        <a href="/privacyverklaring" className="underline hover:text-shoma-teal">
          privacyverklaring
        </a>
        .
      </p>
    </form>
  );
}
