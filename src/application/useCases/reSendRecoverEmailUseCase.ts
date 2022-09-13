import { ReSendRecoverEmailDto } from '../ports/dtos/reSendRecoverEmailDto';
import { IMailAdapter } from '../ports/IMailAdapter';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class ReSendRecoverEmailUseCase implements useCase {
  constructor(
    private readonly mailerprovider: IMailAdapter,
    private readonly userRepo: IUserRepository,
    private readonly cache: IMemoryCacheAdapter,
  ) {}

  async execute(inputDto: ReSendRecoverEmailDto): Promise<boolean | number> {
    const token = await this.userRepo.getUserRecoverTokenByEmail(inputDto.to);
    const isTimedOut = await this.cache.get(`${inputDto.to}-resendrecoveremail-timeout`);

    if (isTimedOut) {
      return await this.cache.getTTL(`${inputDto.to}-resendrecoveremail-timeout`);
    }

    if (token) {
      const sendEmail = this.mailerprovider.sendRecoverEmail(inputDto.to, token.token);

      await sendEmail;
      await this.cache.set(`${inputDto.to}-resendrecoveremail-timeout`, 'true', 60);

      return true;
    }
    return true;
  }
}
