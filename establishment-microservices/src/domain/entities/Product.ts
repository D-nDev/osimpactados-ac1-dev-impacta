import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class ProductEntity {
  constructor({
    name,
    stock = 0,
    value = 0,
    photo = ""
  }: {
    name: string,
    stock: number,
    value?: number
    photo?: string | null,
    addressDistrict: string,
    city: string,
    state: string,
    cep: string,
  }) {
    this.name = name;
    this.stock = stock;
    this.value = value;
    this.photo = photo;
  }

  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsString()
  public readonly stock: number;

  @IsOptional()
  @IsInt()
  public readonly value: number;

  @IsOptional()
  @IsString()
  public readonly photo: string | null;

  public getName(): string {
    return this.name;
  }

  public getStock(): number {
    return this.stock;
  }

  public getValue(): number {
    return this.value;
  }

  public getPhoto(): string | null {
    return this.photo;
  }
}