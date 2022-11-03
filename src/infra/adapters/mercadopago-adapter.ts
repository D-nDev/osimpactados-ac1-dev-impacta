import 'reflect-metadata';
import { singleton } from 'tsyringe';
import axios from 'axios';
import { PaymentGetResponse } from 'mercadopago/resources/payment';
import { IPaymentdapter, PreferenceDataDto } from '@application/ports/IPaymentAdapter';
import mercadopago from 'mercadopago';

@singleton()
export default class MercadoPagoAdapter implements IPaymentdapter {
  client = process.env.PAYMENT_API_URL as string;

  public async getPayment(id: string) {
    const result = await axios.get<PaymentGetResponse>(`${this.client}/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESSTOKEN as string}`,
      },
    });
    console.log('getpayment', result);
    return result;
  }

  public async createPreference(data: PreferenceDataDto) {
    const result = await mercadopago.preferences.create(data);
    // console.log(result);
    return result.body;
  }

  public async getFormattedPayment(id: string) {
    const paymentData = await axios.get<PaymentGetResponse>(`${this.client}/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESSTOKEN as string}`,
      },
    });
    console.log('paymentFormattedData', paymentData.data);
    const result = {
      meli_purchaseId: paymentData.data.body.id,
      establishmentId: paymentData.data.body.metadata.establishmentId,
      subsidiaryId: paymentData.data.body.metadata.subsidiaryId,
      userId: paymentData.data.body.metadata.userId,
      establishmentName: paymentData.data.body.metadata.establishmentName,
      subsidiaryName: paymentData.data.body.metadata.subsidiaryName,
      products: paymentData.data.body.items,
      scheduled_date: paymentData.data.body.metadata.scheduled_date,
      delivered_date: paymentData.data.body.metadata.scheduled_date,
      is_delivered: paymentData.data.body.metadata.is_delivered,
    };
    return result;
  }

  public async getPaymentType(id: string) {
    const paymentData = await axios.get<PaymentGetResponse>(`${this.client}/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESSTOKEN as string}`,
      },
    });
    console.log('paymentTypeuwu', paymentData.data);
    return paymentData.data.body.payment_method_id;
  }
}
