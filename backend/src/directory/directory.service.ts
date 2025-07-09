import { Injectable } from '@nestjs/common';
import { CreateDirectoryDto } from './dto/create-directory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Injectable()
export class DirectoryService {
  constructor(private prismaService: PrismaService) {}

  create(createDirectoryDto: CreateDirectoryDto) {
    return this.prismaService.directory.create({
      data: createDirectoryDto,
    });
  }

  findAll() {
    return this.prismaService.directory.findMany({
      select: {
        id: true,
        directoryName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  update(id: string, updateDirectoryDto: UpdateDirectoryDto) {
    return this.prismaService.directory.update({
      where: { id },
      data: updateDirectoryDto,
    });
  }

  remove(id: string) {
    return this.prismaService.directory.delete({
      where: { id },
    });
  }
}
