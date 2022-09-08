import { IsCnpj } from '@app/src/main/decorators/isCnpj';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import SubsidiaryEntity from './Subsidiary';

export default class EstablishmentEntity {
  constructor({
    email,
    name,
    mobileNumber,
    subsidiary,
    password,
    cnpj,
  }: {
    email: string;
    name: string;
    mobileNumber: string;
    subsidiary: SubsidiaryEntity[];
    password: string;
    cnpj: string;
  }) {
    this.email = email;
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.subsidiary = subsidiary;
    this.password = password;
    this.cnpj = cnpj;
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
  private readonly subsidiary: SubsidiaryEntity[];

  @IsNotEmpty()
  @Min(6)
  @Max(25)
  private readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsCnpj()
  private readonly cnpj: string;

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return this.name;
  }

  public getMobileNumber(): string {
    return this.mobileNumber;
  }

  public getSubsidiaries(): SubsidiaryEntity[] {
    return this.subsidiary;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCnpj(): string {
    return this.cnpj;
  }
}
