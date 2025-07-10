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

  async create(createDirectoryDto: CreateDirectoryDto) {
    await this.entityValidator.ensureUserExists(createDirectoryDto.userId);
    return this.prismaService.directory.create({
      data: createDirectoryDto,
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

  async update(id: string, updateDirectoryDto: UpdateDirectoryDto) {
    await this.entityValidator.ensureDirectoryExists(id);
    return this.prismaService.directory.update({
      where: { id },
      data: updateDirectoryDto,
    });
  }

  async remove(id: string) {
    await this.entityValidator.ensureDirectoryExists(id);
    return this.prismaService.directory.delete({
      where: { id },
    });
  }
}
