import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from '././dtos/create-note.dto';
import { UpdateNoteDto } from '././dtos/update-note.dto';
import { GlobalExceptionFilter } from '../common/filters/global-exception.filter';

@UseFilters(GlobalExceptionFilter)
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @Get(':directoryId')
  findAll(@Param('directoryId') directoryId: string) {
    return this.noteService.findAll(directoryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
