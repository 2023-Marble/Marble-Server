import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({
    type: 'file',
    description: '사진 파일',
  })
  @IsNotEmpty()
  file: Express.MulterS3.File;
}
