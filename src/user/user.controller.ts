import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialDto } from './dto/user-credential.dto';
import { User } from './schemas/user.schema';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: AuthCredentialDto })
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.userService.signUp(authCredentialDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: AuthCredentialDto })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialDto);
  }

  @ApiOperation({ summary: '회원 정보 조회' })
  @Get()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req): Promise<User> {
    return req.user;
  }

  @ApiOperation({ summary: '회원 정보 수정' })
  @Patch()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  updateUserStatus(@Req() req, @Body('mosaic') mosaic: number): Promise<User> {
    return this.userService.updateUserStatus(req.user.userId, mosaic);
  }

  @ApiOperation({ summary: '회원 정보 삭제' })
  @Delete()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Req() req): Promise<void> {
    return this.userService.deleteUser(req.user.userId);
  }
}
