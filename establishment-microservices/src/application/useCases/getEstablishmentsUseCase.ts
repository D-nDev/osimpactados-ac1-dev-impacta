import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { EstablishmentWithoutPasswordDto } from '../ports/dtos/establishmentDto';

export default class GetEstablishmentsUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(): Promise<EstablishmentWithoutPasswordDto[] | []> {
    const result = await this.establishmentRepo.getEstablishments();
    return result;
  }
}
