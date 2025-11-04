import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import 'dotenv/config';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const URL_EXPIRATION_SECONDS = 3600;

export class S3Service {
  static async getPresignedUrl(key) {
    if (!key) {
      return null;
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    try {
      const url = await getSignedUrl(s3Client, command, {
        expiresIn: URL_EXPIRATION_SECONDS,
      });
      return url;
    } catch (error) {
      console.error(`Erro ao gerar URL para a key ${key}:`, error);
      return null;
    }
  }

  static async deleteFile(key) {
    if (!key) {
      return;
    }

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    try {
      await s3Client.send(command);
      console.log(`Arquivo deletado do S3: ${key}`);
    } catch (error) {
      console.error(`Erro ao deletar arquivo ${key}:`, error);
    }
  }

  static async processListingImages(listing) {
    if (!listing.images || listing.images.length === 0) {
      return listing;
    }

    const listingObject = listing.toJSON ? listing.toJSON() : { ...listing };

    const presignedImageObjects = await Promise.all(
      listingObject.images.map(async (key) => {
        const url = await S3Service.getPresignedUrl(key);
        if (!url) return null;
        return {
          key: key,
          url: url,
        };
      }),
    );

    listingObject.images = presignedImageObjects.filter((img) => img !== null);

    return listingObject;
  }
}
