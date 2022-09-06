import UserEntity from '@app/src/domain/entities/User';
import { AddressesDto, userDto } from './userDto';

export type userWithoutPassword = {
  email: string;
  name: string;
  mobileNumber: string;
  addresses: AddressesDto[];
  cpf: string;
};

export interface IUserRepository {
  createUser(user: UserEntity): Promise<{ id: string; email: string }>;
  getUser(id: string): Promise<userWithoutPassword | null>;
  getUsers(): Promise<userWithoutPassword[] | null>;
  getFullUserData(id: string): Promise<userDto | null>;
  getFullUserDataByEmail(email: string): Promise<(userDto & { validate_code: string | null, validate_expire_date: Date | null }) | null>;
  deleteUser(id: string): Promise<void>;
  getUserByEmail(email: string): Promise<{ email: string; name: string; type: string } | null>;
  updateValidationCode(email: string, code: string | null, expire: Date | null): Promise<void>;
  getUserValidateToken(email: string): Promise<{ token: string; expireDate: Date | null } | null>;
  updateUser(email: string, ...args: any): Promise<void>;
}
