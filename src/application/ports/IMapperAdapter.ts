import AddressEntity from '@domain/entities/Subsidiary';
import EstablishmentEntity from '@domain/entities/Establishment';
import { SubsidiaryDto, EstablishmentDto } from './dtos/establishmentDto';

export interface IMapperAdapter {
  fromEstablishmentDtoToEntity: (establishmentDto: EstablishmentDto) => EstablishmentEntity;
  fromSubsidiaryDtoToEntity: (addresses: SubsidiaryDto[]) => AddressEntity[];
}
