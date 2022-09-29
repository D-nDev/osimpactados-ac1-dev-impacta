import jwtAdapter from '@infra/adapters/jwt-adapter';
import { IUserRepository } from '../ports/userRepository';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { ITwoFactorAdapter } from '../ports/ITwoFactorAdapter';
import { useCase } from '../ports/useCase';
import InvalidTwoFactorTokenException from './errors/InvalidTwoFactorToken';

export default class Validate2FaUseCase implements useCase {
  constructor(
    private readonly cache: IMemoryCacheAdapter,
    private readonly twofactor: ITwoFactorAdapter,
    private readonly userRepo: IUserRepository,
    private readonly jwtAdapter: jwtAdapter,
  ) {}

  public async execute(token: string, code: string) {
    const jwt = this.jwtAdapter.decode(token);

    const tokenExists = await this.cache.get(`${jwt.email}-2fa`);

    if (tokenExists) {
      const isValidTwoFactorCode = this.twofactor.verifyToken(tokenExists, code);

      if (isValidTwoFactorCode) {
        await this.userRepo.createTwoFactorSecret(jwt.email, tokenExists);
        await this.cache.deleteKey(`${jwt.email}-2fa`);
        return true;
      }
    }
    throw new InvalidTwoFactorTokenException('INVALID_TWOFACTOR_CODE');
  }
}
