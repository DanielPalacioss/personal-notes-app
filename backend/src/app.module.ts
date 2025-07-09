import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';
import { DirectoryModule } from './directory/directory.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [NoteModule, UserModule, DirectoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
