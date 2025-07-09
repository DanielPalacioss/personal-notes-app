import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, UseFilters,
} from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { GlobalExceptionFilter } from '../common/filters/global-exception.filter';

@UseFilters(GlobalExceptionFilter)
@Controller('directory')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Post()
  create(@Body() createDirectoryDto: CreateDirectoryDto) {
    return this.directoryService.create(createDirectoryDto);
  }

  @Get()
  findAll() {
    return this.directoryService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
  ) {
    return this.directoryService.update(id, updateDirectoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directoryService.remove(id);
  }
}
