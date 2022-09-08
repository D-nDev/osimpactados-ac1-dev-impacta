import { useCase } from '../ports/useCase';
import { IEstablishmentRepository, establishmentWithoutPassword } from '../ports/establishmentRepository';

export default class GetEstablishmentsUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(): Promise<establishmentWithoutPassword[] | null> {
    const result = await this.establishmentRepo.getEstablishments();
    return result;
  }
}
