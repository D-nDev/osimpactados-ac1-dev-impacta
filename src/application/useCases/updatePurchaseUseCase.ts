import { useCase } from '../ports/useCase';
import { IPurchaseRepository } from '../ports/purchaseRepository';
import { IPaymentdapter } from '../ports/IPaymentAdapter';

export default class UpdatePurchaseUseCase implements useCase {
  constructor(private readonly purchaseRepo: IPurchaseRepository, private readonly payment: IPaymentdapter) {}
  public async execute(purchaseId: string): Promise<void> {
    const payment = await this.payment.getPayment(purchaseId);
    await this.purchaseRepo.updatePurchase(purchaseId, payment.data.body.status);
  }
}
