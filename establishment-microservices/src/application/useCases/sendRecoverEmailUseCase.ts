import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import * as crypto from 'crypto';
import EmailAdapter from '@app/src/infra/adapters/email-adapter';

export default class SendRecoverEmailUseCase implements useCase {
  constructor(private readonly emailprovider: EmailAdapter, private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(to: string): Promise<boolean> {
    try {
      const token = crypto.randomBytes(20).toString('hex');
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 2 * 60 * 60 * 1000);

      const establishmentId = await this.establishmentRepo.getEstablishmentIdByEmail(to);
      if (establishmentId) {
        const tokenAlreadyExists = await this.establishmentRepo.getEstablishmentRecoverTokenByEmail(to);
        if (tokenAlreadyExists) {
          await this.establishmentRepo.updateRecoverCodeById(establishmentId!.id, token, expireDate);
          await this.emailprovider.sendRecoverEmail(to, token);
        } else {
          await this.establishmentRepo.createRecoverCodeById(establishmentId!.id, token, expireDate);
          await this.emailprovider.sendRecoverEmail(to, token);
        }

        return true;
      } else {
        throw { code: 'INVALID_EMAIL' };
      }
    } catch (err: any) {
      throw { code: err.code } || false;
    }
  }
}
