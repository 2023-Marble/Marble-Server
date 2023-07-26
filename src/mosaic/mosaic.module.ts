import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { MosaicService } from './mosaic.service';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { MosaicRepository } from './mosaic.repository';
import { UserModule } from 'src/user/user.module';
import { MosaicController } from './mosaic.controller';
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
    TypeOrmExModule.forCustomRepository([MosaicRepository]),
    UserModule,
    S3ClientModule,
  ],
  controllers: [MosaicController],
  providers: [MosaicService],
})
export class MosaicModule {}
