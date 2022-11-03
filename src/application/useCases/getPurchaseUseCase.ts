import { useCase } from '../ports/useCase';
import { IPurchaseRepository } from '../ports/purchaseRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import PurchaseEntity from '@domain/entities/Purchase';

export default class GetPurchaseUseCase implements useCase {
  constructor(private readonly purchaseRepo: IPurchaseRepository, private readonly jwtAdapter: ITokenAdapter) {}
  public async execute(token: string, purchaseId: string): Promise<PurchaseEntity | null> {
    const tokenResult = this.jwtAdapter.decode(token);

    const result = await this.purchaseRepo.getPurchase(tokenResult.id, purchaseId);
    return result;
  }
}
