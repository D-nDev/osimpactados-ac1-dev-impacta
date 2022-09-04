import { IsCpf } from '@main/decorators/isCpf';
import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export default class UserEntity {
  constructor({
    email,
    name,
    mobileNumber,
    address,
    addressNumber = 0,
    password,
    state,
    city,
    cpf,
  }: {
    email: string;
    name: string;
    mobileNumber: string;
    address: string;
    addressNumber: number;
    password: string;
    state: string;
    city: string;
    cpf: string;
  }) {
    this.email = email;
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.address = address;
    this.addressNumber = addressNumber | 0;
    this.password = password;
    this.state = state;
    this.city = city;
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
  private readonly address: string;

  @IsInt()
  private readonly addressNumber: number;

  @IsNotEmpty()
  @Min(6)
  @Max(25)
  private readonly password: string;

  @IsNotEmpty()
  @IsString()
  private readonly state: string;

  @IsNotEmpty()
  @IsString()
  private readonly city: string;

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

  public getAddress(): string {
    return this.address;
  }

  public getAddressNumber(): number {
    return this.addressNumber;
  }

  public getPassword(): string {
    return this.password;
  }

  public getState(): string {
    return this.state;
  }

  public getCity(): string {
    return this.city;
  }

  public getCpf(): string {
    return this.cpf;
  }
}
