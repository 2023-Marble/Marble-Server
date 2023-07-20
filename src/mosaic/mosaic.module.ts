import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { MosaicService } from './mosaic.service';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { MosaicRepository } from './mosaic.repository';
import { UserModule } from 'src/user/user.module';
import { MosaicController } from './mosaic.controller';
import { multerOptionsFactory } from 'src/configs/multer.options';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
    TypeOrmExModule.forCustomRepository([MosaicRepository]),
    UserModule,
  ],
  controllers: [MosaicController],
  providers: [MosaicService],
})
export class MosaicModule {}
