import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '@app/src/application/ports/userRepository';
import UserEntity from '@app/src/domain/entities/User';

export default class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getUserByEmail(email: string): Promise<{ email: string, name: string, type: string } | null> {
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
    return { id: createUser.id };
  }

  public async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
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
    return await this.prisma.user.findUnique({
      where: {
        email,
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
  }

  public async deleteUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
