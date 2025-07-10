import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequestDto {
  @IsString({ message: 'The username must be string' })
  @IsNotEmpty({ message: 'The username cannot be empty' })
  @Length(3, 30, {
    message: 'The username must be between 3 and 15 characters',
  })
  usernameOrEmail: string;
  @Length(8, 20, {
    message: 'The username must be between 3 and 15 characters',
  })
  password: string;
}
