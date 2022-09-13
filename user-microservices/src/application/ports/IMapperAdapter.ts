import AddressEntity from '@domain/entities/Address';
import UserEntity from '@domain/entities/User';
import { AddressesDto, UserDto } from './dtos/userDto';

export interface IMapperAdapter {
  fromUserDtoToEntity: (userDto: UserDto) => UserEntity;
  fromAddressDtoToEntity: (addresses: AddressesDto[]) => AddressEntity[];
}
