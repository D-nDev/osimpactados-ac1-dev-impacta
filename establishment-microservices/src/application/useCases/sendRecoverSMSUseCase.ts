import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { ITwilioAdapter } from '../ports/ITwilioAdapter';

export default class SendRecoverSMSUseCase implements useCase {
  constructor(private readonly smsprovider: ITwilioAdapter, private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(to: string): Promise<boolean> {
    try {
      const token = Math.random().toString().substring(2, 8);
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + 2 * 60 * 60 * 1000);

      const establishmentId = await this.establishmentRepo.getEstablishmentIdByMobileNumber(to);
      if (establishmentId) {
        const tokenAlreadyExists = await this.establishmentRepo.getEstablishmentRecoverTokenByNumber(to);
        if (tokenAlreadyExists) {
          await this.establishmentRepo.updateRecoverCodeById(establishmentId!.id, token, expireDate);
          await this.smsprovider.sendRecoverSMS(to, token);
        } else {
          await this.establishmentRepo.createRecoverCodeById(establishmentId!.id, token, expireDate);
          await this.smsprovider.sendRecoverSMS(to, token);
        }

        return true;
      } else {
        throw { code: 'INVALID_NUMBER' };
      }
    } catch (err: any) {
      throw { code: err.code } || false;
    }
  }
}
