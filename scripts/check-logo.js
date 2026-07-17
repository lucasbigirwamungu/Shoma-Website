#!/usr/bin/env node

/**
 * Check Logo Path and Build Output
 * Run: node scripts/check-logo.js
 */

const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');
const logoPath = path.join(publicDir, 'shoma-logo.svg');
const buildDir = path.join(projectRoot, '.next');

console.log('\n' + '═'.repeat(70));
console.log('🔍 LOGO PATH & BUILD OUTPUT VERIFICATION');
console.log('═'.repeat(70));

// 1. Logo source file
console.log('\n📍 SOURCE FILE:');
console.log(`   Path: ${logoPath}`);

const logoExists = fs.existsSync(logoPath);
if (logoExists) {
  const stats = fs.statSync(logoPath);
  const content = fs.readFileSync(logoPath, 'utf-8');

  console.log(`   ✅ Status: EXISTS`);
  console.log(`   📊 Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`   📝 Format: ${content.startsWith('<svg') ? 'SVG ✅' : 'Unknown ⚠️'}`);
  console.log(`   ⏰ Modified: ${stats.mtime.toLocaleString('nl-NL')}`);
  console.log(`   📏 Characters: ${content.length}`);
} else {
  console.log(`   ❌ Status: MISSING`);
  console.log(`\n   📂 Files in ${publicDir}:`);
  const files = fs.readdirSync(publicDir);
  files.forEach(f => console.log(`      • ${f}`));
}

// 2. Build output
console.log('\n🔨 BUILD OUTPUT:');
console.log(`   Path: ${buildDir}`);

if (fs.existsSync(buildDir)) {
  console.log(`   ✅ Status: BUILD EXISTS`);

  // Check public dir in build
  const publicInBuild = path.join(buildDir, 'public');
  if (fs.existsSync(publicInBuild)) {
    const publicFiles = fs.readdirSync(publicInBuild);
    console.log(`   📦 Public assets: ${publicFiles.length} files`);
    if (publicFiles.includes('shoma-logo.svg')) {
      console.log(`      ✅ Logo found in build output`);
    } else {
      console.log(`      ❌ Logo NOT in build output`);
    }
  } else {
    console.log(`   ⚠️  No public dir in build (expected for dev)`);
  }

  // Check static dir
  const staticDir = path.join(buildDir, 'static');
  if (fs.existsSync(staticDir)) {
    console.log(`   ✅ Static assets directory exists`);
  }
} else {
  console.log(`   ⚠️  No build found (run: npm run build)`);
}

// 3. Usage in components
console.log('\n🔗 USAGE IN COMPONENTS:');
const navbarPath = path.join(projectRoot, 'components', 'layout', 'Navbar.tsx');
if (fs.existsSync(navbarPath)) {
  const navbarContent = fs.readFileSync(navbarPath, 'utf-8');
  const logoUsage = navbarContent.includes('shoma-logo');
  console.log(`   Navbar.tsx: ${logoUsage ? '✅ Uses logo' : '❌ No logo reference'}`);
}

// 4. Summary
console.log('\n📋 SUMMARY:');
console.log(`   Source file: ${logoExists ? '✅' : '❌'}`);
console.log(`   Build output: ${fs.existsSync(buildDir) ? '✅' : '⚠️'}`);
console.log(`   Framework: Next.js 15 with App Router`);

console.log('\n' + '═'.repeat(70) + '\n');

// Exit with appropriate code
process.exit(logoExists ? 0 : 1);
