import { IsNotEmpty } from 'class-validator';

export class UploadMosaicDto {
  @IsNotEmpty()
  url: string;
}
