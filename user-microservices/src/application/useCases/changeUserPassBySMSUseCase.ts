import UnknownErrorException from '@shared/errors/UnknownError';
import { bcryptEncoder } from '../ports/bcrypt';
import { ChangePassDtoSMS } from '../ports/dtos/changePassDtoSMS';
import { IDateAdapter } from '../ports/IDateAdapter';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import InvalidRecoverTokenException from './errors/InvalidRecoverToken';
import RecoverTokenExpired from './errors/RecoverTokenExpired';
import RecoverTokenNotFoundException from './errors/RecoverTokenNotFound';
import UserNotFoundException from './errors/UserNotFound';

export default class ChangeUserPassSMSUseCase implements useCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly dateMoment: IDateAdapter,
    private readonly encoder: bcryptEncoder,
  ) {}

  async execute(inputDto: ChangePassDtoSMS): Promise<boolean | null> {
    const tokenexists = await this.userRepo.getUserRecoverTokenByNumber(inputDto.mobileNumber);

    if (tokenexists) {
      if (tokenexists?.token !== inputDto.token) {
        throw new InvalidRecoverTokenException('INVALID_TOKEN');
      } else if (this.dateMoment.compareWithCurrentUTCDate(new Date(tokenexists.expires_at).toISOString())) {
        throw new RecoverTokenExpired('EXPIRED_TOKEN');
      }
      const userId = await this.userRepo.getUserIdByMobileNumber(inputDto.mobileNumber);
      if (userId?.id) {
        const updateUserbyNumber = await this.userRepo.updateUserByNumber(inputDto.mobileNumber, {
          password: await this.encoder.hash(inputDto.password),
        });
        const deleteOldToken = await this.userRepo.deleteRecoverCodeById(userId.id, tokenexists.token);
        if (updateUserbyNumber && deleteOldToken) {
          return true;
        }
        throw new UnknownErrorException('UNKNOWN_ERROR');
      }
      throw new UserNotFoundException('INVALID_TOKEN');
    }

    throw new RecoverTokenNotFoundException('INVALID_TOKEN');
  }
}
