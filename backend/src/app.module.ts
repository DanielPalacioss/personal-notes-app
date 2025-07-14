import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';
import { DirectoryModule } from './directory/directory.module';
import { PrismaService } from './prisma/prisma.service';
import { EntityValidatorService } from './entity-validator/entity-validator.service';
import { AuthModule } from './auth/auth.module';
import { RoleValidatorService } from './role-validator/role-validator.service';
import { UserService } from './user/user.service';

@Module({
  imports: [NoteModule, UserModule, DirectoryModule, AuthModule],
  controllers: [],
  providers: [
    PrismaService,
    EntityValidatorService,
    RoleValidatorService,
    UserService,
  ],
})
export class AppModule {}
