import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { CreateProductDto, PhotosDto } from '../ports/dtos/createProductDto';
import { IUploadProvider } from '../ports/IUploadProviderAdapter';
import { ITokenAdapter } from '../ports/ITokenAdapter';
import { IUUIDAdapter } from '../ports/IUUIDAdapter';

export default class CreateProductUseCase implements useCase {
  constructor(
    private readonly establishmentRepo: IEstablishmentRepository,
    private readonly uploadProvider: IUploadProvider,
    private readonly jwtadapter: ITokenAdapter,
    private readonly uuidprovider: IUUIDAdapter,
  ) {}

  async execute(inputDto: CreateProductDto, photos: PhotosDto) {
    const currentEstablishment = this.jwtadapter.decode(inputDto.token);

    const isSubsidiaryFromItsEstablishment = this.establishmentRepo.getSubsidiaryByEstablishmentId(
      currentEstablishment.id,
    );

    if (!isSubsidiaryFromItsEstablishment) {
      return false;
    }

    let i = 0;

    for await (const product of inputDto.products) {
      const upload = await this.uploadProvider.uploadFile(photos[i].buffer, photos[i].mimetype);
      product.id = this.uuidprovider.generateUUID();
      product.photo = upload;
      i++;
      await this.establishmentRepo.createProduct(product, inputDto.subsidiaryId);
    }

    if (i > 0) {
      return true;
    }
    return false;
  }
}
