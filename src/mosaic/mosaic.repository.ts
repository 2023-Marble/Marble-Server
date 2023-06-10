import { UploadMosaicDto } from './dto/upload-mosaic-dto';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Mosaic } from './schemas/mosaic.schema';

@CustomRepository(Mosaic)
export class MosaicRepository extends Repository<Mosaic> {
  async uploadMosaic(
    uploadMosaicDto: UploadMosaicDto,
    userId: number,
  ): Promise<Mosaic> {
    const { url } = uploadMosaicDto;

    const mosaic = this.create({
      url,
      userId,
      type: 'custom',
    });

    await this.save(mosaic);
    return mosaic;
  }
}
