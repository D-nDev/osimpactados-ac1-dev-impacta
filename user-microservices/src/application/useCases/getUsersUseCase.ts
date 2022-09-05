import { useCase } from '../ports/useCase';
import { IUserRepository, userWithoutPassword } from '../ports/userRepository';

export default class GetUsersUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(): Promise<userWithoutPassword[] | null> {
    const result = await this.userRepo.getUsers();
    return result;
  }
}
