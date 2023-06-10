import { UploadMosaicDto } from './dto/upload-mosaic-dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MosaicRepository } from './mosaic.repository';
import { Mosaic } from './schemas/mosaic.schema';

@Injectable()
export class MosaicService {
  constructor(
    @InjectRepository(MosaicRepository)
    private mosaicRepository: MosaicRepository,
  ) {}

  UploadMosaic(
    uploadMosaicDto: UploadMosaicDto,
    userId: number,
  ): Promise<Mosaic> {
    return this.mosaicRepository.uploadMosaic(uploadMosaicDto, userId);
  }
}
