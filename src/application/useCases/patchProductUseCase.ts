import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { IUploadProvider } from '../ports/IUploadProviderAdapter';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { PatchProductDto, PatchProductEstablishmentData, PhotoDto } from '../ports/dtos/patchProductDto';

export default class PatchProductUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly uploadProvider: IUploadProvider,
    private readonly jwtadapter: ITokenAdapter,
  ) {}

  async execute(
    productId: string,
    inputDto: PatchProductDto,
    establishmentData: PatchProductEstablishmentData,
    photo?: PhotoDto,
  ) {
    const currentEstablishment = this.jwtadapter.decode(establishmentData.token);

    const isSubsidiaryFromItsEstablishment = this.establishmentRepo.getSubsidiaryByEstablishmentId(
      currentEstablishment.id,
      establishmentData.subsidiaryId,
    );

    if (!isSubsidiaryFromItsEstablishment) {
      return false;
    }

    if (photo) {
      const upload = await this.uploadProvider.uploadFile(photo.buffer, photo.mimetype);
      inputDto.photo = upload;
    }

    if (inputDto.stock) {
      inputDto.stock = Number(inputDto.stock);
    }

    if (inputDto.value) {
      inputDto.value = Number(inputDto.value);
    }

    const updateResult = await this.establishmentRepo.updateProduct(
      productId,
      inputDto,
      establishmentData.subsidiaryId,
    );

    return updateResult;
  }
}
