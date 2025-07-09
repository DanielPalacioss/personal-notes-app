import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [NoteModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
