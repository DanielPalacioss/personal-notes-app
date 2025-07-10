import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateDirectoryDto {
  @IsString({ message: 'The directory name must be string' })
  @IsNotEmpty({ message: 'The directory name cannot be empty' })
  @Length(3, 50, {
    message: 'The directory name must be between 3 and 50 characters',
  })
  directoryName: string;
}
