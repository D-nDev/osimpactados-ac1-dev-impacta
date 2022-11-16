import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { PublicSubsidiaries } from '../ports/dtos/establishmentDto';

export default class GetSubsidiariesUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(establishmentId: string): Promise<PublicSubsidiaries | null> {
    const result = await this.establishmentRepo.getSubsidiaries(establishmentId);
    return result;
  }
}
