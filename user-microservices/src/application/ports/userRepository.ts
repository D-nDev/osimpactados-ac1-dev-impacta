import UserEntity from '@domain/entities/User';
import { Address, RecoverCodes } from '@prisma/client';
import { AddressesDto, userDto } from './userDto';

export type userWithoutPassword = {
  email: string;
  name: string;
  mobileNumber: string;
  addresses: AddressesDto[];
  cpf: string;
};

export type myUserData = {
  email: string;
  name: string;
  cpf: string;
  mobileNumber: string;
  addresses: Address[];
};

export interface IUserRepository {
  createUser(user: UserEntity): Promise<{ id: string; email: string }>;
  getUser(id: string): Promise<userWithoutPassword | null>;
  getUsers(): Promise<userWithoutPassword[] | null>;
  getFullUserData(id: string): Promise<userDto | null>;
  getFullUserDataByEmail(email: string): Promise<(userDto & { validate_code: string | null; validate_expire_date: Date | null }) | null>;
  deleteUser(id: string): Promise<void>;
  getUserByEmail(email: string): Promise<{ email: string; name: string; type: string } | null>;
  updateValidationCode(email: string, code: string | null, expire: Date | null): Promise<void>;
  getUserValidateToken(email: string): Promise<{ token: string; expireDate: Date | null } | null>;
  updateUser(email: string, ...args: any): Promise<void>;
  updateUserByNumber(number: string, ...args: any): Promise<boolean>;
  updateUserByEmail(email: string, ...args: any): Promise<userDto | null>;
  overrideUser(user: UserEntity): Promise<{ id: string; email: string }>;
  getUserDataByEmail(email: string): Promise<myUserData | null>;
  deleteUserDataByEmail(email: string): Promise<boolean>;
  deleteRecoverCodeById(id: string, token: string): Promise<boolean>;
  getUserIdByEmail(email: string): Promise<{
    id: string;
  } | null>;
  getUserIdByMobileNumber(email: string): Promise<{
    id: string;
  } | null>;
  getUserRecoverTokenByEmail(email: string): Promise<RecoverCodes | null>;
  getUserRecoverTokenByNumber(mobileNumber: string): Promise<RecoverCodes | null>;
  updateRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean>;
  createRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean>;
}
