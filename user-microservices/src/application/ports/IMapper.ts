import AddressEntity from "@app/src/domain/entities/Address";
import UserEntity from "@app/src/domain/entities/User";
import { AddressesDto, userDto } from "./userDto";

export interface IMapper {
  fromUserDtoToEntity(userDto: userDto): UserEntity
  fromAddressDtoToEntity(addresses: AddressesDto[]): AddressEntity[]
}