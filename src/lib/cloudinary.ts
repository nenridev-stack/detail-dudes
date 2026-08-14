import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Upload a base64 image to Cloudinary.
 * Images are stored in a folder structure: bookings/{customerName}/{timestamp}
 * Returns the secure URL and metadata.
 */
export async function uploadImageToCloudinary(
  base64Data: string,
  options: {
    folder?: string;
    customerName?: string;
    index?: number;
  } = {}
): Promise<CloudinaryUploadResult> {
  const { folder = 'bookings', customerName = 'customer', index = 0 } = options;

  // Clean customer name for folder path
  const cleanName = customerName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  const timestamp = Date.now();
  const uploadFolder = `${folder}/${cleanName}`;

  const result = await cloudinary.uploader.upload(base64Data, {
    folder: uploadFolder,
    public_id: `photo_${index + 1}_${timestamp}`,
    resource_type: 'image',
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

/**
 * Upload multiple base64 images to Cloudinary in parallel.
 * Returns an array of secure URLs.
 */
export async function uploadMultipleImages(
  base64Images: string[],
  customerName: string
): Promise<string[]> {
  if (base64Images.length === 0) return [];

  const uploadPromises = base64Images.map((base64, index) =>
    uploadImageToCloudinary(base64, {
      folder: 'bookings',
      customerName,
      index,
    })
  );

  const results = await Promise.all(uploadPromises);
  return results.map((r) => r.url);
}

export default cloudinary;
