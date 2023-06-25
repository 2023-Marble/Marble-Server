import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  GoogleSignUpResponseDto,
  GoogleSignInRequestDto,
} from './dto/auth.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AuthGoogleService {
  constructor(private httpService: HttpService) {}

  async getGoogleInfo(
    accessToken: GoogleSignInRequestDto,
  ): Promise<GoogleSignUpResponseDto> {
    try {
      return (
        await firstValueFrom(
          this.httpService
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
            .pipe(map((response) => [response.data, response.status])),
        )
      )[0];
    } catch (e) {
      throw new UnauthorizedException(e.response.data.msg, 'Google Token');
    }
  }
}
