/* 
	Interfaces usadas en la vista "Configuración".
*/

/* 
	Interfaces usadas para crear un pago con el servicio Webpay Plus.
*/
export interface OrderNumberCreation {
  plan_name: string;
  type: string;
  price: number;
  store_id: number;
}

export interface CreatedOrder {
  order: {
    user_id: number;
    title: string;
    total_price: number;
    type: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  subscription: {
    store_id: number;
    plan_id: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export interface Payment {
  order_id?: number;
  type?: string;
  amount?: number;
  updated_at?: string;
  created_at?: string;
  id?: number; //Payment ID,
  message?: string;
}

export interface WebpayPayment {
  payment_id: number;
  user_id: number;
}

export interface PaymentCredentials {
  token: string;
  url: string;
}

export interface VoucherDetails {
  id: number;
  order_id: number;
  amount: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  webpayplusnormaltransaction: {
    id: number;
    payment_id: number;
    token: string;
    url: string;
    error: number;
    created_at: string;
    updated_at: string;
    webpayplusnormalresponse: {
      id: number;
      webpayplus_n_transaction_id: number;
      vci: string;
      amount: number;
      status: string;
      buy_order: string;
      session_id: string;
      card_detail: string;
      accounting_date: string;
      transaction_date: string;
      authorization_code: string;
      payment_type_code: string;
      response_code: string;
      installments_amount: number;
      installments_number: number;
      balance: number;
      created_at: string;
      updated_at: string;
    };
  };
  webpayplusmalltransaction: number;
}
