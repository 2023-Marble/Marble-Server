import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3ClientService {
  constructor() {}

  s3() {
    const s3Client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    return s3Client;
  }
}
