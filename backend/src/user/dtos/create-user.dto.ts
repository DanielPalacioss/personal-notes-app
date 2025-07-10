import { userRole } from '../enums/user-role.enum';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
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

  @IsString({ message: 'The username must be string' })
  @IsNotEmpty({ message: 'The username cannot be empty' })
  @Length(3, 15, {
    message: 'The username must be between 3 and 50 characters',
  })
  username: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message:
        'Password must be 8-20 characters and include uppercase, lowercase, number and special character',
    },
  )
  password: string;

  @IsEnum(userRole, { message: 'The rol must be ADMIN OR USER' })
  role: userRole;
}
