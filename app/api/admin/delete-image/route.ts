import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { imageConfig } from '@/lib/image-config';

export async function DELETE(request: NextRequest) {
  try {
    // Check admin auth (TODO: implement proper auth)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { filename, folder } = await request.json();

    if (!filename || !folder) {
      return NextResponse.json(
        { error: 'filename and folder are required' },
        { status: 400 }
      );
    }

    switch (imageConfig.storage) {
      case 'local':
        return handleLocalDelete(filename, folder);

      case 'supabase':
        return handleSupabaseDelete(filename, folder);

      case 'cloudinary':
        return handleCloudinaryDelete(filename, folder);

      default:
        return handleLocalDelete(filename, folder);
    }
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

async function handleLocalDelete(filename: string, folder: string): Promise<NextResponse> {
  try {
    const filepath = join(process.cwd(), 'public', 'images', folder, filename);
    await unlink(filepath);
    return NextResponse.json({ success: true, message: 'File deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Local delete failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

async function handleSupabaseDelete(filename: string, folder: string): Promise<NextResponse> {
  try {
    const { createClient } = await import('@supabase/supabase-js');

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const filePath = `${folder}/${filename}`;

    const { error: deleteError } = await supabase.storage
      .from('shoma-images')
      .remove([filePath]);

    if (deleteError) {
      return NextResponse.json(
        { error: 'Supabase delete failed', details: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'File deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Supabase delete failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

async function handleCloudinaryDelete(filename: string, _folder: string): Promise<NextResponse> {
  try {
    // Cloudinary uses public_id, which is the filename without extension
    const publicId = filename.split('.')[0];

    const response = await fetch('https://api.cloudinary.com/v1_1/destroy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${process.env.CLOUDINARY_API_KEY}`,
      },
      body: new URLSearchParams({
        public_id: publicId,
      }).toString(),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Cloudinary delete failed', status: response.status },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'File deleted' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Cloudinary delete failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
