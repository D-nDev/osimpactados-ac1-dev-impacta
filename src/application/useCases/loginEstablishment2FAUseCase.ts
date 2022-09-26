import { IHashAdapter } from '../ports/bcrypt';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import InvalidPasswordException from './errors/InvalidPassword';
import EstablishmentNotFoundException from './errors/EstablishmentNotFound';
import { LoginEstablishmentDto } from '../ports/dtos/loginEstablishmentDto';
import InvalidTwoFactorTokenException from './errors/InvalidTwoFactorToken';
import { ITwoFactorAdapter } from '../ports/ITwoFactorAdapter';

export default class LoginEstablishment2FAUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly encoder: IHashAdapter,
    private readonly jwtToken: ITokenAdapter,
    private readonly twofactor: ITwoFactorAdapter,
  ) {}

  async execute(inputDto: LoginEstablishmentDto): Promise<{ token: string } | null> {
    const establishmentExists = await this.establishmentRepo.getFullEstablishmentDataByEmail(inputDto.email);

    if (establishmentExists) {
      if (
        !establishmentExists?.validate_code &&
        establishmentExists.validate_expire_date == null &&
        establishmentExists.twofactor_enabled &&
        establishmentExists.twofactor_secret
      ) {
        if (!inputDto.code) {
          throw new InvalidTwoFactorTokenException('INVALID_TWOFACTOR_CODE');
        }
        const checkpw = await this.encoder.compare(inputDto.password, establishmentExists.password);
        if (checkpw) {
          const isValid2FA = this.twofactor.verifyToken(establishmentExists.twofactor_secret ?? '', inputDto.code);

          if (isValid2FA) {
            const token = this.jwtToken.sign({
              id: establishmentExists.id,
              email: establishmentExists.email,
              name: establishmentExists.name,
              type: establishmentExists.type,
            });
            return token;
          }
          throw new InvalidTwoFactorTokenException('INVALID_TWOFACTOR_CODE');
        }
        throw new InvalidPasswordException('INVALID_PASS_OR_EMAIL');
      }
      throw new InvalidPasswordException('INVALID_PASS_OR_EMAIL');
    }
    throw new EstablishmentNotFoundException('INVALID_PASS_OR_EMAIL');
  }
}
