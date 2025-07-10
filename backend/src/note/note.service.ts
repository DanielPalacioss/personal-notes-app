import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from '././dtos/create-note.dto';
import { UpdateNoteDto } from '././dtos/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EntityValidatorService } from '../entity-validator/entity-validator.service';

@Injectable()
export class NoteService {
  constructor(
    private prismaService: PrismaService,
    private entityValidator: EntityValidatorService,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string) {
    await this.entityValidator.ensureDirectoryExists(
      createNoteDto.directoryId,
      userId,
    );
    return this.prismaService.note.create({
      data: createNoteDto,
      select: { id: true, title: true, content: true, createdAt: true },
    });
  }

  async findAll(directoryId: string, userId: string) {
    await this.entityValidator.ensureDirectoryExists(directoryId, userId);
    return this.prismaService.note.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        createdAt: true,
      },
      where: { directoryId },
    });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.entityValidator.ensureNoteExists(id);
    return this.prismaService.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async remove(id: string) {
    await this.entityValidator.ensureNoteExists(id);
    return this.prismaService.note.delete({
      where: { id },
    });
  }
}
