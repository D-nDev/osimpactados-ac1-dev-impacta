import jwtAdapter from '@infra/adapters/jwt-adapter';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class Delete2FaUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository, private readonly jwtAdapter: jwtAdapter) {}

  public async execute(token: string) {
    const jwt = this.jwtAdapter.decode(token);

    await this.establishmentRepo.deleteTwoFactorSecret(jwt.email);

    return true;
  }
}
