import { userMapper, AddressMapper } from '@infra/mappers/userMapper';
import { userDto } from '@application/ports/userDto';
import { PrismaClient } from '@prisma/client';

export default class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async createUser(userDto: userDto) {
    const usermapper = userMapper();
    const userEntity = usermapper.fromDtoToEntity(userDto);
    const userAddresses = AddressMapper().fromDtoToPersistence(userDto.addresses);

    const createUser = await this.prisma.user.create({
      data: {
        name: userEntity.getEmail(),
        email: userEntity.getEmail(),
        mobileNumber: userEntity.getMobileNumber(),
        password: userEntity.getPassword(),
        cpf: userEntity.getCpf(),
        addresses: {
          createMany: {
            data: [...userAddresses]
          }
        }
      },
      include: {
        addresses: true,
      }
    });

    const result = usermapper.fromPersistenceToDto(createUser);
    return result;
  }

  public getUser(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        addresses: true,
      },
    });
  }

  public getUsers() {
    return this.prisma.user.findMany({ include: { addresses: true } });
  }
}
