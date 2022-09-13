import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import * as crypto from 'crypto';
import { IMailAdapter } from '../ports/IMailAdapter';
import SendRecoverEmailUserNotFoundException from './errors/SendRecoverEmailUserNotFound';
import { IDateAdapter } from '../ports/IDateAdapter';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { SendRecoverEmailDto } from '../ports/dtos/sendRecoverEmailDto';

export default class SendRecoverEmailUseCase implements useCase {
  constructor(
    private readonly emailprovider: IMailAdapter,
    private readonly userRepo: IUserRepository,
    private readonly dateMoment: IDateAdapter,
    private readonly cache: IMemoryCacheAdapter,
  ) {}

  async execute(inputDto: SendRecoverEmailDto): Promise<boolean | number | null> {
    const token = crypto.randomBytes(20).toString('hex');
    const expireDate = this.dateMoment.addHoursToUTCDate(new Date().toISOString(), 2);

    const userId = await this.userRepo.getUserIdByEmail(inputDto.to);
    if (userId != null) {
      const isTimedOut = await this.cache.get(`${inputDto.to}-updaterecoveremail-timeout`);
      if (isTimedOut) {
        return await this.cache.getTTL(`${inputDto.to}-updaterecoveremail-timeout`);
      }
      const tokenAlreadyExists = await this.userRepo.getUserRecoverTokenByEmail(inputDto.to);
      if (tokenAlreadyExists) {
        const updateCode = await this.userRepo.updateRecoverCodeById(userId.id, token, expireDate as unknown as Date);
        const sendEmail = await this.emailprovider.sendRecoverEmail(inputDto.to, token);
        if (updateCode && sendEmail) {
          await this.cache.set(`${inputDto.to}-updaterecoveremail-timeout`, 'true', 600);
          return true;
        }
      } else {
        const createCode = await this.userRepo.createRecoverCodeById(userId.id, token, expireDate as unknown as Date);
        const sendEmail = await this.emailprovider.sendRecoverEmail(inputDto.to, token);
        if (createCode && sendEmail) {
          await this.cache.set(`${inputDto.to}-updaterecoveremail-timeout`, 'true', 600);
          return true;
        }
      }
    }
    throw new SendRecoverEmailUserNotFoundException('USER_NOT_FOUND');
  }
}
