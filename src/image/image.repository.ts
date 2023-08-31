import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Image } from './schemas/image.schema';
import { Repository } from 'typeorm';

@CustomRepository(Image)
export class ImageRepository extends Repository<Image> {
  async uploadImage(
    url: string,
    userId: number,
    vector: string,
  ): Promise<Image> {
    const image = this.create({
      url,
      userId,
      vector,
    });

    await this.save(image);
    return image;
  }
}
