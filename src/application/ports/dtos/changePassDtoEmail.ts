import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangePassDtoEmail {
  constructor(email: string, token: string, password: string) {
    this.email = email;
    this.token = token;
    this.password = password;
  }

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  password: string;
}
