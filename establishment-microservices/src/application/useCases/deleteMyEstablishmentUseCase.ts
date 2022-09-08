import jwtAdapter from '@app/src/infra/adapters/jwt-adapter';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class DeleteMyEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository, private readonly jwtadapter: jwtAdapter) {}

  async execute(token: string): Promise<boolean | null> {

    const decodetoken = this.jwtadapter.decode(token);

    const result = await this.establishmentRepo.deleteEstablishmentDataByEmail(decodetoken.email);
    return result;
  }
}
