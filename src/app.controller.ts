import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Mosaic } from './mosaic/schemas/mosaic.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  findAll(): Promise<Mosaic[]> {
    return this.appService.findAll();
  }
}
