import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { CreateAddressDto } from '../ports/dtos/createAddressDto';

export default class CreateAddressUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly jwtadapter: ITokenAdapter) {}

  async execute(userToken: string, addressDto: CreateAddressDto) {
    const token = this.jwtadapter.decode(userToken);

    const result = await this.userRepo.createAddress(token.id, addressDto);

    return result;
  }
}
