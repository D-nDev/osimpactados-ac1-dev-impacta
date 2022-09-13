import UnknownErrorException from '@shared/errors/UnknownError';
import { bcryptEncoder } from '../ports/bcrypt';
import { IDateAdapter } from '../ports/IDateAdapter';
import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import InvalidRecoverTokenException from './errors/InvalidRecoverToken';
import RecoverTokenExpired from './errors/RecoverTokenExpired';
import RecoverTokenNotFoundException from './errors/RecoverTokenNotFound';
import EstablishmentNotFoundException from './errors/EstablishmentNotFound';
import { ChangePassDtoEmail } from '../ports/dtos/changePassDtoEmail';

export default class ChangeEstablishmentPassByEmailUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly dateMoment: IDateAdapter,
    private readonly encoder: bcryptEncoder,
  ) {}

  async execute(inputDto: ChangePassDtoEmail): Promise<boolean | null> {
    const tokenexists = await this.establishmentRepo.getEstablishmentRecoverTokenByEmail(inputDto.email);

    if (tokenexists) {
      if (tokenexists?.token !== inputDto.token) {
        throw new InvalidRecoverTokenException('INVALID_TOKEN');
      } else if (this.dateMoment.compareWithCurrentUTCDate(new Date(tokenexists.expires_at).toISOString())) {
        throw new RecoverTokenExpired('EXPIRED_TOKEN');
      }
      const establishmentId = await this.establishmentRepo.getEstablishmentIdByEmail(inputDto.email);
      if (establishmentId?.id) {
        const updateEstablishmentByEmail = await this.establishmentRepo.updateEstablishmentByEmail(inputDto.email, {
          password: await this.encoder.hash(inputDto.password),
        });
        const deleteOldToken = await this.establishmentRepo.deleteRecoverCodeById(
          establishmentId.id,
          tokenexists.token,
        );

        if (updateEstablishmentByEmail && deleteOldToken) {
          return true;
        }
        throw new UnknownErrorException('UNKNOWN_ERROR');
      }
      throw new EstablishmentNotFoundException('INVALID_TOKEN');
    }

    throw new RecoverTokenNotFoundException('INVALID_TOKEN');
  }
}
