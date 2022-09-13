import { DeleteUserDto } from '../ports/dtos/deleteUserDto';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class DeleteUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(inputDto: DeleteUserDto): Promise<void> {
    return await this.userRepo.deleteUser(inputDto.id);
  }
}
