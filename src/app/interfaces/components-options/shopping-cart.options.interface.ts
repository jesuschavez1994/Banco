import { Order } from '../order.interface';

export interface CurrentPaymentData {
  order?: Order;
  paymentId?: number;
  tokenWebPay?: string;
  urlWebPay?: string;
}
