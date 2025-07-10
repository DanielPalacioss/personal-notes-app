import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EntityValidatorService } from '../entity-validator/entity-validator.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, PrismaService, EntityValidatorService],
})
export class NoteModule {}
