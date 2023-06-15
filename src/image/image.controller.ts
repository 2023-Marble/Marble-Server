import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image-dto';
import { Image } from './schemas/image.schema';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('image')
@Controller('image')
@UseGuards(AuthGuard('jwt'))
export class ImageController {
  constructor(private imageService: ImageService) {}

  @ApiOperation({ summary: '얼굴 이미지 등록' })
  @ApiBody({ type: UploadImageDto })
  @Post()
  uploadImage(
    @Body() uploadImageDto: UploadImageDto,
    @Req() req,
  ): Promise<Image> {
    return this.imageService.UploadImage(uploadImageDto, req.user.userId);
  }

  @ApiOperation({ summary: '얼굴 이미지 삭제' })
  @Delete('/:imageId')
  deleteImage(@Param('imageId', ParseIntPipe) imageId: number): Promise<void> {
    return this.imageService.deleteImage(imageId);
  }
}
