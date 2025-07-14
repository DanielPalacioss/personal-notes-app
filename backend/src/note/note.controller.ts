import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { GlobalExceptionFilter } from '../common/filters/global-exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from '../common/interfaces/auth-interfaces';

@UseGuards(JwtAuthGuard)
@UseFilters(GlobalExceptionFilter)
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @Req() req: RequestWithUser,
  ) {
    const { title } = await this.noteService.create(
      createNoteDto,
      req.user.sub,
    );
    return { message: `Note ${title} created successfully` };
  }

  @Get(':directoryId/:id')
  findById(
    @Param('directoryId') directoryId: string,
    @Param('id') id: string,
    @Req() req: RequestWithUser,
  ) {
    return this.noteService.findById(directoryId, id, req.user.sub);
  }

  @Get(':directoryId')
  findAll(
    @Param('directoryId') directoryId: string,
    @Req() req: RequestWithUser,
  ) {
    return this.noteService.findAll(directoryId, req.user.sub);
  }

  @Patch(':id/:userId')
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req: RequestWithUser,
  ) {
    if (req.user.sub !== userId) {
      throw new UnauthorizedException('Not authorized');
    }
    const { title } = await this.noteService.update(id, updateNoteDto);
    return { message: `Note ${title} updated successfully` };
  }

  @Delete(':id/:userId')
  async remove(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Req() req: RequestWithUser,
  ) {
    if (req.user.sub !== userId) {
      throw new UnauthorizedException('Not authorized');
    }
    const { title } = await this.noteService.remove(id);
    return { message: `Note ${title} deleted successfully` };
  }
}
