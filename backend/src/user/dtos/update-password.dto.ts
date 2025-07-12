import { Matches } from 'class-validator';

export class UpdatePasswordDto {
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message:
        'Password must be 8-20 characters and include uppercase, lowercase, number and special character',
    },
  )
  password: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    {
      message:
        'Password must be 8-20 characters and include uppercase, lowercase, number and special character',
    },
  )
  newPassword: string;
}
