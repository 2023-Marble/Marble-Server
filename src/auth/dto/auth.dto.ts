import { ApiProperty } from '@nestjs/swagger';
import {
  GoogleSignInRequest,
  GoogleSignInResponse,
  GoogleUserInformation,
} from './auth.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleSignInRequestDto implements GoogleSignInRequest {
  @ApiProperty({ description: '구글 Access Token 전달' })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

export class GoogleSignInResponseDto implements GoogleSignInResponse {
  @ApiProperty({ description: '구글 로그인 요청 후 JWT 토큰 전달' })
  @IsString()
  token: string;

  constructor(token) {
    this.token = token;
  }
}

export class GoogleSignUpResponseDto implements GoogleUserInformation {
  constructor(token, value?) {
    this.token = token;
    this.id = value.id;
    this.email = value.email;
    this.verified_email = value.verified_email;
    this.name = value.name;
    this.given_name = value.given_name;
    this.family_name = value.family_name;
    this.picture = value.picture;
    this.locale = value.locale;
  }

  token: string;
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
