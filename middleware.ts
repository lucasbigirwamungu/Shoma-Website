import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/admin-session';
import { prefersMarkdown } from '@/lib/accept';
import { getPageMarkdown, notFoundMarkdown, REDIRECTING_PATHS } from '@/lib/agent-markdown';

// Alles onder /admin en /api/admin vereist een geldige sessie, behalve het inloggen zelf
const PUBLIC_PATHS = ['/admin/login', '/api/admin/auth/login', '/api/admin/auth/logout', '/api/admin/auth/me'];

function isAdminPath(pathname: string) {
  return pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin/');
}

async function adminMiddleware(request: NextRequest) {
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

// Publieke pagina's: Markdown voor agents die erom vragen, anders gewoon de HTML-pagina
function markdownMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const wantsMarkdown =
    (request.method === 'GET' || request.method === 'HEAD') && prefersMarkdown(request.headers.get('accept'));

  if (!wantsMarkdown || REDIRECTING_PATHS.includes(pathname)) {
    const response = NextResponse.next();
    response.headers.set('Vary', 'Accept');
    return response;
  }

  const markdown = getPageMarkdown(pathname);
  const body = markdown ?? notFoundMarkdown(pathname);
  return new NextResponse(request.method === 'HEAD' ? null : body, {
    status: markdown ? 200 : 404,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      Link: `<${pathname}>; rel="alternate"; type="text/html"`,
      'X-Robots-Tag': 'noindex',
    },
  });
}

export async function middleware(request: NextRequest) {
  return isAdminPath(request.nextUrl.pathname) ? adminMiddleware(request) : markdownMiddleware(request);
}

export const config = {
  // Admin plus alle publieke pagina's; API's, Next-assets, MCP, .well-known en bestanden met een extensie niet
  matcher: ['/admin/:path*', '/api/admin/:path*', '/((?!api/|_next/|mcp|\\.well-known/|.*\\.[^/]+$).*)'],
};
