/**
 * Admin-sessies: een HMAC-ondertekend token in een httpOnly-cookie.
 * Gebruikt alleen Web Crypto, zodat het ook in de middleware draait.
 * Zonder ADMIN_EMAIL, ADMIN_PASSWORD en JWT_SECRET kan niemand inloggen.
 */

export const ADMIN_COOKIE = 'shoma_admin';
export const ADMIN_SESSION_SECONDS = 60 * 60 * 8;

const encoder = new TextEncoder();
const PLACEHOLDER_SECRETS = ['change_me_in_production', 'your_secret_key_min_32_chars_long_random_string'];

function getSecret(): string | null {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32 || PLACEHOLDER_SECRETS.includes(secret)) return null;
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

// Vergelijkt zonder vroeg te stoppen, zodat de duur niets over de inhoud verraadt
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [hashA, hashB] = await Promise.all(
    [a, b].map(async (value) => new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))))
  );
  let difference = 0;
  for (let i = 0; i < hashA.length; i++) difference |= hashA[i] ^ hashB[i];
  return difference === 0;
}

export function isAdminAuthConfigured(): boolean {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(
    process.env.ADMIN_EMAIL && password && !PLACEHOLDER_SECRETS.includes(password) && getSecret()
  );
}

export async function checkAdminCredentials(email: string, password: string): Promise<boolean> {
  if (!isAdminAuthConfigured()) return false;
  const [emailOk, passwordOk] = await Promise.all([
    safeEqual(email.trim().toLowerCase(), process.env.ADMIN_EMAIL!.trim().toLowerCase()),
    safeEqual(password, process.env.ADMIN_PASSWORD!),
  ]);
  return emailOk && passwordOk;
}

export async function createSessionToken(email: string): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const payload = toBase64Url(
    encoder.encode(JSON.stringify({ email, exp: Date.now() + ADMIN_SESSION_SECONDS * 1000 }))
  );
  return `${payload}.${await sign(payload, secret)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<{ email: string } | null> {
  const secret = getSecret();
  if (!secret || !token) return null;
  const [payload, signature, ...rest] = token.split('.');
  if (!payload || !signature || rest.length > 0) return null;
  if (!(await safeEqual(signature, await sign(payload, secret)))) return null;
  try {
    const data = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (typeof data.email !== 'string' || typeof data.exp !== 'number' || data.exp < Date.now()) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}
