// Content negotiation: geeft Markdown alleen terug als de client daar expliciet om vraagt
// en het minstens zo hoog waardeert als HTML. Browsers sturen nooit text/markdown mee.

function qualityOf(accept: string, type: string): number {
  let best = -1;
  for (const part of accept.split(',')) {
    const [mediaRange, ...params] = part.trim().toLowerCase().split(';');
    if (mediaRange.trim() !== type) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
    const value = q ? Number.parseFloat(q.slice(2)) : 1;
    best = Math.max(best, Number.isNaN(value) ? 0 : value);
  }
  return best;
}

export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;
  const markdown = qualityOf(accept, 'text/markdown');
  if (markdown <= 0) return false;
  return markdown >= qualityOf(accept, 'text/html');
}
