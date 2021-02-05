import { Order, PaymentCreated, CreatedMallTransaction } from '../order.interface';

export interface CurrentPaymentData {
  order?: Order;
  payment?: PaymentCreated;
  mallTransaction?: CreatedMallTransaction;
}
