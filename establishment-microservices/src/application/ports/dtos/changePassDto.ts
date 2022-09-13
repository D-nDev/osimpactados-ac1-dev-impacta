import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class ChangePassDto {
  constructor(mobileNumber: string, email: string, token: string, password: string) {
    this.mobileNumber = mobileNumber;
    this.email = email;
    this.token = token;
    this.password = password;
  }
  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  mobileNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  password: string;
}
