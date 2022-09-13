import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import { ISMSAdapter } from '../ports/ISMSAdapter';
import SendRecoverSMSUserNotFoundException from './errors/SendRecoverSMSUserNotFound';
import { IDateAdapter } from '../ports/IDateAdapter';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { SendRecoverSMSDto } from '../ports/dtos/sendRecoverSMSDto';

export default class SendRecoverSMSUseCase implements useCase {
  constructor(
    private readonly smsprovider: ISMSAdapter,
    private readonly userRepo: IUserRepository,
    private readonly dateMoment: IDateAdapter,
    private readonly cache: IMemoryCacheAdapter,
  ) {}

  async execute(inputDto: SendRecoverSMSDto): Promise<boolean | null | number> {
    const token = Math.random().toString().substring(2, 8);
    const expireDate = this.dateMoment.addHoursToUTCDate(new Date().toISOString(), 2);

    const userId = await this.userRepo.getUserIdByMobileNumber(inputDto.to);
    if (userId != null) {
      const isTimedOut = await this.cache.get(`${inputDto.to}-updaterecoversms-timeout`);
      if (isTimedOut) {
        return await this.cache.getTTL(`${inputDto.to}-updaterecoversms-timeout`);
      }
      const tokenAlreadyExists = await this.userRepo.getUserRecoverTokenByNumber(inputDto.to);
      if (tokenAlreadyExists) {
        const updateCode = await this.userRepo.updateRecoverCodeById(userId.id, token, expireDate as unknown as Date);
        const sendSMS = await this.smsprovider.sendRecoverSMS(inputDto.to, token);
        if (updateCode && sendSMS) {
          await this.cache.set(`${inputDto.to}-updaterecoversms-timeout`, 'true', 600);
          return true;
        }
      } else {
        const createCode = await this.userRepo.createRecoverCodeById(userId.id, token, expireDate as unknown as Date);
        const sendSMS = await this.smsprovider.sendRecoverSMS(inputDto.to, token);
        if (createCode && sendSMS) {
          await this.cache.set(`${inputDto.to}-updaterecoversms-timeout`, 'true', 600);
          return true;
        }
      }
    }
    throw new SendRecoverSMSUserNotFoundException('USER_NOT_FOUND');
  }
}
