// Laat de build falen als de code naar een afbeelding in /public verwijst die niet bestaat.
// Vercel deployt alleen wat in git staat, dus een verplaatste foto valt anders pas live op.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['app', 'components', 'lib'];
const EXT = /\.(tsx?|jsx?|json|mdx?)$/;
const REF = /\/images\/[^'"`\s)]+?\.(?:jpe?g|png|webp|avif|gif|svg)/gi;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (EXT.test(name)) files.push(path);
  }
  return files;
}

const missing = [];
for (const file of ROOTS.filter(existsSync).flatMap((r) => walk(r))) {
  for (const ref of readFileSync(file, 'utf8').match(REF) ?? []) {
    if (!existsSync(join('public', ref))) missing.push(`${file}: ${ref}`);
  }
}

if (missing.length) {
  console.error(`Ontbrekende afbeeldingen (${missing.length}):\n  ${missing.join('\n  ')}`);
  process.exit(1);
}
console.log('Alle afbeeldingsverwijzingen bestaan.');
