/* eslint-disable no-extra-boolean-cast */
import UserEntity from '@domain/entities/User';
import { bcryptEncoder } from '../ports/bcrypt';
import { IMapperAdapter } from '../ports/IMapperAdapter';
import { useCase } from '../ports/useCase';
import { UserDto } from '../ports/dtos/userDto';
import { IUserRepository } from '../ports/userRepository';
import UserAlreadyExistsException from './errors/UserAlreadyExists';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import * as crypto from 'crypto';
import { IDateAdapter } from '../ports/IDateAdapter';
import ValidateTokenExpired from './errors/ValidateTokenExpired';
export default class CreateUserUseCase implements useCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly encoder: bcryptEncoder,
    private readonly mapper: IMapperAdapter,
    private readonly cache: IMemoryCacheAdapter,
    private readonly dateMoment: IDateAdapter,
  ) {}

  async execute(user: UserDto): Promise<{ email: string; token: string; expireDate: any }> {
    const userAddresses = this.mapper.fromAddressDtoToEntity(user.addresses);
    const userEntity = new UserEntity({
      ...user,
      addresses: userAddresses,
      password: await this.encoder.hash(user.password),
    });

    const userExists = await this.userRepo.getFullUserDataByEmailNoThrow(user.email);
    const userPendingValidation = await this.cache.getJson<UserDto & { token: string; expireDate: any }>(
      `pending-${user.email}`,
    );

    if (userExists != null) {
      if (!userExists.validate_code && userExists.validate_expire_date == null) {
        throw new UserAlreadyExistsException('USER_ALREADY_EXISTS');
      }
    } else if (!!userPendingValidation) {
      if (!this.dateMoment.compareWithCurrentUTCDate(new Date(userPendingValidation.expireDate).toISOString())) {
        throw new UserAlreadyExistsException('USER_ALREADY_EXISTS');
      } else {
        throw new ValidateTokenExpired('USER_ALREADY_EXISTS');
      }
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expireDate = this.dateMoment.addHoursToUTCDate(new Date().toISOString(), 2);

    await this.cache.set(`pending-${user.email}`, JSON.stringify({ ...userEntity, token, expireDate }), 7200);
    return { email: user.email, token, expireDate };
  }
}
