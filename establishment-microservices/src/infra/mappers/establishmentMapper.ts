import { IMapper } from '@app/src/application/ports/IMapper';
import SubsidiaryEntity from '@app/src/domain/entities/Subsidiary';
import EstablishmentEntity from '@app/src/domain/entities/Establishment';
import { SubsidiaryDto, establishmentDto, productDto } from '@app/src/application/ports/establishmentDto';
import ProductEntity from '@app/src/domain/entities/Product';

export class Mapper implements IMapper {
  constructor() {}

  public fromEstablishmentDtoToEntity(establishmentDto: establishmentDto) {
    const establishment = {
      email: establishmentDto.email,
      name: establishmentDto.name,
      mobileNumber: establishmentDto.mobileNumber,
      subsidiary: this.fromSubsidiaryDtoToEntity(establishmentDto.subsidiaries),
      password: establishmentDto.password,
      cnpj: establishmentDto.cnpj,
    };
    return new EstablishmentEntity({...establishment})
  }

  public fromSubsidiaryDtoToEntity(subsidiary: SubsidiaryDto[]) {
    const establishmentSubsidiaries: SubsidiaryEntity[] = [];
    subsidiary.forEach(eachSubsidiary => {
      const subsidiary = {
        name: eachSubsidiary.name,
        address: eachSubsidiary.address,
        addressNumber: eachSubsidiary.addressNumber,
        addressComplement: eachSubsidiary.addressComplement,
        addressDistrict: eachSubsidiary.addressDistrict,
        products: eachSubsidiary.products as productDto[],
        city: eachSubsidiary.city,
        state: eachSubsidiary.state,
        cep: eachSubsidiary.cep,
      };
      establishmentSubsidiaries.push(new SubsidiaryEntity(subsidiary))
    })
    return establishmentSubsidiaries;
  }
}