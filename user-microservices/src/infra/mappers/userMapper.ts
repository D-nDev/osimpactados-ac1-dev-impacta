import { IMapper } from '@app/src/application/ports/IMapper';
import AddressEntity from '@app/src/domain/entities/Address';
import UserEntity from '@app/src/domain/entities/User';
import { AddressesDto, userDto } from '@application/ports/userDto';

export class Mapper implements IMapper {
  constructor() {}

  public fromUserDtoToEntity(userDto: userDto) {
    const user = {
      email: userDto.email,
      name: userDto.name,
      mobileNumber: userDto.mobileNumber,
      addresses: this.fromAddressDtoToEntity(userDto.addresses),
      password: userDto.password,
      cpf: userDto.cpf,
    };
    return new UserEntity({...user})
  }

  public fromAddressDtoToEntity(addresses: AddressesDto[]) {
    if(!addresses) {
      return []
    }
    const userAddresses: AddressEntity[] = []
    addresses.forEach(eachAddress => {
      const address = {
        address: eachAddress.address,
        addressNumber: eachAddress.addressNumber,
        addressComplement: eachAddress.addressComplement,
        addressDistrict: eachAddress.addressDistrict,
        city: eachAddress.city,
        state: eachAddress.state,
        cep: eachAddress.cep,
      };
      userAddresses.push(new AddressEntity(address))
    })
    return userAddresses;
  }
}


// export const userMapper = () => {
//   return {
//     fromDtoToEntity: (dto: userDto) => {
//       const user = {
//         email: dto.email,
//         name: dto.name,
//         mobileNumber: dto.mobileNumber,
//         addresses: AddressMapper().fromDtoToEntity(dto.addresses),
//         password: dto.password,
//         cpf: dto.cpf,
//       };
//       return new UserEntity({...user})
//     },
//     fromPersistenceToDto: (userPersistence: User & { addresses: Address[] | [] }): userDto => {
//       const user = {
//         email: userPersistence.email,
//         name: userPersistence.name,
//         mobileNumber: userPersistence.mobileNumber,
//         addresses: AddressMapper().fromPersistenceToDto(userPersistence.addresses),
//         password: userPersistence.password,
//         cpf: userPersistence.cpf,
//       };
//       return new userDto(user.email, user.name, user.mobileNumber, user.addresses, user.password, user.cpf);
//     },
//     fromEntityToPersistence: (userEntity: UserEntity) => {
//       const user = {
//         email: userEntity.getEmail(),
//         name: userEntity.getName(),
//         mobileNumber: userEntity.getMobileNumber(),
//         addresses: AddressMapper().fromEntityToPersistence(userEntity.getAddresses()),
//         password: userEntity.getPassword(),
//         cpf: userEntity.getCpf(),
//       };
//       return user;
//     },
//     fromPersistenceToResponseObject: (userPersistence: User & { addresses: Address[] | [] } | null): UserResponseObject | null => {
//       if(userPersistence) {
//         const user = {
//           email: userPersistence.email,
//           name: userPersistence.name,
//           mobileNumber: userPersistence.mobileNumber,
//           addresses: AddressMapper().fromPersistenceToDto(userPersistence.addresses),
//           cpf: userPersistence.cpf,
//         };
//         return user;
//       }
//       return null;
//     },
//   };
// };

// export const AddressMapper = () => {
//   return {
//     fromDtoToEntity: (userAddress: AddressesDto[] | []) => {
//       if(!userAddress) {
//         return []
//       }
//       const adresses: AddressEntity[] = []
//       userAddress.forEach(eachAddress => {
//         const address = {
//           address: eachAddress.address,
//           addressNumber: eachAddress.addressNumber,
//           addressComplement: eachAddress.addressComplement,
//           addressDistrict: eachAddress.addressDistrict,
//           city: eachAddress.city,
//           state: eachAddress.state,
//           cep: eachAddress.cep,
//         };
//         adresses.push(new AddressEntity(address))
//       })
//       return adresses;
//     },
//     fromPersistenceToDto: (userAddress: Address[] | []): AddressesDto[] | [] => {
//       if(!userAddress) {
//         return []
//       }
//       const adresses: AddressesDto[] = []
//       userAddress.forEach(eachAddress => {
//         const address = {
//           address: eachAddress.address,
//           addressNumber: eachAddress.addressNumber,
//           addressComplement: eachAddress.addressComplement,
//           addressDistrict: eachAddress.addressDistrict,
//           city: eachAddress.city,
//           state: eachAddress.state,
//           cep: eachAddress.cep,
//         };
//         adresses.push(address)
//       })
//       return adresses;
//     },
//     fromDtoToPersistence: (userAddress: AddressesDto[] | []) => {
//       if(!userAddress) {
//         return []
//       }
//       const adresses: any = []
//       userAddress.forEach(eachAddress => {
//         const address = {
//           address: eachAddress.address,
//           addressNumber: eachAddress.addressNumber,
//           addressComplement: eachAddress.addressComplement,
//           addressDistrict: eachAddress.addressDistrict,
//           city: eachAddress.city,
//           state: eachAddress.state,
//           cep: eachAddress.cep,
//         };
//         adresses.push(address)
//       })
//       return adresses;
//     },
//     fromEntityToPersistence: (userAddress: AddressEntity[]) => {
//       if(!userAddress) {
//         return []
//       }
//       const adresses: any[] = []
//       userAddress.forEach(eachAddress => {
//         const address = {
//           address: eachAddress.address,
//           addressNumber: eachAddress.addressNumber,
//           addressComplement: eachAddress.addressComplement,
//           addressDistrict: eachAddress.addressDistrict,
//           city: eachAddress.city,
//           state: eachAddress.state,
//           cep: eachAddress.cep,
//         };
//         adresses.push(address)
//       })
//       return adresses;
//     },
//     fromPersistenceToResponseObject: (userAddress: Address[] | []) => {
//       if(!userAddress) {
//         return []
//       }
//       const adresses: AddressesDto[] = []
//       userAddress.forEach(eachAddress => {
//         const address = {
//           address: eachAddress.address,
//           addressNumber: eachAddress.addressNumber,
//           addressComplement: eachAddress.addressComplement,
//           addressDistrict: eachAddress.addressDistrict,
//           city: eachAddress.city,
//           state: eachAddress.state,
//           cep: eachAddress.cep,
//         };
//         adresses.push(address)
//       })
//       return adresses;
//     },
//   };
// };
