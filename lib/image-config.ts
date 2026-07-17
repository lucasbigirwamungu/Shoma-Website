/**
 * Image Management Configuration
 * Supports: Local (file system), Supabase Storage, or Cloudinary
 */

export type ImageStorageType = 'local' | 'supabase' | 'cloudinary';

export interface ImageConfig {
  storage: ImageStorageType;
  local?: {
    basePath: string; // e.g., /public/images
  };
  supabase?: {
    bucket: string;
    baseUrl: string;
  };
  cloudinary?: {
    cloudName: string;
    apiKey: string;
  };
}

// Current configuration (set via environment)
export const imageConfig: ImageConfig = {
  storage: (process.env.NEXT_PUBLIC_IMAGE_STORAGE as ImageStorageType) || 'local',
  local: {
    basePath: '/images',
  },
  supabase: {
    bucket: process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'shoma-images',
    baseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shoma-images`,
  },
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
  },
};

/**
 * Get image URL based on storage type
 */
export function getImageUrl(
  filename: string,
  folder: 'projecten' | 'fotoalbums' | 'bestuur' | 'nieuws' = 'fotoalbums'
): string {
  const path = `${folder}/${filename}`;

  switch (imageConfig.storage) {
    case 'local':
      return `${imageConfig.local!.basePath}/${path}`;

    case 'supabase':
      return `${imageConfig.supabase!.baseUrl}/${path}`;

    case 'cloudinary':
      return `https://res.cloudinary.com/${imageConfig.cloudinary!.cloudName}/image/upload/shoma/${path}`;

    default:
      return `${imageConfig.local!.basePath}/${path}`;
  }
}

/**
 * Image categories for different parts of site
 */
export const imageFolders = {
  projecten: {
    name: 'projecten',
    label: 'Projecten',
    description: 'Project photos (water, energy, KEMPS)',
  },
  fotoalbums: {
    name: 'fotoalbums',
    label: 'Foto Albums',
    description: 'Photo albums (school, life, events)',
  },
  bestuur: {
    name: 'bestuur',
    label: 'Bestuur',
    description: 'Board member photos',
  },
  nieuws: {
    name: 'nieuws',
    label: 'Nieuws',
    description: 'News article images',
  },
};

/**
 * Image optimization presets
 */
export const imagePresets = {
  thumbnail: { width: 200, height: 200, quality: 80 },
  card: { width: 400, height: 300, quality: 85 },
  hero: { width: 1200, height: 500, quality: 90 },
  fullwidth: { width: 1200, height: 'auto', quality: 90 },
};

/**
 * Setup instructions for each storage type
 */
export const setupInstructions = {
  local: {
    title: 'Local Storage (Development)',
    steps: [
      '1. Create folders: mkdir -p public/images/{projecten,fotoalbums,bestuur,nieuws}',
      '2. Add your images to these folders',
      '3. Set env: NEXT_PUBLIC_IMAGE_STORAGE=local',
      'Pros: Fast, no external deps, great for dev',
      'Cons: Increases bundle size, limited scalability',
    ],
  },
  supabase: {
    title: 'Supabase Storage (Recommended)',
    steps: [
      '1. In Supabase: Storage → New Bucket → "shoma-images"',
      '2. Set bucket to public (RLS for public read)',
      '3. Create folders: projecten, fotoalbums, bestuur, nieuws',
      '4. Set env variables (see .env.local.example)',
      '5. Set: NEXT_PUBLIC_IMAGE_STORAGE=supabase',
      'Pros: Scalable, integrated with auth, CDN',
      'Pros: Same database you use for donations',
    ],
  },
  cloudinary: {
    title: 'Cloudinary (Professional)',
    steps: [
      '1. Sign up at cloudinary.com (free tier: 25GB)',
      '2. Copy Cloud Name, API Key, API Secret',
      '3. Set env variables',
      '4. Set: NEXT_PUBLIC_IMAGE_STORAGE=cloudinary',
      '5. Use Cloudinary upload widget for easy uploads',
      'Pros: Professional CDN, transforms, optimization',
      'Pros: Easy admin upload interface',
    ],
  },
};
