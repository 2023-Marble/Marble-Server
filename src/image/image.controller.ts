import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ImageService } from './image.service';
import { Image } from './schemas/image.schema';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto/upload-image-dto';

@ApiTags('image')
@Controller('image')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class ImageController {
  constructor(private imageService: ImageService) {}

  @ApiOperation({ summary: '얼굴 이미지 등록' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  uploadImage(
    @UploadedFile() file: Express.MulterS3.File,
    @Req() req,
  ): Promise<Image> {
    return this.imageService.uploadImage(file, req.user.userId);
  }

  @ApiOperation({ summary: '얼굴 이미지 벡터 정보 수정' })
  @ApiBody({
    schema: {
      properties: {
        vector: { type: 'string' },
      },
    },
  })
  @Patch('/:imageId')
  updateImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body('vector') vector: string,
  ): Promise<Image> {
    return this.imageService.updateImage(imageId, vector);
  }

  @ApiOperation({ summary: '얼굴 이미지 삭제' })
  @Delete('/:imageId')
  deleteImage(@Param('imageId', ParseIntPipe) imageId: number): Promise<void> {
    return this.imageService.deleteImage(imageId);
  }
}
