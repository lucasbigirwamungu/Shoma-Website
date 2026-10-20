import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { getPageMarkdown, MARKDOWN_PAGES, notFoundMarkdown, REDIRECTING_PATHS } from '@/lib/agent-markdown';
import { siteUrl } from '@/lib/site-url';

function publicPageRoutes(dir = join(process.cwd(), 'app')): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return entry === 'admin' || entry === 'api' ? [] : publicPageRoutes(full);
    if (entry !== 'page.tsx') return [];
    const route = '/' + relative(join(process.cwd(), 'app'), dir).split('\\').join('/');
    return [route === '/' ? '/' : route.replace(/\/$/, '')];
  });
}

describe('agent markdown registry', () => {
  it('has Markdown for every public page (or the page redirects)', () => {
    for (const route of publicPageRoutes()) {
      const covered = route in MARKDOWN_PAGES || REDIRECTING_PATHS.includes(route);
      expect(covered, `missing markdown for ${route}`).toBe(true);
    }
  });

  it('covers every sitemap URL', () => {
    for (const { url } of sitemap()) {
      const path = url.slice(siteUrl.length) || '/';
      expect(getPageMarkdown(path), path).toBeTruthy();
    }
  });

  it('renders non-empty Markdown with a heading', () => {
    for (const path of Object.keys(MARKDOWN_PAGES)) {
      const md = getPageMarkdown(path)!;
      expect(md.startsWith('# '), path).toBe(true);
      expect(md.length, path).toBeGreaterThan(200);
    }
  });

  it('normalises trailing slashes and rejects unknown paths', () => {
    expect(getPageMarkdown('/over-ons/')).toBe(getPageMarkdown('/over-ons'));
    expect(getPageMarkdown('/bestaat-niet')).toBeNull();
  });

  it('explains a 404 and links to sitemap and llms.txt', () => {
    const md = notFoundMarkdown('/bestaat-niet');
    expect(md).toContain('/bestaat-niet');
    expect(md).toContain('/sitemap.xml');
    expect(md).toContain('/llms.txt');
    expect(md.length).toBeGreaterThan(20);
  });
});
