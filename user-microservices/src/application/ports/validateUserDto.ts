import { IsEmail, IsNotEmpty } from 'class-validator';

export class validateUserDto {
  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  token: string;
}
