/* eslint-disable no-extra-boolean-cast */
import { bcryptEncoder } from '../ports/bcrypt';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';

export default class LoginEstablishmentUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly encoder: bcryptEncoder,
    private readonly jwtToken: ITokenAdapter,
  ) {}

  async execute(email: string, password: string): Promise<string | null> {
    const establishmentExists = await this.establishmentRepo.getFullEstablishmentDataByEmail(email);

    if (establishmentExists && !establishmentExists.validate_code && !establishmentExists.validate_expire_date) {
      const checkpw = await this.encoder.compare(password, establishmentExists.password);
      if (checkpw) {
        const establishmentData = await this.establishmentRepo.getEstablishmentByEmail(establishmentExists.email);
        if (!!establishmentData) {
          const token = this.jwtToken.sign(establishmentData);
          return token;
        }
      }
    }
    return await Promise.resolve(null);
  }
}
