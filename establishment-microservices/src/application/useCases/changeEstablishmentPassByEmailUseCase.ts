import { bcryptEncoder } from '../ports/bcrypt';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class ChangeEstablishmentPassByEmailUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(email: string, token: string, password: string, encoder: bcryptEncoder): Promise<boolean | null> {
    try {
      let currentUTCDate: any = new Date();
      currentUTCDate = new Date(currentUTCDate.toUTCString());

      const tokenexists = await this.establishmentRepo.getEstablishmentRecoverTokenByEmail(email);

      if (tokenexists) {
        if (tokenexists?.token != token || currentUTCDate > tokenexists.expires_at!) {
          return false;
        }
        const establishmentId = await this.establishmentRepo.getEstablishmentIdByEmail(email);
        if (establishmentId?.id) {
          await this.establishmentRepo.updateEstablishmentByEmail(email, { password: await encoder.hash(password) });
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
