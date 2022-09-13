import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { IMapperAdapter } from '@app/application/ports/IMapperAdapter';
import SubsidiaryEntity from '@domain/entities/Subsidiary';
import EstablishmentEntity from '@domain/entities/Establishment';
import { SubsidiaryDto, EstablishmentDto } from '@application/ports/dtos/establishmentDto';

@singleton()
export class Mapper implements IMapperAdapter {
  public fromEstablishmentDtoToEntity(establishmentDto: EstablishmentDto) {
    const establishment = {
      email: establishmentDto.email,
      name: establishmentDto.name,
      mobileNumber: establishmentDto.mobileNumber,
      subsidiaries: this.fromSubsidiaryDtoToEntity(establishmentDto.subsidiaries),
      password: establishmentDto.password,
      cnpj: establishmentDto.cnpj,
    };
    return new EstablishmentEntity({ ...establishment });
  }

  public fromSubsidiaryDtoToEntity(subsidiary: SubsidiaryDto[]) {
    const establishmentSubsidiaries: SubsidiaryEntity[] = [];
    subsidiary.forEach((eachSubsidiary) => {
      const subsidiary = {
        name: eachSubsidiary.name,
        address: eachSubsidiary.address,
        addressNumber: eachSubsidiary.addressNumber,
        addressComplement: eachSubsidiary.addressComplement,
        addressDistrict: eachSubsidiary.addressDistrict,
        products: eachSubsidiary.products,
        city: eachSubsidiary.city,
        state: eachSubsidiary.state,
        cep: eachSubsidiary.cep,
      };
      establishmentSubsidiaries.push(new SubsidiaryEntity(subsidiary));
    });
    return establishmentSubsidiaries;
  }
}
