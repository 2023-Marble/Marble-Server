import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialDto } from './dto/user-credential.dto';

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
}
