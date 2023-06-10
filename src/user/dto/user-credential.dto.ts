import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialDto {
  @ApiProperty({
    example: 'name',
    description: '이름',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: '이메일 주소',
  })
  @IsString()
  email: string;
}
