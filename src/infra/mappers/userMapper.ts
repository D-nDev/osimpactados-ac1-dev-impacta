import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { IMapperAdapter } from '@application/ports/IMapperAdapter';
import AddressEntity from '@domain/entities/Address';
import UserEntity from '@domain/entities/User';
import { AddressesDto, UserDto } from '@application/ports/dtos/userDto';

@singleton()
export class Mapper implements IMapperAdapter {
  public fromUserDtoToEntity(userDto: UserDto): UserEntity {
    const user = {
      email: userDto.email,
      name: userDto.name,
      mobileNumber: userDto.mobileNumber,
      addresses: this.fromAddressDtoToEntity(userDto.addresses),
      password: userDto.password,
      cpf: userDto.cpf,
      photo: userDto.photo,
    };
    return new UserEntity({ ...user });
  }

  public fromAddressDtoToEntity(addresses: AddressesDto[]): AddressEntity[] {
    if (!addresses) {
      return [];
    }
    const userAddresses: AddressEntity[] = [];
    addresses.forEach((eachAddress) => {
      const address = {
        address: eachAddress.address,
        addressNumber: eachAddress.addressNumber,
        addressComplement: eachAddress.addressComplement,
        addressDistrict: eachAddress.addressDistrict,
        city: eachAddress.city,
        state: eachAddress.state,
        cep: eachAddress.cep,
      };
      userAddresses.push(new AddressEntity(address));
    });
    return userAddresses;
  }
}
