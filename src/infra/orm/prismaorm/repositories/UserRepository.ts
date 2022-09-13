import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { PrismaClient, RecoverCodes } from '@prisma/client';
import { IUserRepository } from '@application/ports/userRepository';
import UserEntity from '@domain/entities/User';
import AddressEntity from '@domain/entities/Address';

@singleton()
export default class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        type: true,
      },
    });
    return user;
  }

  public async getUserDataByEmail(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        addresses: true,
        cpf: true,
        mobileNumber: true,
      },
    });
    return user;
  }

  public async createUser(user: UserEntity) {
    const createUser = await this.prisma.user.create({
      data: {
        name: user.getName(),
        email: user.getEmail(),
        cpf: user.getCpf(),
        mobileNumber: user.getMobileNumber(),
        password: user.getPassword(),
        addresses: {
          createMany: {
            data: [
              ...user.getAddresses().map((address) => {
                return address;
              }),
            ],
          },
        },
      },
    });
    return { id: createUser.id, email: createUser.email };
  }

  public async overrideUser(user: UserEntity) {
    if (user.getAddresses()) {
      const overrideUser = await this.prisma.user.update({
        where: {
          email: user.getEmail(),
        },
        data: {
          name: user.getName(),
          cpf: user.getCpf(),
          mobileNumber: user.getMobileNumber(),
          password: user.getPassword(),
        },
      });

      await this.prisma.address.deleteMany({ where: { userId: overrideUser.id } });
      await this.prisma.recoverCodes.deleteMany({ where: { userId: overrideUser.id } });

      await this.prisma.address.createMany({
        data: [
          ...user.getAddresses().map((address) => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            address['userId'] = overrideUser.id;
            return address;
          }),
        ] as unknown as AddressEntity & { userId: string },
      });

      return { id: overrideUser.id, email: overrideUser.email };
    } else {
      const overrideUser = await this.prisma.user.update({
        where: {
          email: user.getEmail(),
        },
        data: {
          name: user.getName(),
          cpf: user.getCpf(),
          mobileNumber: user.getMobileNumber(),
          password: user.getPassword(),
        },
      });
      return { id: overrideUser.id, email: overrideUser.email };
    }
  }

  public async getUser(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        addresses: true,
        cpf: true,
      },
    });

    return user;
  }

  public async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        email: true,
        name: true,
        type: true,
        mobileNumber: true,
        addresses: {
          select: {
            address: true,
            addressComplement: true,
            addressDistrict: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cpf: true,
      },
    });
  }

  public async getFullUserData(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        password: true,
        type: true,
        addresses: {
          select: {
            address: true,
            addressComplement: true,
            addressDistrict: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cpf: true,
      },
    });
  }

  public async getFullUserDataByEmail(email: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        type: true,
        password: true,
        validate_code: true,
        validate_expire_date: true,
        addresses: {
          select: {
            address: true,
            addressComplement: true,
            addressDistrict: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cpf: true,
      },
    });
  }

  public async getFullUserDataByEmailNoThrow(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        type: true,
        password: true,
        validate_code: true,
        validate_expire_date: true,
        addresses: {
          select: {
            address: true,
            addressComplement: true,
            addressDistrict: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cpf: true,
      },
    });
  }

  public async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  public async updateUser(id: string, ...args: any) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...args,
      },
    });
  }

  public async updateUserByNumber(number: string, args: any) {
    const userId = await this.getUserIdByMobileNumber(number);
    if (userId?.id) {
      await this.prisma.user.update({
        where: {
          id: userId.id,
        },
        data: {
          ...args,
        },
      });
      return true;
    }
    return false;
  }

  public async updateUserByEmail(email: string, args: Record<string, any>) {
    const userId = await this.getUserIdByEmail(email);
    const updateUser = await this.prisma.user.update({
      where: {
        id: userId?.id,
      },
      data: {
        ...args,
      },
      select: {
        email: true,
        name: true,
        mobileNumber: true,
        password: true,
        addresses: {
          select: {
            address: true,
            addressComplement: true,
            addressDistrict: true,
            addressNumber: true,
            cep: true,
            city: true,
            state: true,
          },
        },
        cpf: true,
      },
    });
    return updateUser;
  }

  public async updateValidationCode(email: string, code: string | null, expire: Date | null) {
    await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        validate_code: code,
        validate_expire_date: expire,
      },
    });
  }

  public async getUserValidateToken(email: string): Promise<{ token: string; expireDate: Date } | null> {
    const token = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        validate_code: true,
        validate_expire_date: true,
      },
    });

    if (token?.validate_code && token.validate_expire_date) {
      return { token: token?.validate_code, expireDate: token?.validate_expire_date };
    }
    return null;
  }

  public async deleteUserDataByEmail(email: string): Promise<boolean> {
    await this.prisma.user.delete({
      where: {
        email,
      },
    });
    return true;
  }

  public async getUserIdByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
  }

  public async getUserIdByMobileNumber(mobileNumber: string) {
    return await this.prisma.user.findUnique({
      where: {
        mobileNumber,
      },
      select: {
        id: true,
      },
    });
  }

  public async updateRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean> {
    await this.prisma.recoverCodes.update({
      data: {
        expires_at: expires,
        userId: id,
        token,
      },
      where: {
        userId: id,
      },
    });
    return true;
  }

  public async createRecoverCodeById(id: string, token: string, expires: Date): Promise<boolean> {
    await this.prisma.recoverCodes.create({
      data: {
        expires_at: expires,
        userId: id,
        token,
      },
    });
    return true;
  }

  public async deleteRecoverCodeById(id: string, token: string): Promise<boolean> {
    await this.prisma.recoverCodes.deleteMany({
      where: {
        userId: id,
        token,
      },
    });
    return true;
  }

  public async getUserRecoverTokenByEmail(email: string): Promise<RecoverCodes | null> {
    const userId = await this.getUserIdByEmail(email);
    if (userId) {
      const result = await this.prisma.recoverCodes.findFirst({
        where: {
          userId: userId.id,
        },
      });
      if (result) {
        return result;
      }
      return null;
    }
    return null;
  }

  public async getUserRecoverTokenByNumber(mobileNumber: string): Promise<RecoverCodes | null> {
    const userId = await this.getUserIdByMobileNumber(mobileNumber);
    if (userId) {
      const result = await this.prisma.recoverCodes.findFirst({
        where: {
          userId: userId.id,
        },
      });
      if (result) {
        return result;
      }
      return null;
    }
    return null;
  }
}
