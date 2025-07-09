import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EntityValidatorService {
  constructor(private prismaService: PrismaService) {}

  async ensureDirectoryExists(id: string) {
    const directoryExists = await this.prismaService.directory.findUnique({
      where: { id: id },
    });
    if (!directoryExists) {
      throw new NotFoundException(`Directory with id ${id} not found`);
    }
  }

  async ensureUserExists(id: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!userExists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
