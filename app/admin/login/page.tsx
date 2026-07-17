import { Metadata } from 'next';
import { Lock } from 'lucide-react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = {
  title: 'Admin Login – Stichting Shoma',
  description: 'Admin dashboard login',
  robots: 'noindex, nofollow',
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-shoma-teal to-shoma-teal-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-white/70 mt-2">Stichting Shoma Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AdminLoginForm />

          {/* Forgot password */}
          <div className="mt-6 text-center">
            <p className="text-sm text-shoma-slate/60">
              Problemen met inloggen?{' '}
              <a href="mailto:admin@shoma.nl" className="text-shoma-teal font-semibold hover:underline">
                Neem contact op
              </a>
            </p>
          </div>
        </div>

        {/* Security notice */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-white text-sm text-center">
          <p>🔒 Deze pagina is beveiligd. Deel je inloggegevens met niemand.</p>
        </div>
      </div>
    </div>
  );
}
