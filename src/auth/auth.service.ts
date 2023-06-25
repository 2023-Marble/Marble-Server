import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { AuthGoogleService } from './auth.google.service';
import {
  GoogleSignUpResponseDto,
  GoogleSignInRequestDto,
  GoogleSignInResponseDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authGoogleService: AuthGoogleService,
  ) {}

  async validateGoogleUser(
    accessToken: GoogleSignInRequestDto,
  ): Promise<GoogleSignInResponseDto | GoogleSignUpResponseDto> {
    const googleInfo = await this.authGoogleService.getGoogleInfo(accessToken);
    const name = googleInfo.name;
    const email = googleInfo.email;
    const userOrNone = await this.userService.getUser(email);
    const payload = { email };

    if (userOrNone) {
      return new GoogleSignInResponseDto(this.jwtService.sign(payload));
    } else {
      await this.userService.signUp({ name, email });
      return new GoogleSignUpResponseDto(
        await this.jwtService.sign(payload),
        googleInfo,
      );
    }
  }
}
