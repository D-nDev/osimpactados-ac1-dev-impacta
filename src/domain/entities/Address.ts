import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class AddressEntity {
  constructor({
    address,
    addressNumber = 0,
    addressComplement = null,
    addressDistrict,
    city,
    state,
    cep,
  }: {
    address: string;
    addressNumber?: number;
    addressComplement?: string | null;
    addressDistrict: string;
    city: string;
    state: string;
    cep: string;
  }) {
    this.address = address;
    this.addressNumber = addressNumber;
    this.addressComplement = addressComplement;
    this.addressDistrict = addressDistrict;
    this.city = city;
    this.state = state;
    this.cep = cep;
  }

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
  @IsString()
  public readonly city: string;

  @IsNotEmpty()
  @IsString()
  public readonly state: string;

  @IsNotEmpty()
  @IsString()
  public readonly cep: string;

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
