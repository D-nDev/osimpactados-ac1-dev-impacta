import { IMapper } from '@app/src/application/ports/IMapper';
import SubsidiaryEntity from '@app/src/domain/entities/Subsidiary';
import UserEntity from '@app/src/domain/entities/Establishment';
import { SubsidiaryDto, establishmentDto } from '@app/src/application/ports/establishmentDto';

export class Mapper implements IMapper {
  constructor() {}

  public fromUserDtoToEntity(userDto: establishmentDto) {
    const establishment = {
      email: userDto.email,
      name: userDto.name,
      mobileNumber: userDto.mobileNumber,
      subsidiary: this.fromAddressDtoToEntity(userDto.subsidiaries),
      password: userDto.password,
      cnpj: userDto.cnpj,
    };
    return new UserEntity({...establishment})
  }

  public fromAddressDtoToEntity(addresses: SubsidiaryDto[]) {
    if(!addresses) {
      return []
    }
    const userAddresses: SubsidiaryEntity[] = []
    addresses.forEach(eachAddress => {
      const subsidiary = {
        name: "",
        address: eachAddress.address,
        addressNumber: eachAddress.addressNumber,
        addressComplement: eachAddress.addressComplement,
        addressDistrict: eachAddress.addressDistrict,
        products: [],
        city: eachAddress.city,
        state: eachAddress.state,
        cep: eachAddress.cep,
      };
      userAddresses.push(new SubsidiaryEntity(subsidiary))
    })
    return userAddresses;
  }
}