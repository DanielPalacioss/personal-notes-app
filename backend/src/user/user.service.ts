import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EntityValidatorService } from '../entity-validator/entity-validator.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private entityValidator: EntityValidatorService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
      select: { firstName: true },
    });
  }

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        role: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.entityValidator.ensureUserExists(id);
    return this.prismaService.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: string) {
    await this.entityValidator.ensureUserExists(id);
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
