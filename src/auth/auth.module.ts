import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { AuthGoogleService } from './auth.google.service';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { JwtStrategy } from './security/jwt.strategy';
import { TypeOrmExModule } from 'src/typeorm-ex.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 60 * 60, // 유효시간: 1시간
      },
    }),
    UserModule,
    HttpModule,
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGoogleService, UserService, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
