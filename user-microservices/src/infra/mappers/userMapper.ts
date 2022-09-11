import { IMapperAdapter } from '@app/application/ports/IMapperAdapter';
import AddressEntity from '@domain/entities/Address';
import UserEntity from '@domain/entities/User';
import { AddressesDto, userDto } from '@application/ports/userDto';

export class Mapper implements IMapperAdapter {
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