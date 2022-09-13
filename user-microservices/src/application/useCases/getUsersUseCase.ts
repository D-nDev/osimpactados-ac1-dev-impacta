import { UserWithoutPasswordDto } from '../ports/dtos/userDto';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class GetUsersUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(): Promise<UserWithoutPasswordDto[] | []> {
    const result = await this.userRepo.getUsers();
    return result;
  }
}
