import EstablishmentEntity from '@domain/entities/Establishment';
import { IMapperAdapter } from '../ports/IMapperAdapter';
import { IMemoryCacheAdapter } from '../ports/IMemoryCacheAdapter';
import { useCase } from '../ports/useCase';
import { EstablishmentDto } from '../ports/dtos/establishmentDto';
import { IDateAdapter } from '../ports/IDateAdapter';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import InvalidValidateTokenException from './errors/InvalidValidateToken';
import ValidateTokenExpired from './errors/ValidateTokenExpired';
import ValidateTokenNotExistsException from './errors/ValidateTokenNotExists';
import { ValidateEstablishmentDto } from '../ports/dtos/validateEstablishmentDto';

export default class ValidateEstablishmentUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly cache: IMemoryCacheAdapter,
    private readonly mapper: IMapperAdapter,
    private readonly dateMoment: IDateAdapter,
  ) {}

  async execute(inputDto: ValidateEstablishmentDto): Promise<boolean> {
    const tokenexists = await this.cache.getJson<EstablishmentDto & { token: string; expireDate: Date }>(
      `pending-${inputDto.email}`,
    );

    if (tokenexists != null) {
      if (tokenexists?.token !== inputDto.token) {
        throw new InvalidValidateTokenException('INVALID_TOKEN');
      } else if (this.dateMoment.compareWithCurrentUTCDate(new Date(tokenexists.expireDate).toISOString())) {
        throw new ValidateTokenExpired('EXPIRED_TOKEN');
      }
      const { subsidiaries, token, expireDate, ...rest } = tokenexists;
      const establishmentSubsidiaries = this.mapper.fromSubsidiaryDtoToEntity(subsidiaries);
      const establishmentEntity = new EstablishmentEntity({
        subsidiaries: establishmentSubsidiaries,
        ...rest,
      });
      await this.establishmentRepo.createEstablishment(establishmentEntity);
      await this.cache.deleteKey(`pending-${inputDto.email}`);
      return true;
    }

    throw new ValidateTokenNotExistsException('INVALID_TOKEN');
  }
}
