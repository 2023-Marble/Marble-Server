import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadMosaicDto {
  @ApiProperty({
    example: 'url',
    description: '사진 URL',
  })
  @IsNotEmpty()
  url: string;
}
