import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { CreateDirectoryDto } from './dtos/create-directory.dto';
import { UpdateDirectoryDto } from './dtos/update-directory.dto';
import { GlobalExceptionFilter } from '../common/filters/global-exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../common/interfaces/auth-interfaces';

@UseGuards(JwtAuthGuard)
@UseFilters(GlobalExceptionFilter)
@Controller('directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Post()
  create(
    @Body() createDirectoryDto: CreateDirectoryDto,
    @Req() req: RequestWithUser,
  ) {
    return this.directoryService.create(createDirectoryDto, req.user.sub);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.directoryService.findAll(req.user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
    @Req() req: RequestWithUser,
  ) {
    return this.directoryService.update(id, updateDirectoryDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.directoryService.remove(id, req.user.sub);
  }
}
