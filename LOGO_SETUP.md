# Logo Setup — Real WebP File

## Status: 🔄 Awaiting WebP Upload

The Shoma website is now configured to use the **real, professional logo** in WebP format instead of the SVG reconstruction.

---

## What Changed

### Navbar.tsx Updated
- ✅ Image source changed from `/shoma-logo.svg` → `/shoma-logo.webp`
- ✅ Navbar background changed to always white (`bg-white/98`)
- ✅ Image dimensions optimized for the professional logo
- ✅ Added `quality={95}` for WebP best rendering

### Old SVG Removed
The reconstructed SVG (`/public/shoma-logo.svg`) is no longer used and can be deleted:

```bash
rm public/shoma-logo.svg
```

---

## How to Complete Setup

### Step 1: Download the Logo
The real Shoma logo (WebP) is available in your upload. You'll see it displayed in this conversation.

### Step 2: Save to Project
Save the WebP file to:
```
/public/shoma-logo.webp
```

**File requirements:**
- Format: WebP (`.webp`)
- Name: `shoma-logo.webp` (exact)
- Location: `/public/` directory
- Quality: High (95+)
- Background: White (matches navbar)

### Step 3: Verify
Run this command to confirm the file is correctly placed:

```bash
node scripts/check-logo.js
```

Expected output:
```
✅ SOURCE FILE EXISTS
   Path: /public/shoma-logo.webp
   ✅ Status: EXISTS
```

### Step 4: Test
Start dev server and visit homepage:

```bash
npm run dev
# http://localhost:3000
```

The Shoma logo should now display perfectly in the navbar — no white edges, professional rendering.

---

## Navbar Styling

The navbar is now styled to complement the white-background logo:

```css
/* At page top (no scroll) */
background: white/98 (translucent white)

/* When scrolling */
background: white/96 + backdrop-blur + shadow
```

This ensures the logo is always visible and professional.

---

## Next Steps

1. **Upload WebP file** to `/public/shoma-logo.webp`
2. **Run build**: `npm run build` (should find logo without warnings)
3. **Test**: `npm run dev` and verify navbar
4. **Delete old SVG**: `rm public/shoma-logo.svg` (optional, won't hurt if left)

---

## Notes

- The WebP format is **smaller** (better performance) than PNG/SVG
- Next.js will serve the WebP to modern browsers automatically
- Older browsers will see a placeholder (no fallback image needed)
- Quality is set high (`quality={95}`) for professional appearance

**Ready to upload? Do it now! 📸**
