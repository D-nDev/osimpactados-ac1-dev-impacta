import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { CreateProductDto, JsonValue } from '../ports/dtos/createProductDto';

export default class CreateProductUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(inputDto: CreateProductDto): Promise<JsonValue | null> {
    const productData = await this.establishmentRepo.createProduct(inputDto.product, inputDto.subsidiaryId);

    if (productData) {
      return productData?.products[productData.products.length - 1];
    }
    return null;
  }
}
