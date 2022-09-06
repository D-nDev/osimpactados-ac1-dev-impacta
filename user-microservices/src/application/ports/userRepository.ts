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
  createUser(user: UserEntity): Promise<{ id: string }>;
  getUser(id: string): Promise<userWithoutPassword | null>;
  getUsers(): Promise<userWithoutPassword[] | null>;
  getFullUserData(id: string): Promise<userDto | null>;
  getFullUserDataByEmail(email: string): Promise<userDto | null>;
  deleteUser(id: string): Promise<void>;
  getUserByEmail(email: string): Promise<{ email: string, name: string, type: string } | null>;
}
