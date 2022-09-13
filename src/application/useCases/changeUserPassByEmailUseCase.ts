import UnknownErrorException from '@shared/errors/UnknownError';
import { bcryptEncoder } from '../ports/bcrypt';
import { ChangePassDtoEmail } from '../ports/dtos/changePassDtoEmail';
import { IDateAdapter } from '../ports/IDateAdapter';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import InvalidRecoverTokenException from './errors/InvalidRecoverToken';
import RecoverTokenExpired from './errors/RecoverTokenExpired';
import RecoverTokenNotFoundException from './errors/RecoverTokenNotFound';
import UserNotFoundException from './errors/UserNotFound';

export default class ChangeUserPassByEmailUseCase implements useCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly dateMoment: IDateAdapter,
    private readonly encoder: bcryptEncoder,
  ) {}

  async execute(inputDto: ChangePassDtoEmail): Promise<boolean | null> {
    const tokenexists = await this.userRepo.getUserRecoverTokenByEmail(inputDto.email);

    if (tokenexists) {
      if (tokenexists?.token !== inputDto.token) {
        throw new InvalidRecoverTokenException('INVALID_TOKEN');
      } else if (this.dateMoment.compareWithCurrentUTCDate(new Date(tokenexists.expires_at).toISOString())) {
        throw new RecoverTokenExpired('EXPIRED_TOKEN');
      }
      const userId = await this.userRepo.getUserIdByEmail(inputDto.email);
      if (userId?.id) {
        const updateUserByEmail = await this.userRepo.updateUserByEmail(inputDto.email, {
          password: await this.encoder.hash(inputDto.password),
        });
        const deleteOldToken = await this.userRepo.deleteRecoverCodeById(userId.id, tokenexists.token);

        if (updateUserByEmail && deleteOldToken) {
          return true;
        }
        throw new UnknownErrorException('UNKNOWN_ERROR');
      }
      throw new UserNotFoundException('INVALID_TOKEN');
    }

    throw new RecoverTokenNotFoundException('INVALID_TOKEN');
  }
}
