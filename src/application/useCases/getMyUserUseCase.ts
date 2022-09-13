import { GetMyUserDto } from '../ports/dtos/getMyUserDto';
import { MyUserDataDto } from '../ports/dtos/userDto';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class GetMyUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly jwtadapter: ITokenAdapter) {}

  async execute(inputDto: GetMyUserDto): Promise<MyUserDataDto> {
    const decodetoken = this.jwtadapter.decode(inputDto.token);

    const result = await this.userRepo.getUserDataByEmail(decodetoken.email);
    return result;
  }
}
