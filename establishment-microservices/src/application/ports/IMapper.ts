import AddressEntity from "@app/src/domain/entities/Subsidiary";
import UserEntity from "@app/src/domain/entities/Establishment";
import { SubsidiaryDto, establishmentDto } from "./establishmentDto";

export interface IMapper {
  fromUserDtoToEntity(userDto: establishmentDto): UserEntity
  fromAddressDtoToEntity(addresses: SubsidiaryDto[]): AddressEntity[]
}