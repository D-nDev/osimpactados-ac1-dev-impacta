import { useCase } from '../ports/useCase';
import { IEstablishmentRepository, establishmentWithoutPassword } from '../ports/establishmentRepository';

export default class GetEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(id: string): Promise<establishmentWithoutPassword | null> {
    const result = await this.establishmentRepo.getEstablishment(id);
    return result;
  }
}
