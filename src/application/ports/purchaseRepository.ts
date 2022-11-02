import { purchaseStatus } from '@prisma/client';

export interface CreatePurchase {
  meli_purchaseId: string;
  establishmentId: string;
  subsidiaryId: string;
  userId: string;
  establishmentName: string;
  subsidiaryName: string;
  products: any[];
  scheduled_date: string | null;
  delivered_date: string | null;
  is_delivered: boolean;
}

export interface IPurchaseRepository {
  updatePurchase: (purchaseId: string, status: purchaseStatus) => Promise<void>;
  createPurchase: (data: CreatePurchase) => Promise<void>;
}
