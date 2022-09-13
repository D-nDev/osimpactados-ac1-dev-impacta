import { GetUserDto } from '../ports/dtos/getUserDto';
import { UserWithoutPasswordDto } from '../ports/dtos/userDto';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class GetUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(inputDto: GetUserDto): Promise<UserWithoutPasswordDto | null> {
    const result = await this.userRepo.getUser(inputDto.id);
    return result;
  }
}
