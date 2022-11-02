export interface CreatePurchaseDto {
  meli_purchaseId: string;
  establishmentId: string;
  subsidiaryId: string;
  establishmentName: string;
  subsidiaryName: string;
  products: any[];
  scheduled_date: string | null;
  delivered_date: string | null;
  is_delivered: boolean;
}

export interface GetFormattedPurchaseDto {
  meli_purchaseId: any;
  establishmentId: any;
  subsidiaryId: any;
  userId: any;
  establishmentName: any;
  subsidiaryName: any;
  products: any;
  scheduled_date: any;
  delivered_date: any;
  is_delivered: any;
}
