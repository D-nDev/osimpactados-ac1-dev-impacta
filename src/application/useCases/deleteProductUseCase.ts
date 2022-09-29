import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';

export default class DeleteProductUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly jwtadapter: ITokenAdapter,
  ) {}

  async execute(productId: string, subsidiaryId: string, token: string): Promise<boolean | null> {
    const decodetoken = this.jwtadapter.decode(token);

    const result = await this.establishmentRepo.deleteProduct(decodetoken.id, subsidiaryId, productId);

    if (result) {
      return true;
    }
    return null;
  }
}
