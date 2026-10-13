import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/admin-session';

// Alles onder /admin en /api/admin vereist een geldige sessie, behalve het inloggen zelf
const PUBLIC_PATHS = ['/admin/login', '/api/admin/auth/login', '/api/admin/auth/logout', '/api/admin/auth/me'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = PUBLIC_PATHS.includes(pathname)
    ? null
    : await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);

  let response: NextResponse;
  if (PUBLIC_PATHS.includes(pathname) || session) {
    response = NextResponse.next();
  } else if (pathname.startsWith('/api/')) {
    response = NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
  } else {
    response = NextResponse.redirect(new URL('/admin/login', request.url));
  }

  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
