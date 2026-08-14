import { NextRequest, NextResponse } from 'next/server';
import { uploadMultipleImages } from '@/lib/cloudinary';

/**
 * POST /api/upload-photos
 *
 * Accepts an array of base64-encoded images and uploads them to Cloudinary.
 * Returns an array of secure URLs that can be stored in booking metadata.
 *
 * Request body: { photos: string[], customerName: string }
 * Response: { success: true, urls: string[] } or { success: false, message: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { photos, customerName } = body as {
      photos: string[];
      customerName: string;
    };

    if (!photos || !Array.isArray(photos)) {
      return NextResponse.json(
        { success: false, message: 'No photos provided' },
        { status: 400 }
      );
    }

    if (photos.length > 5) {
      return NextResponse.json(
        { success: false, message: 'Maximum 5 photos allowed' },
        { status: 400 }
      );
    }

    if (!customerName || typeof customerName !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Customer name is required' },
        { status: 400 }
      );
    }

    // Upload all photos to Cloudinary
    const urls = await uploadMultipleImages(photos, customerName);

    console.log('[Upload Photos] Cloudinary URLs returned:', urls);

    return NextResponse.json({ success: true, urls });
  } catch (error) {
    console.error('[Upload Photos] Failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: `Upload failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}
