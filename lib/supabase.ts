import { createClient } from '@supabase/supabase-js';

// ─── Client-side Supabase (public anon key) ───────────────────────────────────
// Veilig te gebruiken in React Client Components
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !anonKey) {
    throw new Error('Supabase omgevingsvariabelen zijn niet geconfigureerd');
  }

  return createClient(url, anonKey);
}

// ─── Server-side Supabase (service role key) ─────────────────────────────────
// Uitsluitend gebruiken in Server Actions en API Routes
// Bypasses Row Level Security – NOOIT exporteren naar client
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !serviceKey) {
    throw new Error('Supabase service role key is niet geconfigureerd');
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
