import AddressEntity from '@domain/entities/Address';
import UserEntity from '@domain/entities/User';
import { AddressesDto, userDto } from './userDto';

export interface IMapperAdapter {
  fromUserDtoToEntity: (userDto: userDto) => UserEntity;
  fromAddressDtoToEntity: (addresses: AddressesDto[]) => AddressEntity[];
}
