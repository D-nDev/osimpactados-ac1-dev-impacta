import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import ProductEntity from "./Product";

export default class SubsidiaryEntity {
  constructor({
    name,
    address,
    addressNumber = 0,
    addressComplement = null,
    addressDistrict,
    products = [],
    city,
    state,
    cep,
  }: {
    name: string,
    address: string,
    addressNumber?: number
    addressComplement?: string | null,
    addressDistrict: string,
    products: ProductEntity[] | [],
    city: string,
    state: string,
    cep: string,
  }) {
    this.name = name;
    this.address = address;
    this.addressNumber = addressNumber;
    this.addressComplement = addressComplement;
    this.addressDistrict = addressDistrict;
    this.products = products;
    this.city = city;
    this.state = state;
    this.cep = cep;
  }

  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  public readonly address: string;

  @IsOptional()
  @IsInt()
  public readonly addressNumber: number;

  @IsOptional()
  @IsString()
  public readonly addressComplement: string | null;

  @IsNotEmpty()
  @IsString()
  public readonly addressDistrict: string;

  @IsNotEmpty()
  @IsObject()
  public readonly products: ProductEntity[] | [];

  @IsNotEmpty()
  @IsString()
  public readonly city: string;

  @IsNotEmpty()
  @IsString()
  public readonly state: string;

  @IsNotEmpty()
  @IsString()
  public readonly cep: string;

  public getName(): string {
    return this.name;
  }

  public getAddress(): string {
    return this.address;
  }

  public getAddressNumber(): number {
    return this.addressNumber;
  }

  public getAddressComplement(): string | null {
    return this.addressComplement;
  }

  public getAddressDistrict(): string {
    return this.addressDistrict;
  }

  public getProducts(): ProductEntity[] {
    return this.products;
  }

  public getCity(): string {
    return this.city;
  }

  public getState(): string {
    return this.state;
  }

  public getCep(): string {
    return this.cep;
  }
}