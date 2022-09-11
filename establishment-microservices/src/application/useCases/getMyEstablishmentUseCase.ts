import { useCase } from '../ports/useCase';
import { IEstablishmentRepository, myEstablishmentData } from '../ports/establishmentRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';

export default class GetMyEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository, private readonly jwtadapter: ITokenAdapter) {}

  async execute(token: string): Promise<myEstablishmentData | null> {

    const decodetoken = this.jwtadapter.decode(token);

    const result = await this.establishmentRepo.getEstablishmentDataByEmail(decodetoken.email);
    return result;
  }
}
