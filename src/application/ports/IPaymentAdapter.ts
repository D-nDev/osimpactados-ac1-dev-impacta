import { AxiosResponse } from 'axios';
import { GetFormattedPurchaseDto } from './dtos/createPurchaseDto';

export interface PreferenceDataDto {
  metadata: {
    establishmentId: string;
    subsidiaryId: string;
    establishmentName: string;
    subsidiaryName: string;
    scheduled_date: string | null;
    delivered_date: string | null;
    is_delivered: boolean;
  };
  items: Array<{
    id: string;
    title: string;
    unit_price: number;
    picture_url: string;
  }>;
}

export interface IPaymentdapter {
  getPayment: (id: string) => Promise<AxiosResponse<any, any>>;
  getFormattedPayment: (id: string) => Promise<GetFormattedPurchaseDto>;
  getPaymentType: (id: string) => Promise<{
    payment_method_id: any;
    payment_type_id: any;
  }>;
  getPaymentStatus: (id: string) => Promise<any>;
  createPreference: (data: PreferenceDataDto) => Promise<any>;
}
