import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class ValidateUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(email: string, token: string): Promise<boolean> {
    try {
      let currentUTCDate: any = new Date();
      currentUTCDate = currentUTCDate.toUTCString();

      const tokenexists = await this.userRepo.getUserValidateToken(email);

      if (tokenexists) {
        if (tokenexists?.token != token || currentUTCDate > tokenexists.expireDate!) {
          return false;
        }
        await this.userRepo.updateValidationCode(email, null, null);
        return true;
      }

      return false;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  }
}
