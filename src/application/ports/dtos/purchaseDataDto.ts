import { IsArray, IsNotEmpty, IsObject } from 'class-validator';

interface IMetaData {
  establishmentId: string;
  subsidiaryId: string;
  establishmentName: string;
  subsidiaryName: string;
  scheduled_date: string | null;
  delivered_date: string | null;
  is_delivered: boolean;
}

interface IProducts {
  id: string;
  title: string;
  unit_price: number;
  picture_url: string;
}

export class PurchaseDataDto {
  constructor(metadata: IMetaData, items: IProducts[]) {
    this.metadata = metadata;
    this.items = items;
  }

  @IsNotEmpty()
  @IsObject()
  metadata: IMetaData;

  @IsNotEmpty()
  @IsArray()
  items: IProducts[];
}
