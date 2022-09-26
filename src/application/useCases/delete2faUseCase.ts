import jwtAdapter from '@infra/adapters/jwt-adapter';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class Delete2FaUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly jwtAdapter: jwtAdapter) {}

  public async execute(token: string) {
    const jwt = this.jwtAdapter.decode(token);

    await this.userRepo.deleteTwoFactorSecret(jwt.email);

    return true;
  }
}
