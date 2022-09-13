import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { MyEstablishmentDataDto } from '../ports/dtos/establishmentDto';
import { GetMyEstablishmentDto } from '../ports/dtos/getMyEstablishmentDto';

export default class GetMyEstablishmentUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly jwtadapter: ITokenAdapter,
  ) {}

  async execute(inputDto: GetMyEstablishmentDto): Promise<MyEstablishmentDataDto> {
    const decodetoken = this.jwtadapter.decode(inputDto.token);

    const result = await this.establishmentRepo.getEstablishmentDataByEmail(decodetoken.email);
    return result;
  }
}
