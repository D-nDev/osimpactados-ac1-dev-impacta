import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class GetProductsUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(subsidiaryId: string) {
    const result = await this.establishmentRepo.getProductsBySubsidiaryId(subsidiaryId);

    return result;
  }
}
