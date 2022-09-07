import ProductEntity from '@app/src/domain/entities/Product';
import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export type SubsidiaryDto = {
  name: string;
  address: string;
  addressNumber: number;
  addressComplement?: string | null;
  addressDistrict: string;
  products: ProductEntity[] | [];
  city: string;
  state: string;
  cep: string;
};

export class establishmentDto {
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
