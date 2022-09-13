import { IMailAdapter } from '../ports/IMailAdapter';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { useCase } from '../ports/useCase';
import { UserDto } from '../ports/dtos/userDto';
import SendValidationEmailException from './errors/SendValidationEmailException';
import { ReSendValidationEmailDto } from '../ports/dtos/reSendValidationEmailDto';

export default class ReSendValidationEmailUseCase implements useCase {
  constructor(private readonly mailerprovider: IMailAdapter, private readonly cache: IMemoryCacheAdapter) {}

  async execute(inputDto: ReSendValidationEmailDto): Promise<boolean | number> {
    try {
      const token = await this.cache.getJson<UserDto & { token: string; expireDate: any }>(`pending-${inputDto.to}`);
      const isTimedOut = await this.cache.get(`${inputDto.to}-resendvalidationemail-timeout`);

      if (isTimedOut) {
        return await this.cache.getTTL(`${inputDto.to}-resendvalidationemail-timeout`);
      }

      if (token) {
        const sendEmail = this.mailerprovider.sendValidateEmail(inputDto.to, token.token);

        await sendEmail;
        await this.cache.set(`${inputDto.to}-resendvalidationemail-timeout`, 'true', 60);

        return true;
      }
      return true;
    } catch (err: any) {
      throw new SendValidationEmailException('EMAIL_EXCEPTION');
    }
  }
}
