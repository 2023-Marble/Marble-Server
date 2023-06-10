import { UploadImageDto } from './dto/upload-image-dto';
import { Injectable } from '@nestjs/common';
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
}
