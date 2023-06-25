import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from './configs/typeorm.config';
import { Mosaic } from './mosaic/schemas/mosaic.schema';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { MosaicModule } from './mosaic/mosaic.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([Mosaic]),
    UserModule,
    ImageModule,
    MosaicModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
