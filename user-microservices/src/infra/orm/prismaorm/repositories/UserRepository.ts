import { userMapper } from "@app/src/infra/mappers/userMapper";
import { userDto } from "@application/ports/userDto";
import { PrismaClient } from "@prisma/client";

export default class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async createUser(userDto: userDto) {
    const mapper = userMapper()
    const userEntity = mapper.fromDtoToEntity(userDto);
    const data = await this.prisma.user.create({
      data: {
        ...userEntity
      }
    })
    const result = mapper.fromPersistenceToDto(data);
    return result;
  }

  public getUser(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id
      }
    });
  }

  public getUsers() {
    return this.prisma.user.findMany({});
  }
}