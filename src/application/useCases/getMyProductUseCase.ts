import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { ITokenAdapter } from '../ports/ITokenAdapter';

export default class GetMyProductUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly jwtadapter: ITokenAdapter,
  ) {}

  async execute(subsidiaryId: string, token: string, productId: string) {
    const currentEstablishment = this.jwtadapter.decode(token);

    const isSubsidiaryFromItsEstablishment = await this.establishmentRepo.getSubsidiaryByEstablishmentId(
      currentEstablishment.id,
      subsidiaryId,
    );

    if (isSubsidiaryFromItsEstablishment) {
      const result = await this.establishmentRepo.getProductBySubsidiaryId(subsidiaryId, productId);

      return result;
    }

    return null;
  }
}
