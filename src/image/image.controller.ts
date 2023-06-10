import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image-dto';
import { Image } from './schemas/image.schema';

@Controller('image')
@UseGuards(AuthGuard('jwt'))
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  uploadImage(
    @Body() uploadImageDto: UploadImageDto,
    @Req() req,
  ): Promise<Image> {
    return this.imageService.UploadImage(uploadImageDto, req.user.userId);
  }
}
