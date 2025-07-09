import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';
import { DirectoryModule } from './directory/directory.module';
import { PrismaService } from './prisma/prisma.service';
import { EntityValidatorService } from './entity-validator/entity-validator.service';

@Module({
  imports: [NoteModule, UserModule, DirectoryModule],
  controllers: [],
  providers: [PrismaService, EntityValidatorService],
})
export class AppModule {}
