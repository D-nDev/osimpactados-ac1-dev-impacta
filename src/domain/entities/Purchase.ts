/* eslint-disable @typescript-eslint/naming-convention */
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

interface Products {
  productId: string;
  quantity: number;
  price: number;
}

enum purchaseStatus {
  PENDING = 'PENDENTE',
  APPROVED = 'APROVADO',
  CANCELLED = 'CANCELADO',
  CHARGEDBACK = 'REEMBOLSADO',
}

export default class PurchaseEntity {
  constructor({
    meli_purchaseId,
    establishmentName,
    subsidiaryName,
    products,
    scheduled_date,
    status,
    delivered_date,
    is_delivered,
  }: {
    meli_purchaseId: string;
    establishmentName: string;
    subsidiaryName: string;
    products: Products[];
    scheduled_date: string | null;
    status: purchaseStatus;
    delivered_date: string | null;
    is_delivered: boolean;
  }) {
    this.meli_purchaseId = meli_purchaseId;
    this.establishmentName = establishmentName;
    this.subsidiaryName = subsidiaryName;
    this.products = products;
    this.scheduled_date = scheduled_date;
    this.status = status;
    this.delivered_date = delivered_date;
    this.is_delivered = is_delivered;
  }

  @IsNotEmpty()
  @IsString()
  public readonly meli_purchaseId: string;

  @IsNotEmpty()
  @IsString()
  public readonly establishmentName: string;

  @IsNotEmpty()
  @IsString()
  public readonly subsidiaryName: string;

  @IsNotEmpty()
  @IsArray()
  public readonly products: Products[];

  @IsOptional()
  public readonly scheduled_date: string | null;

  @IsNotEmpty()
  public readonly status: purchaseStatus;

  @IsOptional()
  public readonly delivered_date: string | null;

  @IsOptional()
  public readonly is_delivered: boolean;

  public getMeliID(): string {
    return this.meli_purchaseId;
  }

  public getEstablishment(): string {
    return this.establishmentName;
  }

  public getSubsidiary(): string {
    return this.subsidiaryName;
  }

  public getProducts(): Products[] {
    return this.products;
  }

  public getScheduledDate(): string | null {
    return this.scheduled_date;
  }

  public getStatus(): purchaseStatus {
    return this.status;
  }

  public getDeliveredDate(): string | null {
    return this.delivered_date;
  }

  public isDelivered(): boolean {
    return this.is_delivered;
  }
}
