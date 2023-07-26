import { Module } from '@nestjs/common';
import { S3ClientService } from './s3Client.service';

@Module({
  providers: [S3ClientService],
  exports: [S3ClientService],
})
export class S3ClientModule {}
