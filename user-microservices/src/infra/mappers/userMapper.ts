import UserEntity from '@domain/entities/User';
import { userDto } from '@application/ports/userDto';
import { User } from '@prisma/client';

export const userMapper = () => {
  return {
    fromDtoToEntity: (dto: userDto) => {
      return {
        email: dto.email,
        name: dto.name,
        mobileNumber: dto.mobileNumber,
        address: dto.address,
        addressNumber: dto.addressNumber || 0,
        password: dto.password,
        state: dto.state,
        city: dto.city,
        cpf: dto.cpf,
      };
    },
    fromPersistenceToDto: (userPersistence: User): UserEntity => {
      const user = {
        email: userPersistence.email,
        name: userPersistence.name,
        mobileNumber: userPersistence.mobileNumber,
        address: userPersistence.address,
        addressNumber: userPersistence.addressNumber || 0,
        password: userPersistence.password,
        state: userPersistence.state,
        city: userPersistence.city,
        cpf: userPersistence.cpf,
      };
      return new UserEntity(user);
    },
  };
};
