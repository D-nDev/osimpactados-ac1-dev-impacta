import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class ValidateEstablishmentUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(email: string, token: string): Promise<boolean> {
    try {
      let currentUTCDate: any = new Date();
      currentUTCDate = new Date(currentUTCDate.toUTCString());

      const tokenexists = await this.establishmentRepo.getEstablishmentValidateToken(email);

      if (tokenexists) {
        if (tokenexists?.token != token || currentUTCDate > tokenexists.expireDate!) {
          return false;
        }
        await this.establishmentRepo.updateValidationCode(email, null, null);
        return true;
      }

      return false;
    } catch (err: any) {
      return false;
    }
  }
}
