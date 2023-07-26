import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MosaicRepository } from './mosaic.repository';
import { Mosaic } from './schemas/mosaic.schema';
import { S3ClientService } from 'src/configs/s3Client/s3Client.service';
import { DeleteObjectCommand, S3ServiceException } from '@aws-sdk/client-s3';

@Injectable()
export class MosaicService {
  constructor(
    @InjectRepository(MosaicRepository)
    private mosaicRepository: MosaicRepository,
    private s3ClientService: S3ClientService,
  ) {}

  uploadMosaic(file: Express.MulterS3.File, userId: number): Promise<Mosaic> {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    return this.mosaicRepository.uploadMosaic(file.location, userId);
  }

  async deleteMosaic(mosaicId: number): Promise<void> {
    const s3 = this.s3ClientService.s3();
    const mosaic = await this.mosaicRepository.findOneBy({
      mosaicId: mosaicId,
    });
    if (!mosaic) {
      throw new BadRequestException('해당 모자이크가 존재하지 않습니다.');
    }
    const key = mosaic.url.slice(50);
    const input = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: decodeURIComponent(key),
    };
    try {
      await s3.send(new DeleteObjectCommand(input));
    } catch (err) {
      throw new S3ServiceException({
        $fault: 'client',
        $metadata: { httpStatusCode: 400 },
        name: 'S3 Delete Error',
      });
    }
    const result = await this.mosaicRepository.delete(mosaicId);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Mosaic with id ${mosaicId}`);
    }
  }
}
