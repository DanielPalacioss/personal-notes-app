import { Module } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { DirectoryController } from './directory.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DirectoryController],
  providers: [DirectoryService, PrismaService],
})
export class DirectoryModule {}
