import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export interface SubsidiaryDto {
  name: string;
  address: string;
  addressComplement: string | null;
  addressNumber: number;
  addressDistrict: string;
  products: productDto[];
  city: string;
  state: string;
  cep: string;
}

export interface productDto {
  name: string;
  stock: number;
  value: number;
  photo: string;
}

export class EstablishmentDto {
  constructor(email: string, name: string, mobileNumber: string, subsidiaries: SubsidiaryDto[], password: string, cnpj: string) {
    this.email = email;
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.subsidiaries = subsidiaries;
    this.password = password;
    this.cnpj = cnpj;
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
  subsidiaries: SubsidiaryDto[];

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  cnpj: string;
}
