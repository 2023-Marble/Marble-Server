import { S3Client } from '@aws-sdk/client-s3';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multerS3 from 'multer-s3';
import path from 'path';

export const multerOptionsFactory = (): MulterOptions => {
  return {
    storage: multerS3({
      s3: new S3Client({
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      }),
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(req, file, callback) {
        const ext = path.extname(file.originalname); // 파일 확장자
        const baseName = path.basename(file.originalname, ext); // 확장자 제외한 파일 이름
        const fileName = `${baseName}-${Date.now()}${ext}`;
        callback(null, fileName);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};
