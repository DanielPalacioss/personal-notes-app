import { Module } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryController } from './directory.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EntityValidatorService } from '../entity-validator/entity-validator.service';

@Module({
  controllers: [DirectoryController],
  providers: [DirectoryService, PrismaService, EntityValidatorService],
})
export class DirectoryModule {}
