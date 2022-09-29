import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { CreateSubsidiaryDto } from '../ports/dtos/createSubsidiaryDto';

export default class CreateSubsidiaryUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly jwtadapter: ITokenAdapter,
  ) {}

  async execute(inputDto: CreateSubsidiaryDto, token: string) {
    const currentEstablishment = this.jwtadapter.decode(token);

    const result = await this.establishmentRepo.createSubsidiary(currentEstablishment.id, inputDto);

    return result;
  }
}
