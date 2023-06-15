import { UploadMosaicDto } from './dto/upload-mosaic-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteMosaic(mosaicId: number): Promise<void> {
    const result = await this.mosaicRepository.delete(mosaicId);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Mosaic with id ${mosaicId}`);
    }
  }
}
