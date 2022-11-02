import 'reflect-metadata';
import { singleton } from 'tsyringe';
import axios from 'axios';
import { PaymentGetResponse } from 'mercadopago/resources/payment';
import { IPaymentdapter } from '@application/ports/IPaymentAdapter';

@singleton()
export default class MercadoPagoAdapter implements IPaymentdapter {
  client = process.env.PAYMENT_API_URL as string;

  public async getPayment(id: string) {
    return await axios.get<PaymentGetResponse>(`${this.client}/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESSTOKEN as string}`,
      },
    });
  }

  public async getFormattedPayment(id: string) {
    const paymentData = await axios.get<PaymentGetResponse>(`${this.client}/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESSTOKEN as string}`,
      },
    });
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
    return paymentData.data.body.payment_type_id;
  }
}
