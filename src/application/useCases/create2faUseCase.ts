import jwtAdapter from '@infra/adapters/jwt-adapter';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { ITwoFactorAdapter } from '../ports/ITwoFactorAdapter';
import { useCase } from '../ports/useCase';

export default class Create2FaUseCase implements useCase {
  constructor(
    private readonly cache: IMemoryCacheAdapter,
    private readonly twofactor: ITwoFactorAdapter,
    private readonly jwtAdapter: jwtAdapter,
  ) {}

  public async execute(token: string) {
    const jwt = this.jwtAdapter.decode(token);

    const twofactorSecret = this.twofactor.generateSecret(jwt.email);

    await this.cache.set(`${jwt.email}-2fa`, twofactorSecret.secret, 60);

    return twofactorSecret.qr;
  }
}
