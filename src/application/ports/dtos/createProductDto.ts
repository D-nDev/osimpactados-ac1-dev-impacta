import { Products } from '@prisma/client';

export interface CreateProductDto {
  products: Products[];
  subsidiaryId: string;
  token: string;
}

export type PhotosDto = Express.Multer.File[];
