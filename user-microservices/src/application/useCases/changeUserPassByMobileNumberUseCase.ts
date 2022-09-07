import { bcryptEncoder } from '../ports/bcrypt';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class ChangeUserPassByMobileNumberUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(mobileNumber: string, token: string, password: string, encoder: bcryptEncoder): Promise<boolean | null> {
    try {
      let currentUTCDate: any = new Date();
      currentUTCDate = new Date(currentUTCDate.toUTCString());

      const tokenexists = await this.userRepo.getUserRecoverTokenByNumber(mobileNumber);

      if (tokenexists) {
        if (tokenexists?.token != token || currentUTCDate > tokenexists.expires_at!) {
          return false;
        }
        const userId = await this.userRepo.getUserIdByMobileNumber(mobileNumber);
        if (userId?.id) {
          await this.userRepo.updateUserByNumber(mobileNumber, { password: await encoder.hash(password) });
          await this.userRepo.deleteRecoverCodeById(userId!.id, tokenexists.token);
          return true;
        }
        return false;
      }

      return false;
    } catch (err: any) {
      return false;
    }
  }
}
