import EstablishmentEntity from '@domain/entities/Establishment';
import { bcryptEncoder } from '../ports/bcrypt';
import { IMapperAdapter } from '../ports/IMapperAdapter';
import { useCase } from '../ports/useCase';
import { EstablishmentDto } from '../ports/establishmentDto';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import * as crypto from 'crypto';

export default class CreateEstablishmentUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly encoder: bcryptEncoder,
    private readonly mapper: IMapperAdapter,
  ) {}

  async execute(establishment: EstablishmentDto): Promise<boolean | { id: string; email: string }> {
    const establishmentAddresses = this.mapper.fromSubsidiaryDtoToEntity(establishment.subsidiaries);
    const establishmentEntity = new EstablishmentEntity({
      ...establishment,
      subsidiary: establishmentAddresses,
      password: await this.encoder.hash(establishment.password),
    });
    const establishmentExists = await this.establishmentRepo.getFullEstablishmentDataByEmail(establishment.email);

    if (establishmentExists) {
      if (!establishmentExists.validate_code && !establishmentExists.validate_expire_date) {
        return false;
      } else if (establishmentExists.validate_code && new Date(new Date().toUTCString()) < establishmentExists.validate_expire_date!) {
        return false;
      } else if (establishmentExists.validate_code && new Date(new Date().toUTCString()) > establishmentExists.validate_expire_date!) {
        const newtoken = crypto.randomBytes(20).toString('hex');

        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + 2 * 60 * 60 * 1000);

        const override = await this.establishmentRepo.overrideEstablishment(establishmentEntity);
        await this.establishmentRepo.updateValidationCode(establishmentEntity.getEmail(), newtoken, expireDate);

        return { id: override.id, email: override.email };
      }
    }

    return await this.establishmentRepo.createEstablishment(establishmentEntity);
  }
}
