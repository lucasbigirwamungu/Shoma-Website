'use client';

import { useState } from 'react';
import { useAdminAuth } from './AdminAuthProvider';
import { Loader, AlertCircle } from 'lucide-react';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Inloggen is niet gelukt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-shoma-slate mb-2">
          E-mailadres
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="naam@shoma.nl"
          autoComplete="username"
          disabled={loading}
          required
          className="w-full px-4 py-3 border border-shoma-teal/25 rounded-xl focus:ring-2 focus:ring-shoma-teal focus:border-transparent outline-none transition disabled:bg-shoma-sand"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-shoma-slate mb-2">
          Wachtwoord
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          disabled={loading}
          required
          className="w-full px-4 py-3 border border-shoma-teal/25 rounded-xl focus:ring-2 focus:ring-shoma-teal focus:border-transparent outline-none transition disabled:bg-shoma-sand"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-shoma-teal hover:bg-shoma-teal-dark text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Bezig met inloggen
          </>
        ) : (
          'Inloggen'
        )}
      </button>
    </form>
  );
}
