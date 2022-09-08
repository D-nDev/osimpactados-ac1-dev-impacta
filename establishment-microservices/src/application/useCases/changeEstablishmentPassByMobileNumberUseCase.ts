import { bcryptEncoder } from '../ports/bcrypt';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class ChangeEstablishmentPassByMobileNumberUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(mobileNumber: string, token: string, password: string, encoder: bcryptEncoder): Promise<boolean | null> {
    try {
      let currentUTCDate: any = new Date();
      currentUTCDate = new Date(currentUTCDate.toUTCString());

      const tokenexists = await this.establishmentRepo.getEstablishmentRecoverTokenByNumber(mobileNumber);

      if (tokenexists) {
        if (tokenexists?.token != token || currentUTCDate > tokenexists.expires_at!) {
          return false;
        }
        const establishmentId = await this.establishmentRepo.getEstablishmentIdByMobileNumber(mobileNumber);
        if (establishmentId?.id) {
          await this.establishmentRepo.updateEstablishmentByNumber(mobileNumber, { password: await encoder.hash(password) });
          await this.establishmentRepo.deleteRecoverCodeById(establishmentId!.id, tokenexists.token);
          return true;
        }
        return false;
      }

      return false;
    } catch (err: any) {
      return false;
    }
  }
}
