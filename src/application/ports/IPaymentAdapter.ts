import { AxiosResponse } from 'axios';
import { GetFormattedPurchaseDto } from './dtos/createPurchaseDto';

export interface IPaymentdapter {
  getPayment: (id: string) => Promise<AxiosResponse<any, any>>;
  getFormattedPayment: (id: string) => Promise<GetFormattedPurchaseDto>;
  getPaymentType: (id: string) => Promise<any>;
}
