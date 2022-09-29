export interface PatchProductDto {
  name?: string;
  stock?: number;
  photo?: string;
  value?: number;
}

export interface PatchProductEstablishmentData {
  subsidiaryId: string;
  token: string;
}

export type PhotoDto = Express.Multer.File;
