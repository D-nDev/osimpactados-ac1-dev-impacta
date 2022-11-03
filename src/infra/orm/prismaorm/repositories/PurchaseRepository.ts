import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { PrismaClient, purchaseStatus } from '@prisma/client';
import { CreatePurchase, IPurchaseRepository } from '@application/ports/purchaseRepository';
import PurchaseEntity from '@domain/entities/Purchase';

@singleton()
export default class PurchaseRepository implements IPurchaseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async updatePurchase(purchaseId: string, status: purchaseStatus) {
    await this.prisma.purchases.updateMany({
      where: {
        meli_purchaseId: purchaseId,
      },
      data: {
        status,
      },
    });
  }

  public async createPurchase(data: CreatePurchase) {
    await this.prisma.purchases.create({
      data: {
        ...data,
      },
    });
  }

  public async getPurchases(userId: string) {
    const result = await this.prisma.purchases.findMany({
      where: {
        userId,
      },
    });
    const purchases: PurchaseEntity[] = [];

    if (result) {
      result.forEach((purchase) =>
        purchases.push(
          new PurchaseEntity({
            meli_purchaseId: purchase.meli_purchaseId,
            delivered_date: purchase.delivered_date,
            establishmentName: purchase.establishmentName,
            is_delivered: purchase.is_delivered,
            products: purchase.products,
            scheduled_date: purchase.scheduled_date,
            status: purchase.status,
            subsidiaryName: purchase.subsidiaryName,
          }),
        ),
      );
    }

    return purchases;
  }

  public async getPurchase(userId: string, purchaseId: string) {
    const result = await this.prisma.purchases.findFirst({
      where: {
        userId,
        meli_purchaseId: purchaseId,
      },
    });

    if (result) {
      const entity = new PurchaseEntity({
        meli_purchaseId: result.meli_purchaseId,
        delivered_date: result.delivered_date,
        establishmentName: result.establishmentName,
        is_delivered: result.is_delivered,
        products: result.products,
        scheduled_date: result.scheduled_date,
        status: result.status,
        subsidiaryName: result.subsidiaryName,
      });
      return entity;
    }
    return null;
  }
}
