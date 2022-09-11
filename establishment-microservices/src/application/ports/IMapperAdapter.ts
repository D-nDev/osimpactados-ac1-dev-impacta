import AddressEntity from '@domain/entities/Subsidiary';
import EstablishmentEntity from '@domain/entities/Establishment';
import { SubsidiaryDto, establishmentDto } from './establishmentDto';

export interface IMapperAdapter {
  fromEstablishmentDtoToEntity: (establishmentDto: establishmentDto) => EstablishmentEntity;
  fromSubsidiaryDtoToEntity: (addresses: SubsidiaryDto[]) => AddressEntity[];
}
