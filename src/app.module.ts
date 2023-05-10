import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { MosaicController } from './mosaic/mosaic.controller';
import { ImageController } from './image/image.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, MosaicController, ImageController],
  providers: [AppService],
})
export class AppModule {}
