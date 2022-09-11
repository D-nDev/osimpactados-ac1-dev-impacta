import { ITokenAdapter } from '../ports/ITokenAdapter';
import { useCase } from '../ports/useCase';
import { IUserRepository, myUserData } from '../ports/userRepository';

export default class GetMyUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly jwtadapter: ITokenAdapter) {}

  async execute(token: string): Promise<myUserData | null> {

    const decodetoken = this.jwtadapter.decode(token);

    const result = await this.userRepo.getUserDataByEmail(decodetoken.email);
    return result;
  }
}
