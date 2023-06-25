import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import {
  GoogleSignUpResponseDto,
  GoogleSignInResponseDto,
  GoogleSignInRequestDto,
} from './dto/auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: '구글 로그인/회원가입',
    description:
      '최초 로그인 여부에 따라 로그인 또는 회원가입을 진행한다. 토큰 값을 리턴한다.',
  })
  @ApiBody({ type: GoogleSignInRequestDto })
  @Post('/google/signin')
  async googleSignin(
    @Body('accessToken') accessToken: GoogleSignInRequestDto,
  ): Promise<GoogleSignInResponseDto | GoogleSignUpResponseDto> {
    return await this.authService.validateGoogleUser(accessToken);
  }
}
