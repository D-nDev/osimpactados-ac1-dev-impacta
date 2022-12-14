import { bcryptEncoder } from '../ports/bcrypt';
import { LoginUserDto } from '../ports/dtos/loginUserDto';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { useCase } from '../ports/useCase';
import { IUserRepository } from '../ports/userRepository';
import InvalidPasswordException from './errors/InvalidPassword';
import UserNotFoundException from './errors/UserNotFound';

export default class LoginUserUseCase implements useCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly encoder: bcryptEncoder,
    private readonly jwtToken: ITokenAdapter,
  ) {}

  async execute(inputDto: LoginUserDto): Promise<{ token: string } | null> {
    const userExists = await this.userRepo.getFullUserDataByEmail(inputDto.email);

    if (userExists) {
      if (!userExists.validate_code && userExists.validate_expire_date == null) {
        const checkpw = await this.encoder.compare(inputDto.password, userExists.password);
        if (checkpw) {
          const token = this.jwtToken.sign({ email: userExists.email, name: userExists.name, type: userExists.type });
          return token;
        }
        throw new InvalidPasswordException('INVALID_PASS_OR_EMAIL');
      }
      throw new InvalidPasswordException('INVALID_PASS_OR_EMAIL');
    }
    throw new UserNotFoundException('INVALID_PASS_OR_EMAIL');
  }
}
