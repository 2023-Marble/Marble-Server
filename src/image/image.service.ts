import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { Image } from './schemas/image.schema';
import { S3ClientService } from 'src/configs/s3Client/s3Client.service';
import { DeleteObjectCommand, S3ServiceException } from '@aws-sdk/client-s3';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
    private s3ClientService: S3ClientService,
  ) {}

  uploadImage(file: Express.MulterS3.File, userId: number): Promise<Image> {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    return this.imageRepository.uploadImage(file.location, userId);
  }

  async updateImage(imageId: number, vector: string): Promise<Image> {
    const image = await this.imageRepository.findOneBy({ imageId: imageId });
    image.vector = vector;
    await this.imageRepository.save(image);
    return image;
  }

  async deleteImage(imageId: number): Promise<void> {
    const s3 = this.s3ClientService.s3();
    const image = await this.imageRepository.findOneBy({ imageId: imageId });
    if (!image) {
      throw new BadRequestException('해당 이미지가 존재하지 않습니다.');
    }
    const key = image.url.slice(50);
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
    const result = await this.imageRepository.delete(imageId);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Image with id ${imageId}`);
    }
  }
}
