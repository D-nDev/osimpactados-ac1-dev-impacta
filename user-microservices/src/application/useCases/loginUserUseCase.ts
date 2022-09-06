import { bcryptEncoder } from '../ports/bcrypt';
import { jwtToken } from '../ports/jwt';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';

export default class LoginUserUseCase implements useCase {
  constructor(private readonly userRepo: IUserRepository, private readonly encoder: bcryptEncoder, private readonly jwtToken: jwtToken) {}

  async execute(email: string, password: string): Promise<string | null> {
    const userExists = await this.userRepo.getFullUserDataByEmail(email);

    if(userExists) {
      const checkpw = await this.encoder.compare(password, userExists.password);
      if(checkpw) {
        const userData = await this.userRepo.getUserByEmail(userExists.email);
        if(!!userData) {
          const token = this.jwtToken.sign(userData);
          return token;
        }
      }
    }
    return Promise.resolve(null);
  }
}
