/**
 * Logo Path Diagnostics
 * Logs the resolved path and existence of the Shoma logo
 */

import fs from 'fs';
import path from 'path';

export function logLogoDiagnostics() {
  // Expected paths
  const projectRoot = process.cwd();
  const publicDir = path.join(projectRoot, 'public');
  const logoPath = path.join(publicDir, 'shoma-logo.svg');

  console.log('\n' + '='.repeat(60));
  console.log('LOGO PATH DIAGNOSTICS');
  console.log('='.repeat(60));

  console.log(`\nProject root: ${projectRoot}`);
  console.log(`Public dir: ${publicDir}`);
  console.log(`Logo SVG path: ${logoPath}`);

  // Check if logo exists
  const logoExists = fs.existsSync(logoPath);
  console.log(`\nLogo file exists: ${logoExists ? 'YES' : 'NO'}`);

  if (logoExists) {
    const stats = fs.statSync(logoPath);
    console.log(`   File size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`   Modified: ${stats.mtime.toLocaleString()}`);

    // Read first 200 chars to confirm SVG format
    const content = fs.readFileSync(logoPath, 'utf-8');
    console.log(`   Format: ${content.startsWith('<svg') ? 'SVG' : 'Unknown'}`);
    console.log(`   Content length: ${content.length} characters`);
  } else {
    console.log(`   Logo not found at: ${logoPath}`);
    console.log(`   \n   Files in public directory:`);

    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      files.forEach(file => {
        const fullPath = path.join(publicDir, file);
        const isDir = fs.statSync(fullPath).isDirectory();
        console.log(`      ${isDir ? '[DIR]' : '[FILE]'} ${file}`);
      });
    } else {
      console.log(`      Public directory doesn't exist!`);
    }
  }

  // Check build output
  const buildDir = path.join(projectRoot, '.next');
  console.log(`\nBuild directory (.next): ${fs.existsSync(buildDir) ? 'EXISTS' : 'MISSING'}`);

  // Check static files in build
  const nextStaticDir = path.join(buildDir, 'static');
  if (fs.existsSync(nextStaticDir)) {
    const staticFiles = fs.readdirSync(nextStaticDir);
    console.log(`   Next.js static files: ${staticFiles.length} items`);
  }

  // Check public assets in build (if exists)
  const nextPublicDir = path.join(buildDir, 'public');
  if (fs.existsSync(nextPublicDir)) {
    console.log(`   Public assets copied to build`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  return {
    projectRoot,
    publicDir,
    logoPath,
    logoExists,
  };
}

// Export for server-side usage
export function getLogoUrl() {
  return '/shoma-logo.svg';
}
