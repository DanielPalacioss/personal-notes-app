import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateNoteDto {
  @IsString({ message: 'The title name must be string' })
  @IsNotEmpty({ message: 'The title name cannot be empty' })
  @Length(3, 25, {
    message: 'The title name must be between 3 and 50 characters',
  })
  title: string;

  @IsString({ message: 'The content name must be string' })
  @Length(0, 5000, {
    message: 'The content name must be between 3 and 5000 characters',
  })
  content: string;

  @IsNotEmpty({ message: 'The directory id cannot be empty' })
  @IsUUID(undefined, { message: 'The directory id must be a valid UUID' })
  directoryId: string;
}
