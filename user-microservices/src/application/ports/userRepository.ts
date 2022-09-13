import UserEntity from '@domain/entities/User';
import { MyUserDataDto, RecoverCodes, UserDto, UserWithoutPasswordDto } from './dtos/userDto';

export interface IUserRepository {
  createUser: (user: UserEntity) => Promise<{ id: string; email: string }>;
  getUser: (id: string) => Promise<UserWithoutPasswordDto | null>;
  getUsers: () => Promise<UserWithoutPasswordDto[] | []>;
  getFullUserData: (id: string) => Promise<(UserDto & { type: string }) | null>;
  getFullUserDataByEmail: (
    email: string,
  ) => Promise<UserDto & { validate_code: string | null; validate_expire_date: Date | null; type: string }>;
  getFullUserDataByEmailNoThrow: (
    email: string,
  ) => Promise<(UserDto & { validate_code: string | null; validate_expire_date: Date | null; type: string }) | null>;
  deleteUser: (id: string) => Promise<void>;
  getUserByEmail: (email: string) => Promise<{ email: string; name: string; type: string } | null>;
  updateValidationCode: (email: string, code: string | null, expire: Date | null) => Promise<void>;
  getUserValidateToken: (email: string) => Promise<{ token: string; expireDate: Date | null } | null>;
  updateUser: (email: string, ...args: any) => Promise<void>;
  updateUserByNumber: (number: string, ...args: any) => Promise<boolean>;
  updateUserByEmail: (email: string, ...args: any) => Promise<UserDto | null>;
  overrideUser: (user: UserEntity) => Promise<{ id: string; email: string }>;
  getUserDataByEmail: (email: string) => Promise<MyUserDataDto>;
  deleteUserDataByEmail: (email: string) => Promise<boolean>;
  deleteRecoverCodeById: (id: string, token: string) => Promise<boolean>;
  getUserIdByEmail: (email: string) => Promise<{
    id: string;
  } | null>;
  getUserIdByMobileNumber: (email: string) => Promise<{
    id: string;
  } | null>;
  getUserRecoverTokenByEmail: (email: string) => Promise<RecoverCodes | null>;
  getUserRecoverTokenByNumber: (mobileNumber: string) => Promise<RecoverCodes | null>;
  updateRecoverCodeById: (id: string, token: string, expires: Date) => Promise<boolean>;
  createRecoverCodeById: (id: string, token: string, expires: Date) => Promise<boolean>;
}
