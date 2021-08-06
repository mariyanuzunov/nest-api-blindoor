import { IsEmail, MinLength } from 'class-validator';

export class LoginCredentialsDto {
  @IsEmail()
  @MinLength(4, { message: 'E-mail must be at least 4 characters long.' })
  email: string;

  @MinLength(5, { message: 'Password must be at least 5 characters long.' })
  password: string;
}
