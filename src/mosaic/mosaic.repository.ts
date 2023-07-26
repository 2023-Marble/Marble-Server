import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Mosaic } from './schemas/mosaic.schema';

@CustomRepository(Mosaic)
export class MosaicRepository extends Repository<Mosaic> {
  async uploadMosaic(url: string, userId: number): Promise<Mosaic> {
    const mosaic = this.create({
      url,
      userId,
      type: 'custom',
    });

    await this.save(mosaic);
    return mosaic;
  }
}
