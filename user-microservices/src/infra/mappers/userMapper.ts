import AddressEntity from '@app/src/domain/entities/Address';
import UserEntity from '@app/src/domain/entities/User';
import { AddressesDto, userDto } from '@application/ports/userDto';
import { Address, User } from '@prisma/client';

export const userMapper = () => {
  return {
    fromDtoToEntity: (dto: userDto) => {
      const user = {
        email: dto.email,
        name: dto.name,
        mobileNumber: dto.mobileNumber,
        addresses: AddressMapper().fromDtoToPersistence(dto.addresses),
        password: dto.password,
        cpf: dto.cpf,
      };
      return new UserEntity({...user})
    },
    fromPersistenceToDto: (userPersistence: User & { addresses: Address[] | [] }): userDto => {
      const user = {
        email: userPersistence.email,
        name: userPersistence.name,
        mobileNumber: userPersistence.mobileNumber,
        addresses: AddressMapper().fromPersistenceToDto(userPersistence.addresses),
        password: userPersistence.password,
        cpf: userPersistence.cpf,
      };
      return new userDto(user.email, user.name, user.mobileNumber, user.addresses, user.password, user.cpf);
    },
  };
};

export const AddressMapper = () => {
  return {
    fromPersistenceToDto: (userAddress: Address[] | []): AddressesDto[] | [] => {
      if(!userAddress) {
        return []
      }
      const adresses: AddressesDto[] = []
      userAddress.forEach(eachAddress => {
        const address = {
          address: eachAddress.address,
          addressNumber: eachAddress.addressNumber,
          addressComplement: eachAddress.addressComplement,
          addressDistrict: eachAddress.addressDistrict,
          city: eachAddress.city,
          state: eachAddress.state,
          cep: eachAddress.cep,
        };
        adresses.push(address)
      })
      return adresses;
    },
    fromDtoToPersistence: (userAddress: AddressesDto[] | []) => {
      if(!userAddress) {
        return []
      }
      const adresses: any = []
      userAddress.forEach(eachAddress => {
        const address = {
          address: eachAddress.address,
          addressNumber: eachAddress.addressNumber,
          addressComplement: eachAddress.addressComplement,
          addressDistrict: eachAddress.addressDistrict,
          city: eachAddress.city,
          state: eachAddress.state,
          cep: eachAddress.cep,
        };
        adresses.push(address)
      })
      return adresses;
    },
  };
};
