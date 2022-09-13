import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import * as crypto from 'crypto';
import EmailAdapter from '@infra/adapters/email-adapter';
import SendRecoverEmailEstablishmentNotFoundException from './errors/SendRecoverEmailEstablishmentNotFound';
import { IDateAdapter } from '../ports/IDateAdapter';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { SendRecoverEmailDto } from '../ports/dtos/sendRecoverEmailDto';

export default class SendRecoverEmailUseCase implements useCase {
  constructor(
    private readonly emailprovider: EmailAdapter,
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly dateMoment: IDateAdapter,
    private readonly cache: IMemoryCacheAdapter,
  ) {}

  async execute(inputDto: SendRecoverEmailDto): Promise<boolean | number | null> {
    const token = crypto.randomBytes(20).toString('hex');
    const expireDate = this.dateMoment.addHoursToUTCDate(new Date().toISOString(), 2);

    const establishmentId = await this.establishmentRepo.getEstablishmentIdByEmail(inputDto.to);
    if (establishmentId != null) {
      const isTimedOut = await this.cache.get(`${inputDto.to}-updaterecoveremail-timeout`);
      if (isTimedOut) {
        return await this.cache.getTTL(`${inputDto.to}-updaterecoveremail-timeout`);
      }
      const tokenAlreadyExists = await this.establishmentRepo.getEstablishmentRecoverTokenByEmail(inputDto.to);
      if (tokenAlreadyExists) {
        const updateCode = await this.establishmentRepo.updateRecoverCodeById(
          establishmentId.id,
          token,
          expireDate as unknown as Date,
        );
        const sendEmail = await this.emailprovider.sendRecoverEmail(inputDto.to, token);
        if (updateCode && sendEmail) {
          await this.cache.set(`${inputDto.to}-updaterecoveremail-timeout`, 'true', 600);
          return true;
        }
      } else {
        const createCode = await this.establishmentRepo.createRecoverCodeById(
          establishmentId.id,
          token,
          expireDate as unknown as Date,
        );
        const sendEmail = await this.emailprovider.sendRecoverEmail(inputDto.to, token);
        if (createCode && sendEmail) {
          await this.cache.set(`${inputDto.to}-updaterecoveremail-timeout`, 'true', 600);
          return true;
        }
      }
    }
    throw new SendRecoverEmailEstablishmentNotFoundException('ESTABLISHMENT_NOT_FOUND');
  }
}
