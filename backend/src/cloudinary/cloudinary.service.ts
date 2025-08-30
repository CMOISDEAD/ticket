/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async upload(fileBuffer: Buffer, folder?: string): Promise<string> {
    try {
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: folder || 'uploads',
              resource_type: 'image' as const,
              format: 'webp', // Convertir a WebP para mejor compresión
              quality: 'auto',
              fetch_format: 'auto',
            },
            (error, result) => {
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
              if (error) reject(error);
              else resolve(result as UploadApiResponse);
            },
          )
          .end(fileBuffer);
      });

      return result.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new InternalServerErrorException(
        'Error uploading image to cloud storage',
      );
    }
  }

  async remove(publicId: string): Promise<boolean> {
    try {
      if (!publicId) {
        throw new BadRequestException('Public ID is required');
      }

      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Error removing from Cloudinary:', error);
      throw new InternalServerErrorException(
        'Error removing image from cloud storage',
      );
    }
  }
}
