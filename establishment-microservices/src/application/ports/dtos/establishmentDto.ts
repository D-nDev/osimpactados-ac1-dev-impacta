import { Subsidiary } from '@prisma/client';
import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { JsonValue } from './createProductDto';

export interface SubsidiaryDto {
  name: string;
  address: string;
  addressComplement: string | null;
  addressNumber: number;
  addressDistrict: string;
  products: JsonValue;
  city: string;
  state: string;
  cep: string;
}

export interface ProductDto {
  name: string;
  stock: number;
  value: number;
  photo: string;
}

export interface EstablishmentWithoutPasswordDto {
  name: string;
  email: string;
  mobileNumber: string;
  subsidiaries: Array<{
    name: string;
    address: string;
    addressComplement: string | null;
    addressDistrict: string;
    products: any;
    addressNumber: number;
    cep: string;
    city: string;
    state: string;
  }>;
  cnpj: string;
}

export interface MyEstablishmentDataDto {
  name: string;
  email: string;
  mobileNumber: string;
  subsidiaries: Subsidiary[];
  cnpj: string;
}

export interface RecoverCodes {
  id: string;
  token: string;
  establishmentId: string;
  expires_at: Date;
  is_blacklisted: boolean;
}

export class EstablishmentDto {
  constructor(
    email: string,
    name: string,
    mobileNumber: string,
    subsidiaries: SubsidiaryDto[],
    password: string,
    cnpj: string,
  ) {
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
