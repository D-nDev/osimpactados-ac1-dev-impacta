import { useCase } from '../ports/useCase';
import { IEstablishmentRepository } from '../ports/establishmentRepository';
import { Prisma, Products } from '@prisma/client';
import { jwtToken } from '../ports/jwt';

export default class CreateProductUseCase implements useCase {
  constructor(private readonly establishmentRepo: IEstablishmentRepository) {}

  async execute(product: Products, token: string, subsidiaryId: string): Promise<Prisma.JsonValue | null> {

    const productData = await this.establishmentRepo.createProduct(product, subsidiaryId);

    if (productData) {
      return productData?.products[productData.products.length - 1];
    }
    return null;
  }
}
