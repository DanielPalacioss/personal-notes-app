import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EntityValidatorService } from '../entity-validator/entity-validator.service';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { UserRole } from './enums/user-role';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private entityValidator: EntityValidatorService,
  ) {}

  async findOne(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      return await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          role: UserRole.USER,
        },
        select: { firstName: true },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // Error de clave única duplicada (por ejemplo, email o username ya existen)
          throw new ConflictException('Email or username already exists');
        }
      }
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

  async updatePassword(
    id: string,
    { newPassword, password }: UpdatePasswordDto,
  ) {
    const user = await this.prismaService.user.findFirst({
      where: { id },
      select: {
        password: true,
      },
    });
    if (!user) {
      throw new BadRequestException(`User with id: ${id} not exists`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect current password');
    }
    const encryptPassword = await bcrypt.hash(newPassword, 10);
    await this.prismaService.user.update({
      where: { id },
      data: { password: encryptPassword },
    });
  }

  async remove(id: string) {
    await this.entityValidator.ensureUserExists(id);
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
