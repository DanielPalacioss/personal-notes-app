import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'The first name name must be string' })
  @IsNotEmpty({ message: 'The first name name cannot be empty' })
  @Length(2, 30, {
    message: 'The first name must be between 3 and 50 characters',
  })
  firstName: string;

  @IsString({ message: 'The last name must be string' })
  @IsNotEmpty({ message: 'The last name cannot be empty' })
  @Length(2, 30, {
    message: 'The last name must be between 3 and 50 characters',
  })
  lastName: string;

  @IsString({ message: 'The email must be string' })
  @IsNotEmpty({ message: 'The email cannot be empty' })
  @IsEmail({}, { message: 'The email is not valid' })
  email: string;
}
