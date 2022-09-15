import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { useCase } from '../ports/useCase';

export default class BlackListRecoverTokenUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  public async execute(token: string, email: string) {
    const targetToken = await this.establishmentRepo.getEstablishmentRecoverTokenByEmail(email);

    if (targetToken?.token === token) {
      const establishmentId = await this.establishmentRepo.getEstablishmentIdByEmail(email);

      return await this.establishmentRepo.blackListRecoverToken(establishmentId!.id, token);
    }
    return false;
  }
}
