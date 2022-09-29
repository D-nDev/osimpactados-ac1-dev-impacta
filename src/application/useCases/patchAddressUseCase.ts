import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { PatchAddressDto } from '../ports/dtos/patchAddressDto';

export default class PatchAddressUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly jwtadapter: ITokenAdapter) {}

  async execute(userToken: string, addressId: string, addressDto: PatchAddressDto) {
    const token = this.jwtadapter.decode(userToken);

    const result = await this.userRepo.updateAddress(token.id, addressId, addressDto);

    return result;
  }
}
