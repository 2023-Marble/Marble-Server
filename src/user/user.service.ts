import { AuthCredentialDto } from './dto/user-credential.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { name, email } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ email: email });

    if (user) {
      // 유저 토큰 생성 (Secret + Payload)
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Login Failed');
    }
  }

  async getUser(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async updateUserStatus(userId: number, mosaic: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId: userId });
    user.mosaic = mosaic;
    await this.userRepository.save(user);
    return user;
  }
}
