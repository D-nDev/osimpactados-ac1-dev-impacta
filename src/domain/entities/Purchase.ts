/* eslint-disable @typescript-eslint/naming-convention */
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const purchaseStatusEnum = {
  pending: 'pending',
  approved: 'approved',
  authorized: 'authorized',
  in_process: 'in_process',
  in_mediation: 'in_mediation',
  rejected: 'rejected',
  cancelled: 'cancelled',
  refunded: 'refunded',
  charged_back: 'charged_back',
};

export type purchaseStatus = typeof purchaseStatusEnum[keyof typeof purchaseStatusEnum];

export interface Products {
  id: string;
  title: string;
  quantity: number | null;
  unit_price: number;
  picture_url: string;
}

export interface Purchases {
  meli_purchaseId: string;
  establishmentId: string;
  subsidiaryId: string;
  userId: string;
  establishmentName: string;
  subsidiaryName: string;
  products: Products[];
  scheduled_date: Date | null;
  status: purchaseStatus;
  delivered_date: Date | null;
  is_delivered: boolean;
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
    scheduled_date: Date | null;
    status: purchaseStatus;
    delivered_date: Date | null;
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
  public readonly scheduled_date: Date | null;

  @IsNotEmpty()
  public readonly status: purchaseStatus;

  @IsOptional()
  public readonly delivered_date: Date | null;

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

  public getScheduledDate(): Date | null {
    return this.scheduled_date;
  }

  public getStatus(): purchaseStatus {
    return this.status;
  }

  public getDeliveredDate(): Date | null {
    return this.delivered_date;
  }

  public isDelivered(): boolean {
    return this.is_delivered;
  }

  public async getProduct(id: string) {
    const result = this.products.find((product) => product.id === id);
    if (result) {
      return result;
    }
    return null;
  }
}
