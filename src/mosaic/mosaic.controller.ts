import { AuthGuard } from '@nestjs/passport';
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
import { MosaicService } from './mosaic.service';
import { UploadMosaicDto } from './dto/upload-mosaic-dto';
import { Mosaic } from './schemas/mosaic.schema';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('mosaic')
@Controller('mosaic')
@ApiBearerAuth('access-token')
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

  @ApiOperation({ summary: '커스텀 모자이크 삭제' })
  @Delete('/:mosaicId')
  deleteMosaic(
    @Param('mosaicId', ParseIntPipe) mosaicId: number,
  ): Promise<void> {
    return this.mosaicService.deleteMosaic(mosaicId);
  }
}
