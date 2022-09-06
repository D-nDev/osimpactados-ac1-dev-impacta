import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class DeleteUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string): Promise<void> {
    return await this.userRepo.deleteUser(id);
  }
}
