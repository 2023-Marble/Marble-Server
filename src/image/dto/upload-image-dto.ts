import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({
    example: 'url',
    description: '사진 URL',
  })
  @IsNotEmpty()
  url: string;
}
