import { IHashAdapter } from '../ports/bcrypt';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import InvalidPasswordException from './errors/InvalidPassword';
import EstablishmentNotFoundException from './errors/EstablishmentNotFound';
import { LoginEstablishmentDto } from '../ports/dtos/loginEstablishmentDto';

export default class LoginEstablishmentUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly encoder: IHashAdapter,
    private readonly jwtToken: ITokenAdapter,
  ) {}

  async execute(inputDto: LoginEstablishmentDto): Promise<{ token: string } | null> {
    const establishmentExists = await this.establishmentRepo.getFullEstablishmentDataByEmail(inputDto.email);

    if (establishmentExists) {
      if (!establishmentExists?.validate_code && establishmentExists.validate_expire_date == null) {
        const checkpw = await this.encoder.compare(inputDto.password, establishmentExists.password);
        if (checkpw) {
          const token = this.jwtToken.sign({
            id: establishmentExists.id,
            email: establishmentExists.email,
            name: establishmentExists.name,
            type: establishmentExists.type,
          });
          return token;
        }
        throw new InvalidPasswordException('INVALID_PASS_OR_EMAIL');
      }
      throw new InvalidPasswordException('INVALID_PASS_OR_EMAIL');
    }
    throw new EstablishmentNotFoundException('INVALID_PASS_OR_EMAIL');
  }
}
