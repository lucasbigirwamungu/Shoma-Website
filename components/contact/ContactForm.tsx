'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import type { ContactInput } from '@/lib/validations';

type Status = 'idle' | 'loading' | 'success' | 'error';

const INITIAL: ContactInput = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<ContactInput>(INITIAL);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});

  const set = (key: keyof ContactInput, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((e) => ({ ...e, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setStatus('error');
        return;
      }

      setForm(INITIAL);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  // ─── Successtatus ─────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 text-center w-full" role="status">
        <div className="w-16 h-16 bg-shoma-teal/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-shoma-teal" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-shoma-slate mb-3">Bericht verzonden!</h2>
        <p className="text-shoma-slate/65 leading-relaxed">
          Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op.
        </p>
        <button
          type="button"
          className="mt-6 text-sm text-shoma-teal hover:underline underline-offset-2"
          onClick={() => setStatus('idle')}
        >
          Nog een bericht sturen
        </button>
      </div>
    );
  }

  const isLoading = status === 'loading';

  const inputClass = (field: keyof ContactInput) =>
    `w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-shoma-teal/20 text-shoma-slate ${
      fieldErrors[field]
        ? 'border-red-400 focus:border-red-400 bg-red-50/30'
        : 'border-gray-200 focus:border-shoma-teal bg-white'
    }`;

  const fieldError = (field: keyof ContactInput) =>
    fieldErrors[field] ? (
      <p id={`contact-${field}-error`} className="mt-1.5 text-xs text-red-500">
        {fieldErrors[field]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-3xl border border-gray-100 shadow-xl p-7 sm:p-8 w-full"
    >
      <h2 className="text-xl font-bold text-shoma-slate mb-1">Stuur ons een bericht</h2>
      <p className="text-sm text-shoma-slate/55 mb-6">
        Wilt u in contact komen met Shoma? Vul dan hieronder uw gegevens in.
      </p>

      <div className="space-y-4">
        {/* Naam */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-shoma-slate mb-1.5">
            Uw naam <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            maxLength={400}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
            className={inputClass('name')}
            disabled={isLoading}
            required
          />
          {fieldError('name')}
        </div>

        {/* E-mail */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-shoma-slate mb-1.5">
            Uw e-mail <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            maxLength={400}
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
            className={inputClass('email')}
            disabled={isLoading}
            required
          />
          {fieldError('email')}
        </div>

        {/* Onderwerp */}
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium text-shoma-slate mb-1.5">
            Onderwerp
          </label>
          <input
            id="contact-subject"
            type="text"
            maxLength={400}
            value={form.subject}
            onChange={(e) => set('subject', e.target.value)}
            className={inputClass('subject')}
            disabled={isLoading}
          />
        </div>

        {/* Bericht */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-shoma-slate mb-1.5">
            Uw bericht <span className="text-red-400">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={6}
            maxLength={2000}
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
            className={`${inputClass('message')} resize-y`}
            disabled={isLoading}
            required
          />
          {fieldError('message')}
        </div>

        {/* Honeypot – verborgen voor bezoekers */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {status === 'error' && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3.5" role="alert">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-red-700">
              {Object.values(fieldErrors).some(Boolean)
                ? 'Controleer de gemarkeerde velden en probeer het opnieuw.'
                : 'Verzenden is niet gelukt. Probeer het opnieuw of stuur een e-mail naar info@shoma.nl.'}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 bg-shoma-terracotta hover:bg-shoma-terracotta-dark disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
          {isLoading ? 'Bezig met verzenden…' : 'Verzenden'}
        </button>
      </div>
    </form>
  );
}
