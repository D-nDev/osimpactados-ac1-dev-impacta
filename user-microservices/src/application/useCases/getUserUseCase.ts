import { useCase } from '../ports/useCase';
import { IUserRepository, userWithoutPassword } from '../ports/userRepository';

export default class GetUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string): Promise<userWithoutPassword | null> {
    const result = await this.userRepo.getUser(id);
    return result;
  }
}
