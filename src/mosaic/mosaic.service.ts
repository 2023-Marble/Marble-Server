import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MosaicRepository } from './mosaic.repository';
import { Mosaic } from './schemas/mosaic.schema';

@Injectable()
export class MosaicService {
  constructor(
    @InjectRepository(MosaicRepository)
    private mosaicRepository: MosaicRepository,
  ) {}

  uploadMosaic(file: Express.MulterS3.File, userId: number): Promise<Mosaic> {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    return this.mosaicRepository.uploadMosaic(file.location, userId);
  }

  async deleteMosaic(mosaicId: number): Promise<void> {
    const result = await this.mosaicRepository.delete(mosaicId);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Mosaic with id ${mosaicId}`);
    }
  }
}
