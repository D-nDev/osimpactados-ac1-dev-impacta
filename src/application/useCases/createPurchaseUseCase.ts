import { useCase } from '../ports/useCase';
import { IPurchaseRepository } from '../ports/purchaseRepository';
import { IPaymentdapter } from '../ports/IPaymentAdapter';

export default class CreatePurchaseUseCase implements useCase {
  constructor(private readonly purchaseRepo: IPurchaseRepository, private readonly payment: IPaymentdapter) {}
  public async execute(id: string): Promise<void> {
    const paymentData = await this.payment.getFormattedPayment(id);
    const paymentType = await this.payment.getPaymentType(id);

    await this.purchaseRepo.createPurchase(paymentData);

    if (paymentType === 'credit_card') {
      setTimeout(async () => {
        const result = await this.payment.getPayment(id);
        if (result.data.body.status === 'approved') {
          await this.purchaseRepo.updatePurchase(id, 'approved');
        }
      }, 6500);
    }
  }
}
