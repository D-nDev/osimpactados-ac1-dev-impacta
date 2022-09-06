import { MailAdapter } from '../ports/nodemailer';
import { useCase } from '../ports/useCase';
import * as crypto from 'crypto';
import { IUserRepository } from '../ports/userRepository';

export default class SendValidationEmailUseCase implements useCase {
  constructor(private readonly mailerprovider: MailAdapter, private readonly userRepo: IUserRepository) {}

  async execute(to: string): Promise<boolean> {
    try {
      const token = crypto.randomBytes(20).toString('hex');
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 2 * 60 * 60 * 1000);

      const sendEmail = this.mailerprovider.sendValidateEmail(to, token);
      const updateToken = this.userRepo.updateValidationCode(to, token, expireDate);

      await Promise.all([await sendEmail, await updateToken]);

      return true;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  }
}
