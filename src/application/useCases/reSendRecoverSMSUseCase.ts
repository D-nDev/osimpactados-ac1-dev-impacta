import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { ISMSAdapter } from '../ports/ISMSAdapter';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { ReSendRecoverSMSDto } from '../ports/dtos/reSendRecoverSMSDto';

export default class ReSendRecoverSMSUseCase implements useCase {
  constructor(
    private readonly smsprovider: ISMSAdapter,
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly cache: IMemoryCacheAdapter,
  ) {}

  async execute(inputDto: ReSendRecoverSMSDto): Promise<boolean | number> {
    const token = await this.establishmentRepo.getEstablishmentRecoverTokenByNumber(inputDto.to);
    const isTimedOut = await this.cache.get(`${inputDto.to}-resendrecoversms-timeout`);

    if (isTimedOut) {
      return await this.cache.getTTL(`${inputDto.to}-resendrecoversms-timeout`);
    }

    if (token) {
      const sendEmail = this.smsprovider.sendRecoverSMS(inputDto.to, token.token);

      await sendEmail;
      await this.cache.set(`${inputDto.to}-resendrecoversms-timeout`, 'true', 60);
    }
    return true;
  }
}
