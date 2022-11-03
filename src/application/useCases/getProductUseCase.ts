import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class GetProductUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(subsidiaryId: string, productId: string) {
    const result = await this.establishmentRepo.getProductBySubsidiaryId(subsidiaryId, productId);

    return result;
  }
}
