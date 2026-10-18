// Laat de build falen als de site verwijst naar een bestand in /public dat er op Vercel niet is.
// Vercel deployt alleen wat in git staat en draait op Linux, waar hoofdletters tellen
// (foto.JPG is daar een ander bestand dan foto.jpg). Op een Mac valt zo'n fout lokaal niet op.
//
// Gecontroleerd worden:
// - elk letterlijk pad naar een bestand in /public in app/, components/ en lib/
//   (foto's, logo's, pdf's in /documenten en /jaarrekeningen)
// - elke foto uit lib/fotoalbums.json (/images/fotoalbums/<folder>/<file>)
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, relative, sep } from 'node:path';

const SOURCE_ROOTS = ['app', 'components', 'lib'];
const SOURCE_EXT = /\.(tsx?|jsx?|json|mdx?|css)$/;
const ASSET_EXT = 'jpe?g|png|webp|avif|gif|svg|ico|pdf|mp4|webm';
const REF = new RegExp(`['"\`(]/([^'"\`\\s()?#]+?\\.(?:${ASSET_EXT}))['"\`)?#]`, 'gi');

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

const toPosix = (p) => p.split(sep).join('/');

// Bestandsnamen exact zoals ze op schijf staan, dus hoofdlettergevoelig, ook op macOS
const onDisk = new Set(walk('public').map((f) => toPosix(relative('public', f))));

// Lokaal ook controleren of het bestand in git staat; op Vercel is er geen .git, dan is de schijf de waarheid
let inGit = null;
try {
  const out = execSync('git ls-files -z public', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  inGit = new Set(out.split('\0').filter(Boolean).map((f) => f.replace(/^public\//, '')));
  if (inGit.size === 0) inGit = null;
} catch {
  inGit = null;
}

const refs = []; // { from, path }

for (const file of SOURCE_ROOTS.flatMap((r) => walk(r)).filter((f) => SOURCE_EXT.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const [, path] of text.matchAll(REF)) {
    // Alleen paden die in een bestaande map of als bestand in /public horen, geen routes of externe url's
    const top = path.split('/')[0];
    const lowerTop = top.toLowerCase();
    if (![...onDisk].some((p) => p.split('/')[0].toLowerCase() === lowerTop)) continue;
    refs.push({ from: file, path: decodeURI(path) });
  }
}

const albums = JSON.parse(readFileSync('lib/fotoalbums.json', 'utf8'));
for (const album of albums) {
  for (const photo of album.photos ?? []) {
    refs.push({ from: `lib/fotoalbums.json (${album.id})`, path: `images/fotoalbums/${album.folder}/${photo.file}` });
  }
}

const lowerIndex = new Map([...onDisk].map((p) => [p.toLowerCase(), p]));
const problems = [];

for (const { from, path } of refs) {
  if (!onDisk.has(path)) {
    const caseMatch = lowerIndex.get(path.toLowerCase());
    problems.push(
      caseMatch
        ? `${from}: /${path}\n      hoofdletters kloppen niet, het bestand heet /${caseMatch}`
        : `${from}: /${path}\n      bestand bestaat niet`,
    );
  } else if (inGit && !inGit.has(path)) {
    problems.push(`${from}: /${path}\n      staat niet in git (git add vergeten), dus ontbreekt op Vercel`);
  }
}

if (problems.length) {
  console.error(`\n${problems.length} verwijzing(en) naar ontbrekende bestanden:\n\n  ${problems.join('\n  ')}\n`);
  process.exit(1);
}

console.log(`Alle ${refs.length} verwijzingen naar bestanden in /public kloppen.`);
