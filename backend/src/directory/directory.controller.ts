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
  async create(
    @Body() createDirectoryDto: CreateDirectoryDto,
    @Req() req: RequestWithUser,
  ) {
    const { directoryName } = await this.directoryService.create(
      createDirectoryDto,
      req.user.sub,
    );
    return { message: `Directory ${directoryName} created successfully` };
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.directoryService.findAll(req.user.sub);
  }

  @Get(':id')
  findById(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.directoryService.findById(id, req.user.sub);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
    @Req() req: RequestWithUser,
  ) {
    const { directoryName } = await this.directoryService.update(
      id,
      updateDirectoryDto,
      req.user.sub,
    );
    return { message: `Directory ${directoryName} updated successfully` };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const { directoryName } = await this.directoryService.remove(
      id,
      req.user.sub,
    );
    return { message: `Directory ${directoryName} deleted successfully` };
  }
}
