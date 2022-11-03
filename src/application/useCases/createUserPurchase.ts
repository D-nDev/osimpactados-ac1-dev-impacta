import { PurchaseDataDto } from '../ports/dtos/purchaseDataDto';
import { IPurchaseAdapter } from '../ports/IPurchaseAdapter';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { useCase } from '../ports/useCase';

export default class CreateUserPurchaseUseCase implements useCase {
  constructor(private readonly purchaseAdapter: IPurchaseAdapter, private readonly jwtAdapter: ITokenAdapter) {}
  public async execute(token: string, purchaseData: PurchaseDataDto): Promise<any> {
    const decodedToken = this.jwtAdapter.decode(token);

    if (decodedToken) {
      const purchaseUserId = {
        metadata: {
          userId: decodedToken.id,
        },
      };

      const purchaseObject = this.merge(purchaseData, purchaseUserId);
      return this.purchaseAdapter.createCart(purchaseObject);
    }
  }

  public merge = (target, source) => {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) Object.assign(source[key], this.merge(target[key], source[key]));
    }
    Object.assign(target || {}, source);
    return target;
  };
}
