import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { PrismaClient, purchaseStatus } from '@prisma/client';
import { CreatePurchase, IPurchaseRepository } from '@application/ports/purchaseRepository';

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
}
