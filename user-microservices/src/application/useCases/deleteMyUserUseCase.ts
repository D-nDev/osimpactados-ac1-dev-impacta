import { DeleteMyUserDto } from '../ports/dtos/deleteMyUserDto';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class DeleteMyUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly jwtadapter: ITokenAdapter) {}

  async execute(inputDto: DeleteMyUserDto): Promise<boolean | null> {
    const decodetoken = this.jwtadapter.decode(inputDto.token);

    const result = await this.userRepo.deleteUserDataByEmail(decodetoken.email);
    return result;
  }
}
