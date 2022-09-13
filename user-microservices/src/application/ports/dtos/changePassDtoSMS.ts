import { IsMobilePhone, IsNotEmpty } from 'class-validator';

export class ChangePassDtoSMS {
  constructor(mobileNumber: string, token: string, password: string) {
    this.mobileNumber = mobileNumber;
    this.token = token;
    this.password = password;
  }
  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  mobileNumber: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  password: string;
}
