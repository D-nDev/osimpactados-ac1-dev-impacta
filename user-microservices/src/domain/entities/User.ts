import { IsCpf } from '@main/decorators/isCpf';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import AddressEntity from './Address';

export default class UserEntity {
  constructor({
    email,
    name,
    mobileNumber,
    addresses,
    password,
    cpf,
  }: {
    email: string;
    name: string;
    mobileNumber: string;
    addresses: AddressEntity[];
    password: string;
    cpf: string;
  }) {
    this.email = email;
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.addresses = addresses;
    this.password = password;
    this.cpf = cpf;
    Object.freeze(this);
  }

  @IsEmail()
  private readonly email: string;

  @IsNotEmpty()
  @IsString()
  private readonly name: string;

  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  private readonly mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  private readonly addresses: AddressEntity[];

  @IsNotEmpty()
  @Min(6)
  @Max(25)
  private readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsCpf()
  private readonly cpf: string;

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getMobileNumber(): string {
    return this.mobileNumber;
  }

  public getAddresses(): AddressEntity[] {
    return this.addresses;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCpf(): string {
    return this.cpf;
  }
}
