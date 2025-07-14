import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateDirectoryDto {
  @IsString({ message: 'The directory name must be string' })
  @IsNotEmpty({ message: 'The directory name cannot be empty' })
  @Length(3, 30, {
    message: 'The directory name must be between 3 and 30 characters',
  })
  directoryName: string;
}
