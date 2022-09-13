import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { ISMSAdapter } from '../ports/ISMSAdapter';
import SendRecoverSMSEstablishmentNotFoundException from './errors/SendRecoverSMSEstablishmentNotFound';
import { IDateAdapter } from '../ports/IDateAdapter';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { SendRecoverSMSDto } from '../ports/dtos/sendRecoverSMSDto';

export default class SendRecoverSMSUseCase implements useCase {
  constructor(
    private readonly smsprovider: ISMSAdapter,
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly dateMoment: IDateAdapter,
    private readonly cache: IMemoryCacheAdapter,
  ) {}

  async execute(inputDto: SendRecoverSMSDto): Promise<boolean | null | number> {
    const token = Math.random().toString().substring(2, 8);
    const expireDate = this.dateMoment.addHoursToUTCDate(new Date().toISOString(), 2);

    const establishmentId = await this.establishmentRepo.getEstablishmentIdByMobileNumber(inputDto.to);
    if (establishmentId != null) {
      const isTimedOut = await this.cache.get(`${inputDto.to}-updaterecoversms-timeout`);
      if (isTimedOut) {
        return await this.cache.getTTL(`${inputDto.to}-updaterecoversms-timeout`);
      }
      const tokenAlreadyExists = await this.establishmentRepo.getEstablishmentRecoverTokenByNumber(inputDto.to);
      if (tokenAlreadyExists) {
        const updateCode = await this.establishmentRepo.updateRecoverCodeById(
          establishmentId.id,
          token,
          expireDate as unknown as Date,
        );
        const sendSMS = await this.smsprovider.sendRecoverSMS(inputDto.to, token);
        if (updateCode && sendSMS) {
          await this.cache.set(`${inputDto.to}-updaterecoversms-timeout`, 'true', 600);
          return true;
        }
      } else {
        const createCode = await this.establishmentRepo.createRecoverCodeById(
          establishmentId.id,
          token,
          expireDate as unknown as Date,
        );
        const sendSMS = await this.smsprovider.sendRecoverSMS(inputDto.to, token);
        if (createCode && sendSMS) {
          await this.cache.set(`${inputDto.to}-updaterecoversms-timeout`, 'true', 600);
          return true;
        }
      }
    }
    throw new SendRecoverSMSEstablishmentNotFoundException('ESTABLISHMENT_NOT_FOUND');
  }
}
