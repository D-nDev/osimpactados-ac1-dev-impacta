import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { IJwtAdapter } from '../ports/IJwtAdapter';

export default class DeleteMyEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository, private readonly jwtadapter: IJwtAdapter) {}

  async execute(token: string): Promise<boolean | null> {

    const decodetoken = this.jwtadapter.decode(token);

    const result = await this.establishmentRepo.deleteEstablishmentDataByEmail(decodetoken.email);
    return result;
  }
}
