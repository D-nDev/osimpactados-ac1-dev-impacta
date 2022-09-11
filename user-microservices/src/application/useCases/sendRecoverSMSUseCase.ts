import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import { ITwilioAdapter } from '../ports/ITwilioAdapter';

export default class SendRecoverSMSUseCase implements useCase {
  constructor(private readonly smsprovider: ITwilioAdapter, private readonly userRepo: IUserRepository) {}

  async execute(to: string): Promise<boolean> {
    try {
      const token = Math.random().toString().substring(2, 8);
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 2 * 60 * 60 * 1000);

      const userId = await this.userRepo.getUserIdByMobileNumber(to);
      if (userId) {
        const tokenAlreadyExists = await this.userRepo.getUserRecoverTokenByNumber(to);
        if (tokenAlreadyExists) {
          await this.userRepo.updateRecoverCodeById(userId!.id, token, expireDate);
          await this.smsprovider.sendRecoverSMS(to, token);
        } else {
          await this.userRepo.createRecoverCodeById(userId!.id, token, expireDate);
          await this.smsprovider.sendRecoverSMS(to, token);
        }

        return true;
      } else {
        throw { code: 'INVALID_NUMBER' };
      }
    } catch (err: any) {
      throw { code: err.code } || false;
    }
  }
}
