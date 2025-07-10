import { Injectable } from '@nestjs/common';
import { CreateDirectoryDto } from '././dtos/create-directory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDirectoryDto } from '././dtos/update-directory.dto';
import { EntityValidatorService } from '../entity-validator/entity-validator.service';

@Injectable()
export class DirectoryService {
  constructor(
    private prismaService: PrismaService,
    private entityValidator: EntityValidatorService,
  ) {}

  async create(createDirectoryDto: CreateDirectoryDto, userId: string) {
    await this.entityValidator.ensureUserExists(userId);
    return this.prismaService.directory.create({
      data: { ...createDirectoryDto, userId },
      select: { id: true, directoryName: true, createdAt: true },
    });
  }

  findAll(userId: string) {
    return this.prismaService.directory.findMany({
      select: {
        id: true,
        directoryName: true,
        createdAt: true,
        updatedAt: true,
        notes: true,
      },
      where: { userId },
    });
  }

  async update(
    id: string,
    updateDirectoryDto: UpdateDirectoryDto,
    userId: string,
  ) {
    await this.entityValidator.ensureDirectoryExists(id, userId);
    return this.prismaService.directory.update({
      where: { id, userId },
      data: updateDirectoryDto,
      select: {
        directoryName: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.entityValidator.ensureDirectoryExists(id, userId);
    return this.prismaService.directory.delete({
      where: { id, userId },
      select: {
        directoryName: true,
      },
    });
  }
}
