import { IsCpf } from '@decorators/isCpf';
import { Address } from '@prisma/client';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional } from 'class-validator';

export interface AddressesDto {
  address: string;
  addressNumber: number;
  addressComplement?: string | null;
  addressDistrict: string;
  city: string;
  state: string;
  cep: string;
}

export interface UserWithoutPasswordDto {
  email: string;
  name: string;
  mobileNumber: string;
  addresses: AddressesDto[];
  cpf: string;
}

export interface MyUserDataDto {
  email: string;
  name: string;
  cpf: string;
  mobileNumber: string;
  photo: string;
  addresses: Address[];
  twofactor_enabled: boolean;
}

export interface RecoverCodes {
  token: string;
  userId: string;
  expires_at: Date;
  is_blacklisted: boolean;
}

export class UserDto {
  constructor(
    email: string,
    name: string,
    mobileNumber: string,
    addresses: AddressesDto[],
    password: string,
    cpf: string,
    photo: string = '',
  ) {
    this.email = email;
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.addresses = addresses;
    this.password = password;
    this.cpf = cpf;
    this.photo = photo;
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

  @IsCpf({ message: 'Invalid CPF' })
  @IsNotEmpty()
  cpf: string;

  @IsOptional()
  photo: string;
}
