import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mosaic } from './mosaic/schemas/mosaic.schema';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Mosaic)
    private mosaicRepository: Repository<Mosaic>,
  ) {}

  getHello(): string {
    return 'Marble';
  }

  findAll(): Promise<Mosaic[]> {
    return this.mosaicRepository.find();
  }
}
