import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { Image } from './schemas/image.schema';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  uploadImage(file: Express.MulterS3.File, userId: number): Promise<Image> {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    return this.imageRepository.uploadImage(file.location, userId);
  }

  async deleteImage(imageId: number): Promise<void> {
    const result = await this.imageRepository.delete(imageId);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Image with id ${imageId}`);
    }
  }
}
