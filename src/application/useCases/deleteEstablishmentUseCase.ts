import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { DeleteEstablishmentDto } from '../ports/dtos/deleteEstablishmentDto';

export default class DeleteEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(inputDto: DeleteEstablishmentDto): Promise<void> {
    return await this.establishmentRepo.deleteEstablishment(inputDto.id);
  }
}
