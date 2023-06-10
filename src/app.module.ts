import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MosaicController } from './mosaic/mosaic.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './configs/typeorm.config';
import { Mosaic } from './mosaic/schemas/mosaic.schema';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([Mosaic]),
    UserModule,
    ImageModule,
  ],
  controllers: [AppController, MosaicController],
  providers: [AppService],
})
export class AppModule {}
