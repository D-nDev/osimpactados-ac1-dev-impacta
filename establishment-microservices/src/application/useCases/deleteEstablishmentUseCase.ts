import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class DeleteEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(id: string): Promise<void> {
    return await this.establishmentRepo.deleteEstablishment(id);
  }
}
