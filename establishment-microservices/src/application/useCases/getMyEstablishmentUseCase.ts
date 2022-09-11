import { useCase } from '../ports/useCase';
import { IEstablishmentRepository, myEstablishmentData } from '../ports/establishmentRepository';
import { IJwtAdapter } from '../ports/IJwtAdapter';

export default class GetMyEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository, private readonly jwtadapter: IJwtAdapter) {}

  async execute(token: string): Promise<myEstablishmentData | null> {

    const decodetoken = this.jwtadapter.decode(token);

    const result = await this.establishmentRepo.getEstablishmentDataByEmail(decodetoken.email);
    return result;
  }
}
