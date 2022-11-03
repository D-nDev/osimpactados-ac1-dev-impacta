import { useCase } from '../ports/useCase';
import { IPurchaseRepository } from '../ports/purchaseRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import PurchaseEntity from '@app/domain/entities/Purchase';

export default class GetPurchasesUseCase implements useCase {
  constructor(private readonly purchaseRepo: IPurchaseRepository, private readonly jwtAdapter: ITokenAdapter) {}
  public async execute(token: string): Promise<PurchaseEntity[]> {
    const tokenResult = this.jwtAdapter.decode(token);

    const result = await this.purchaseRepo.getPurchases(tokenResult.id);
    return result;
  }
}
