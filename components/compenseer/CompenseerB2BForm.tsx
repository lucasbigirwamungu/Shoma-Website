'use client';

import { useState, useRef } from 'react';
import { Mail, Phone, Building2, Users } from 'lucide-react';

type FormState = {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  team_size: string;
  co2_scope: string;
  message: string;
  _state: 'idle' | 'loading' | 'success' | 'error';
  _error?: string;
};

export default function CompenseerB2BForm() {
  const [form, setForm] = useState<FormState>({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    team_size: '',
    co2_scope: '',
    message: '',
    _state: 'idle',
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (
      !form.company_name.trim() ||
      !form.contact_name.trim() ||
      !form.email.trim() ||
      !form.team_size.trim()
    ) {
      setForm((prev) => ({
        ...prev,
        _state: 'error',
        _error: 'Vul alstublieft alle verplichte velden in.',
      }));
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setForm((prev) => ({
        ...prev,
        _state: 'error',
        _error: 'Voer een geldig e-mailadres in.',
      }));
      return;
    }

    setForm((prev) => ({ ...prev, _state: 'loading' }));

    try {
      const response = await fetch('/api/compenseer/b2b-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: form.company_name,
          contact_name: form.contact_name,
          email: form.email,
          phone: form.phone,
          team_size: form.team_size,
          co2_scope: form.co2_scope,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Verzenden mislukt');
      }

      setForm({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        team_size: '',
        co2_scope: '',
        message: '',
        _state: 'success',
      });

      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Auto-reset success message after 5 seconds
      setTimeout(() => {
        setForm((prev) => ({ ...prev, _state: 'idle' }));
      }, 5000);
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        _state: 'error',
        _error: error instanceof Error ? error.message : 'Er is iets misgegaan. Probeer het later opnieuw.',
      }));
    }
  };

  const teamSizeOptions = [
    { value: '1-25', label: '1–25 medewerkers' },
    { value: '26-100', label: '26–100 medewerkers' },
    { value: '100+', label: '100+ medewerkers' },
  ];

  const co2ScopeOptions = [
    { value: 'office', label: 'Kantoor & facilities' },
    { value: 'travel', label: 'Zakenreizen' },
    { value: 'operations', label: 'Totale operaties' },
    { value: 'custom', label: 'Custom scope (zeg waar)' },
  ];

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-sm"
    >
      <h3 className="text-2xl font-bold text-shoma-slate mb-1">Vraag in</h3>
      <p className="text-sm text-shoma-slate/60 mb-6">Wij nemen binnen 24 uur contact op.</p>

      {/* Success message */}
      {form._state === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
          <div className="text-green-600 font-bold text-xl mt-0.5">✓</div>
          <div>
            <p className="font-semibold text-green-900">Dank u!</p>
            <p className="text-sm text-green-800">Uw aanvraag is verstuurd. Wij nemen snel contact op.</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {form._state === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <div className="text-red-600 font-bold text-xl mt-0.5">!</div>
          <div>
            <p className="font-semibold text-red-900">Fout</p>
            <p className="text-sm text-red-800">{form._error}</p>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {/* Company name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-shoma-teal" aria-hidden="true" />
            Bedrijfsnaam
          </label>
          <input
            type="text"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            placeholder="Acme Corp"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-shoma-teal focus:border-transparent"
          />
        </div>

        {/* Contact name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-shoma-teal" aria-hidden="true" />
            Uw naam
          </label>
          <input
            type="text"
            name="contact_name"
            value={form.contact_name}
            onChange={handleChange}
            placeholder="Jan Jansen"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-shoma-teal focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-shoma-teal" aria-hidden="true" />
            E-mailadres
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jan@acmecorp.nl"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-shoma-teal focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-shoma-teal" aria-hidden="true" />
            Telefoonnummer
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+31 6 12345678"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-shoma-teal focus:border-transparent"
          />
        </div>

        {/* Team size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Team-grootte
          </label>
          <select
            name="team_size"
            value={form.team_size}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-shoma-teal focus:border-transparent"
          >
            <option value="">Selecteer team-grootte...</option>
            {teamSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* CO2 scope */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CO₂-scope voorkeur
          </label>
          <select
            name="co2_scope"
            value={form.co2_scope}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-shoma-teal focus:border-transparent"
          >
            <option value="">Selecteer scope...</option>
            {co2ScopeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opmerkingen (optioneel)
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Bijv. we willen dit gebruiken voor ons MVO-programma..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-shoma-teal focus:border-transparent resize-none"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={form._state === 'loading'}
        className="w-full mt-6 bg-shoma-teal hover:bg-shoma-teal-dark disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-colors"
      >
        {form._state === 'loading' ? 'Verzenden...' : 'Vraag in'}
      </button>

      <p className="text-xs text-shoma-slate/50 text-center mt-4">
        Uw gegevens worden beveiligd verstuurd naar partners@shoma.nl en niet gedeeld.
      </p>
    </form>
  );
}
