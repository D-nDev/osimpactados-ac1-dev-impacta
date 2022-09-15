import { IUserRepository } from '../ports/userRepository';
import { useCase } from '../ports/useCase';

export default class BlackListRecoverTokenUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  public async execute(token: string, email: string) {
    const targetToken = await this.userRepo.getUserRecoverTokenByEmail(email);

    if (targetToken?.token === token) {
      const userId = await this.userRepo.getUserIdByEmail(email);

      return await this.userRepo.blackListRecoverToken(userId!.id, token);
    }
    return false;
  }
}
