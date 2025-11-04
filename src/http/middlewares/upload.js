import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import crypto from 'crypto';
import 'dotenv/config';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Storage = multerS3({
  s3: s3Client,
  bucket: process.env.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    const randomBytes = crypto.randomBytes(16).toString('hex');
    const fileExtension = path.extname(file.originalname);
    const fileName = `${randomBytes}-${Date.now()}${fileExtension}`;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: s3Storage,
  limits: { fileSize: 1024 * 1024 * 20 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido.'));
    }
  },
});
