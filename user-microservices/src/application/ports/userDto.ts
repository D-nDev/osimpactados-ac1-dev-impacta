import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export type AddressesDto = {
  address: string;
  addressNumber: number;
  addressComplement?: string | null;
  addressDistrict: string;
  city: string;
  state: string;
  cep: string;
};

export class userDto {
  constructor(email: string, name: string, mobileNumber: string, addresses: AddressesDto[], password: string, cpf: string) {
    this.email = email;
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.addresses = addresses;
    this.password = password;
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
  addresses: AddressesDto[];

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  cpf: string;
}
