import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { EstablishmentWithoutPasswordDto } from '../ports/dtos/establishmentDto';
import { GetEstablishmentDto } from '../ports/dtos/getEstablishmentDto';

export default class GetEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(inputDto: GetEstablishmentDto): Promise<EstablishmentWithoutPasswordDto | null> {
    const result = await this.establishmentRepo.getEstablishment(inputDto.id);
    return result;
  }
}
