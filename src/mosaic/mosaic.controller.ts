import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MosaicService } from './mosaic.service';
import { UploadMosaicDto } from './dto/upload-mosaic-dto';
import { Mosaic } from './schemas/mosaic.schema';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('mosaic')
@Controller('mosaic')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class MosaicController {
  constructor(private mosaicService: MosaicService) {}

  @ApiOperation({ summary: '커스텀 모자이크 등록' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadMosaicDto })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  uploadMosaic(
    @UploadedFile() file: Express.MulterS3.File,
    @Req() req,
  ): Promise<Mosaic> {
    return this.mosaicService.uploadMosaic(file, req.user.userId);
  }

  @ApiOperation({ summary: '커스텀 모자이크 삭제' })
  @Delete('/:mosaicId')
  deleteMosaic(
    @Param('mosaicId', ParseIntPipe) mosaicId: number,
  ): Promise<void> {
    return this.mosaicService.deleteMosaic(mosaicId);
  }
}
