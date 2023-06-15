import { UploadImageDto } from './dto/upload-image-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { Image } from './schemas/image.schema';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  UploadImage(uploadImageDto: UploadImageDto, userId: number): Promise<Image> {
    return this.imageRepository.uploadImage(uploadImageDto, userId);
  }

  async deleteImage(imageId: number): Promise<void> {
    const result = await this.imageRepository.delete(imageId);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Image with id ${imageId}`);
    }
  }
}
