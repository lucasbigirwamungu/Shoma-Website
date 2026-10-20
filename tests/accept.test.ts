import { describe, expect, it } from 'vitest';
import { prefersMarkdown } from '@/lib/accept';

describe('prefersMarkdown', () => {
  it('accepts an explicit markdown request', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true);
    expect(prefersMarkdown('text/markdown, text/html;q=0.9')).toBe(true);
    expect(prefersMarkdown('text/html;q=0.5, text/markdown;q=0.8')).toBe(true);
  });

  it('keeps browsers and generic clients on HTML', () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown('*/*')).toBe(false);
    expect(prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')).toBe(false);
    expect(prefersMarkdown('text/html, text/markdown;q=0.5')).toBe(false);
  });

  it('ignores markdown with q=0', () => {
    expect(prefersMarkdown('text/markdown;q=0')).toBe(false);
  });
});
