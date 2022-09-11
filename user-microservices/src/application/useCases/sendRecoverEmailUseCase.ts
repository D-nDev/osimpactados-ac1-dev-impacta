import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import * as crypto from 'crypto';
import { IMailAdapter } from '../ports/IMailAdapter';

export default class SendRecoverEmailUseCase implements useCase {
  constructor(private readonly emailprovider: IMailAdapter, private readonly userRepo: IUserRepository) {}

  async execute(to: string): Promise<boolean> {
    try {
      const token = crypto.randomBytes(20).toString('hex');
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 2 * 60 * 60 * 1000);

      const userId = await this.userRepo.getUserIdByEmail(to);
      if (userId) {
        const tokenAlreadyExists = await this.userRepo.getUserRecoverTokenByEmail(to);
        if (tokenAlreadyExists) {
          await this.userRepo.updateRecoverCodeById(userId!.id, token, expireDate);
          await this.emailprovider.sendRecoverEmail(to, token);
        } else {
          await this.userRepo.createRecoverCodeById(userId!.id, token, expireDate);
          await this.emailprovider.sendRecoverEmail(to, token);
        }

        return true;
      } else {
        throw { code: 'INVALID_EMAIL' };
      }
    } catch (err: any) {
      throw { code: err.code } || false;
    }
  }
}
