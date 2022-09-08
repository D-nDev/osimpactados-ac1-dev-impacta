import AddressEntity from "@app/src/domain/entities/Subsidiary";
import EstablishmentEntity from "@app/src/domain/entities/Establishment";
import { SubsidiaryDto, establishmentDto } from "./establishmentDto";

export interface IMapper {
  fromEstablishmentDtoToEntity(establishmentDto: establishmentDto): EstablishmentEntity
  fromSubsidiaryDtoToEntity(addresses: SubsidiaryDto[]): AddressEntity[]
}