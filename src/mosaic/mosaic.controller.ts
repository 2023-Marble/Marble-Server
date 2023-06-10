import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MosaicService } from './mosaic.service';
import { UploadMosaicDto } from './dto/upload-mosaic-dto';
import { Mosaic } from './schemas/mosaic.schema';

@Controller('mosaic')
@UseGuards(AuthGuard('jwt'))
export class MosaicController {
  constructor(private mosaicService: MosaicService) {}

  @Post()
  uploadMosaic(
    @Body() uploadMosaicDto: UploadMosaicDto,
    @Req() req,
  ): Promise<Mosaic> {
    return this.mosaicService.UploadMosaic(uploadMosaicDto, req.user.userId);
  }
}
