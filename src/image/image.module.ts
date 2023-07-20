import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { ImageRepository } from './image.repository';
import { UserModule } from 'src/user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from 'src/configs/multer.options';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
    TypeOrmExModule.forCustomRepository([ImageRepository]),
    UserModule,
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
