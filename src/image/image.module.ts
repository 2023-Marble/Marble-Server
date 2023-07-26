import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ImageRepository } from './image.repository';
import { UserModule } from 'src/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/configs/multer.options';
import { S3ClientModule } from 'src/configs/s3Client/s3Client.module';
import { S3ClientService } from 'src/configs/s3Client/s3Client.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [S3ClientModule],
      useFactory: multerOptionsFactory,
      inject: [S3ClientService],
    }),
    TypeOrmExModule.forCustomRepository([ImageRepository]),
    UserModule,
    S3ClientModule,
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
