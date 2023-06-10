import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.userService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(authCredentialDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req) {
    return req.user;
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateUserStatus(@Req() req, @Body('mosaic') mosaic: number): Promise<User> {
    return this.userService.updateUserStatus(req.user.userId, mosaic);
  }
}
