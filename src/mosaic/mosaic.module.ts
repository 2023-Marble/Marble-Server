import { Module } from '@nestjs/common';
import { MosaicService } from './mosaic.service';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { MosaicRepository } from './mosaic.repository';
import { UserModule } from 'src/user/user.module';
import { MosaicController } from './mosaic.controller';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([MosaicRepository]),
    UserModule,
  ],
  controllers: [MosaicController],
  providers: [MosaicService],
})
export class MosaicModule {}
