import { bcryptEncoder } from '../ports/bcrypt';
import { useCase } from '../ports/useCase';
import { userDto } from '../ports/userDto';
import { IUserRepository } from '../ports/userRepository';

export default class CreateUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly encoder: bcryptEncoder) {}

  async execute(user: userDto): Promise<any> {
    return await this.userRepo.createUser({...user, password: await this.encoder.hash(user.password)});
  }
}
