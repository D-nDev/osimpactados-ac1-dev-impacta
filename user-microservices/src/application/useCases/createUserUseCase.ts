import UserEntity from '@domain/entities/User';
import { bcryptEncoder } from '../ports/bcrypt';
import { IMapperAdapter } from '../ports/IMapperAdapter';
import { useCase } from '../ports/useCase';
import { userDto } from '../ports/userDto';
import { IUserRepository } from '../ports/userRepository';
import * as crypto from 'crypto';

export default class CreateUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly encoder: bcryptEncoder, private readonly mapper: IMapperAdapter) {}

  async execute(user: userDto): Promise<boolean | { id: string; email: string; }> {
    const userAddresses = this.mapper.fromAddressDtoToEntity(user.addresses);
    const userEntity = new UserEntity({...user, addresses: userAddresses, password: await this.encoder.hash(user.password)});
    const userExists = await this.userRepo.getFullUserDataByEmail(user.email);
    
    if(userExists) {
      if(!userExists.validate_code && !userExists.validate_expire_date) {
        return false;
      } else if(userExists.validate_code && new Date(new Date().toUTCString()) < userExists.validate_expire_date!) {
        return false;
      } else if(userExists.validate_code && new Date(new Date().toUTCString()) > userExists.validate_expire_date!) {

        const newtoken = crypto.randomBytes(20).toString('hex');

        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + 2 * 60 * 60 * 1000);

        const override = await this.userRepo.overrideUser(userEntity);
        await this.userRepo.updateValidationCode(userEntity.getEmail(), newtoken, expireDate);

        return { id: override.id, email: override.email }
      }
    }

    return await this.userRepo.createUser(userEntity);
  }
}
