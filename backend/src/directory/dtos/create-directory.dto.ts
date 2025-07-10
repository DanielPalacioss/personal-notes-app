import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateDirectoryDto {
  @IsString({ message: 'The directory name must be string' })
  @IsNotEmpty({ message: 'The directory name cannot be empty' })
  @Length(3, 15, {
    message: 'The directory name must be between 3 and 50 characters',
  })
  directoryName: string;

  @IsNotEmpty({ message: 'The user id cannot be empty' })
  @IsUUID(undefined, { message: 'The user id must be a valid UUID' })
  userId: string;
}
