import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { DeleteMyEstablishmentDto } from '../ports/dtos/deleteMyEstablishmentDto';

export default class DeleteMyEstablishmentUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly jwtadapter: ITokenAdapter,
  ) {}

  async execute(inputDto: DeleteMyEstablishmentDto): Promise<boolean | null> {
    const decodetoken = this.jwtadapter.decode(inputDto.token);

    const result = await this.establishmentRepo.deleteEstablishmentDataByEmail(decodetoken.email);
    return result;
  }
}
