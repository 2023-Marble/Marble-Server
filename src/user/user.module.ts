import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
