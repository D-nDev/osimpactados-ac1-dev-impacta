import { IMapperAdapter } from '@app/application/ports/IMapperAdapter';
import SubsidiaryEntity from '@domain/entities/Subsidiary';
import EstablishmentEntity from '@domain/entities/Establishment';
import { SubsidiaryDto, establishmentDto, productDto } from '@application/ports/establishmentDto';

export class Mapper implements IMapperAdapter {
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