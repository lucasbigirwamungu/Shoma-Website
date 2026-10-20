import { describe, expect, it } from 'vitest';
import { llmsFullTxt, llmsTxt } from '@/lib/llms-txt';

describe('llms.txt', () => {
  const txt = llmsTxt();

  it('follows the llmstxt.org structure', () => {
    const lines = txt.split('\n');
    expect(lines[0]).toBe('# Stichting Shoma');
    expect(lines.find((l) => l.startsWith('>'))).toBeTruthy();
    expect(txt).toMatch(/^## Pages$/m);
    expect(txt).toMatch(/^## Optional$/m);
    // Elke regel in een linklijst is "- [naam](url)" eventueel met ": notitie"
    const pageSection = txt.split('## Pages')[1].split('\n## ')[0];
    for (const line of pageSection.split('\n').filter((l) => l.startsWith('- '))) {
      expect(line).toMatch(/^- \[[^\]]+\]\(https?:\/\/[^)]+\)(: .+)?$/);
    }
  });

  it('tells agents when to use the charity and how to act', () => {
    expect(txt).toMatch(/^## When to use Stichting Shoma$/m);
    expect(txt).toMatch(/^## When not to use$/m);
    expect(txt).toContain('/doneren');
    expect(txt).toContain('Accept: text/markdown');
  });

  it('links developer resources', () => {
    expect(txt).toMatch(/^## Developer resources$/m);
    expect(txt).toContain('/mcp');
    expect(txt).toContain('/.well-known/mcp');
    expect(txt).toContain('/llms-full.txt');
  });

  it('bundles every page in llms-full.txt', () => {
    const full = llmsFullTxt();
    expect(full).toContain('# Over Stichting Shoma');
    expect(full).toContain('# Privacyverklaring');
  });
});
