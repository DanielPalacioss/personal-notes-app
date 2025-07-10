import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EntityValidatorService } from '../entity-validator/entity-validator.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private entityValidator: EntityValidatorService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      return this.prismaService.user.create({
        data: { ...createUserDto, password: hashedPassword },
        select: { firstName: true },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // Error de clave única duplicada (por ejemplo, email o username ya existen)
          throw new ConflictException('Email or username already exists');
        }
      }
      // Otro error inesperado
      throw new InternalServerErrorException(
        'Unexpected error while creating user',
      );
    }
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
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });
  }

  async remove(id: string) {
    await this.entityValidator.ensureUserExists(id);
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
