import UserEntity from '@app/src/domain/entities/User';
import { bcryptEncoder } from '../ports/bcrypt';
import { IMapper } from '../ports/IMapper';
import { useCase } from '../ports/useCase';
import { userDto } from '../ports/userDto';
import { IUserRepository } from '../ports/userRepository';

export default class CreateUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly encoder: bcryptEncoder, private readonly mapper: IMapper) {}

  async execute(user: userDto): Promise<{ id: string }> {
    const userAddresses = this.mapper.fromAddressDtoToEntity(user.addresses);
    const userEntity = new UserEntity({...user, addresses: userAddresses, password: await this.encoder.hash(user.password)})
    return await this.userRepo.createUser(userEntity);
  }
}
