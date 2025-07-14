import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsString({ message: 'The title name must be string' })
  @IsNotEmpty({ message: 'The title name cannot be empty' })
  @Length(3, 25, {
    message: 'The title name must be between 3 and 25 characters',
  })
  title: string;

  @IsString({ message: 'The content name must be string' })
  @Length(0, 5000, {
    message: 'The content name must be between 0 and 5000 characters',
  })
  content: string;
}
