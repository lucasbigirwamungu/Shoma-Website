import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { imageConfig, getImageUrl } from '@/lib/image-config';
import { v4 as uuidv4 } from 'uuid';
import { isSafeImageFilename, isSafeImageFolder, requireAdminAuth } from '@/lib/admin-auth';

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAdminAuth(request, 'upload:images');
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') as string) || 'fotoalbums';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Geen bestand meegestuurd' }, { status: 400 });
    }

    // Alleen de naam zelf, zonder pad, en alleen veilige tekens
    const safeName = file.name.split(/[\\/]/).pop()!.replace(/[^a-z0-9._-]+/gi, '-');
    const filename = `${uuidv4()}-${Date.now()}-${safeName}`;

    if (!isSafeImageFolder(folder) || !isSafeImageFilename(filename) || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Ongeldig bestand of ongeldige map' }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'Het bestand is groter dan 10 MB' }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();

    switch (imageConfig.storage) {
      case 'local':
        return handleLocalStorage(bytes, filename, folder);

      case 'supabase':
        return handleSupabaseStorage(bytes, filename, folder);

      case 'cloudinary':
        return handleCloudinaryStorage(bytes, filename, folder);

      default:
        return handleLocalStorage(bytes, filename, folder);
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Local storage handler
async function handleLocalStorage(
  bytes: ArrayBuffer,
  filename: string,
  folder: string
): Promise<NextResponse> {
  try {
    const uploadDir = join(process.cwd(), 'public', 'images', folder);
    await mkdir(uploadDir, { recursive: true });

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, Buffer.from(bytes));

    const url = getImageUrl(filename, folder as any);

    return NextResponse.json({ filename, url, storage: 'local' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Local storage failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Supabase storage handler
async function handleSupabaseStorage(
  bytes: ArrayBuffer,
  filename: string,
  folder: string
): Promise<NextResponse> {
  try {
    const { createClient } = await import('@supabase/supabase-js');

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const filePath = `${folder}/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from('shoma-images')
      .upload(filePath, bytes, {
        contentType: 'image/*',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: 'Supabase upload failed', details: uploadError.message },
        { status: 500 }
      );
    }

    const url = getImageUrl(filename, folder as any);

    return NextResponse.json({ filename, url, storage: 'supabase' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Supabase storage failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Cloudinary storage handler
async function handleCloudinaryHandler(
  bytes: ArrayBuffer,
  filename: string,
  folder: string
): Promise<NextResponse> {
  try {
    // Convert ArrayBuffer to base64 for Cloudinary
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;

    const params = new URLSearchParams();
    params.append('file', dataUrl);
    params.append('folder', `shoma/${folder}`);
    params.append('resource_type', 'auto');
    params.append('api_key', process.env.CLOUDINARY_API_KEY || '');
    params.append('timestamp', Math.floor(Date.now() / 1000).toString());

    const response = await fetch('https://api.cloudinary.com/v1_1/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Cloudinary upload failed', status: response.status },
        { status: 500 }
      );
    }

    const data = (await response.json()) as any;
    const url = data.secure_url;

    return NextResponse.json({ filename, url, storage: 'cloudinary' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Cloudinary storage failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Alias for Cloudinary
const handleCloudinaryStorage = handleCloudinaryHandler;
