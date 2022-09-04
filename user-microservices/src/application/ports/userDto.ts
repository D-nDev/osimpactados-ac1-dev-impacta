import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, validate } from 'class-validator';

export class userDto {
  constructor(
    email: string,
    name: string,
    mobileNumber: string,
    address: string,
    addressNumber: number | undefined,
    password: string,
    state: string,
    city: string,
    cpf: string,
  ) {
    this.email = email;
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.address = address;
    this.addressNumber = addressNumber;
    this.password = password;
    this.state = state;
    this.city = city;
    this.cpf = cpf;
  }

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  mobileNumber: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  addressNumber?: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  cpf: string;
}
