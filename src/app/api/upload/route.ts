import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const urls: Record<string, string> = {};

    for (const [key, file] of formData.entries()) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const dataURI = `data:${file.type};base64,${buffer.toString('base64')}`;
        
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'user-documents',
          resource_type: 'auto',
        });

        urls[key] = result.secure_url;
      }
    }

    return NextResponse.json({ success: true, urls });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload files' },
      { status: 500 }
    );
  }
}
