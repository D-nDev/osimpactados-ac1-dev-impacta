import { Prisma, Products } from '@prisma/client';

export interface CreateProductDto {
  product: Products;
  subsidiaryId: string;
}

export type JsonValue = Prisma.JsonValue;
