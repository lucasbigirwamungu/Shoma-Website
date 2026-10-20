import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

const BASE = 'https://shoma.example';
const req = (path: string, headers: Record<string, string> = {}, method = 'GET') =>
  new NextRequest(new URL(path, BASE), { headers, method });

describe('markdown negotiation', () => {
  it('serves Markdown for the homepage when asked', async () => {
    const res = await middleware(req('/', { accept: 'text/markdown' }));
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(res.headers.get('vary')).toBe('Accept');
    expect(await res.text()).toMatch(/^# Stichting Shoma/);
  });

  it('passes HTML requests through with Vary: Accept', async () => {
    const res = await middleware(req('/', { accept: 'text/html' }));
    expect(res.headers.get('x-middleware-next')).toBe('1');
    expect(res.headers.get('vary')).toBe('Accept');
  });

  it('returns a Markdown 404 for unknown paths', async () => {
    const res = await middleware(req('/__probe', { accept: 'text/markdown' }));
    expect(res.status).toBe(404);
    expect(res.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(await res.text()).toContain('/llms.txt');
  });

  it('lets self-redirecting pages redirect first', async () => {
    const res = await middleware(req('/fotoalbums', { accept: 'text/markdown' }));
    expect(res.headers.get('x-middleware-next')).toBe('1');
  });

  it('sends no body for HEAD', async () => {
    const res = await middleware(req('/', { accept: 'text/markdown' }, 'HEAD'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('');
  });
});

describe('admin protection is unchanged', () => {
  it('redirects admin pages to login without a session', async () => {
    const res = await middleware(req('/admin', { accept: 'text/markdown' }));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe(`${BASE}/admin/login`);
    expect(res.headers.get('x-robots-tag')).toBe('noindex, nofollow');
  });

  it('returns 401 for admin APIs without a session', async () => {
    const res = await middleware(req('/api/admin/photos'));
    expect(res.status).toBe(401);
  });

  it('allows the login page', async () => {
    const res = await middleware(req('/admin/login'));
    expect(res.headers.get('x-middleware-next')).toBe('1');
  });
});
