/* eslint-disable no-extra-boolean-cast */
import EstablishmentEntity from '@domain/entities/Establishment';
import { IHashAdapter } from '../ports/bcrypt';
import { IMapperAdapter } from '../ports/IMapperAdapter';
import { useCase } from '../ports/useCase';
import { EstablishmentDto } from '../ports/dtos/establishmentDto';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import EstablishmentAlreadyExistsException from './errors/EstablishmentAlreadyExists';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import * as crypto from 'crypto';
import { IDateAdapter } from '../ports/IDateAdapter';
import ValidateTokenExpired from './errors/ValidateTokenExpired';

export default class CreateEstablishmentUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly encoder: IHashAdapter,
    private readonly mapper: IMapperAdapter,
    private readonly cache: IMemoryCacheAdapter,
    private readonly dateMoment: IDateAdapter,
  ) {}

  async execute(establishment: EstablishmentDto): Promise<{ email: string; token: string; expireDate: any }> {
    const establishmentSubsidiaries = this.mapper.fromSubsidiaryDtoToEntity(establishment.subsidiaries);
    const establishmentEntity = new EstablishmentEntity({
      ...establishment,
      subsidiaries: establishmentSubsidiaries,
      password: await this.encoder.hash(establishment.password),
    });

    const establishmentExists = await this.establishmentRepo.getFullEstablishmentDataByEmailNoThrow(
      establishment.email,
    );
    const establishmentPendingValidation = await this.cache.getJson<
      EstablishmentDto & { token: string; expireDate: any }
    >(`pending-${establishment.email}`);

    if (establishmentExists != null) {
      if (!establishmentExists.validate_code && establishmentExists.validate_expire_date == null) {
        throw new EstablishmentAlreadyExistsException('ESTABLISHMENT_ALREADY_EXISTS');
      }
    } else if (!!establishmentPendingValidation) {
      if (
        !this.dateMoment.compareWithCurrentUTCDate(new Date(establishmentPendingValidation.expireDate).toISOString())
      ) {
        throw new EstablishmentAlreadyExistsException('ESTABLISHMENT_ALREADY_EXISTS');
      } else {
        throw new ValidateTokenExpired('ESTABLISHMENT_ALREADY_EXISTS');
      }
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expireDate = this.dateMoment.addHoursToUTCDate(new Date().toISOString(), 2);

    await this.cache.set(
      `pending-${establishment.email}`,
      JSON.stringify({ ...establishmentEntity, token, expireDate }),
      7200,
    );
    return { email: establishment.email, token, expireDate };
  }
}
