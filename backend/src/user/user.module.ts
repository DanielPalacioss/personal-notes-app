import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EntityValidatorService } from '../entity-validator/entity-validator.service';
import { RoleValidatorService } from '../role-validator/role-validator.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    EntityValidatorService,
    RoleValidatorService,
  ],
})
export class UserModule {}
