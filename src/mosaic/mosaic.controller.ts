import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MosaicService } from './mosaic.service';
import { UploadMosaicDto } from './dto/upload-mosaic-dto';
import { Mosaic } from './schemas/mosaic.schema';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('mosaic')
@Controller('mosaic')
@UseGuards(AuthGuard('jwt'))
export class MosaicController {
  constructor(private mosaicService: MosaicService) {}

  @ApiOperation({ summary: '커스텀 모자이크 등록' })
  @ApiBody({ type: UploadMosaicDto })
  @Post()
  uploadMosaic(
    @Body() uploadMosaicDto: UploadMosaicDto,
    @Req() req,
  ): Promise<Mosaic> {
    return this.mosaicService.UploadMosaic(uploadMosaicDto, req.user.userId);
  }
}
