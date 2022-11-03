import { useCase } from '../ports/useCase';
import { IPurchaseRepository } from '../ports/purchaseRepository';
import { IPaymentdapter } from '../ports/IPaymentAdapter';

export default class UpdatePurchaseUseCase implements useCase {
  constructor(private readonly purchaseRepo: IPurchaseRepository, private readonly payment: IPaymentdapter) {}
  public async execute(purchaseId: string): Promise<void> {
    const paymentStatus = await this.payment.getPaymentStatus(purchaseId);
    await this.purchaseRepo.updatePurchase(purchaseId, paymentStatus);
  }
}
