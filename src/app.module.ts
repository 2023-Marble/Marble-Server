import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { MosaicController } from './mosaic/mosaic.controller';
import { ImageController } from './image/image.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [
    AppController,
    UserController,
    MosaicController,
    ImageController,
  ],
  providers: [AppService],
})
export class AppModule {}
