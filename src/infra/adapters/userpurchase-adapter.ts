import { singleton } from 'tsyringe';
import axios from 'axios';
import { IPurchaseAdapter } from 'application/ports/IPurchaseAdapter';

@singleton()
export class UserPurchaseAdapter implements IPurchaseAdapter {
  public async createCart(data: any) {
    const result = await axios.post(`${process.env.PAYMENT_SERVICE_URL as string}/createPreference`, {
      ...data,
      notification_url: process.env.NOTIFICATION_URL as string,
    });
    return result.data;
  }
}
