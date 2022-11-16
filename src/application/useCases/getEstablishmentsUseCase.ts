import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { PublicEstablishments } from '../ports/dtos/establishmentDto';

export default class GetEstablishmentsUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(): Promise<PublicEstablishments[] | []> {
    const result = await this.establishmentRepo.getEstablishments();
    return result;
  }
}
