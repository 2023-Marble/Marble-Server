import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MosaicController } from './mosaic/mosaic.controller';
import { ImageController } from './image/image.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './configs/typeorm.config';
import { Mosaic } from './mosaic/schemas/mosaic.schema';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([Mosaic]),
    UserModule,
  ],
  controllers: [AppController, MosaicController, ImageController],
  providers: [AppService],
})
export class AppModule {}
