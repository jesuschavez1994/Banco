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
  order_id: number;
  type: string;
  amount: number;
  updated_at: string;
  created_at: string;
  // ID de la orden realizada
  id: number; //Payment ID
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

[
  {
    id: 31,
    order_id: 92,
    amount: 300,
    status: 'FINISH_SUCCESS',
    type: 'webpayplus',
    created_at: '2021-01-27T03:46:08.000000Z',
    updated_at: '2021-01-27T03:48:10.000000Z',
    webpayplusnormaltransaction: {
      id: 23,
      payment_id: 31,
      token: '01abd6d68f5b8fd2711e793e98a93576ff41984d261625f0782d70bf0dd9e10c',
      url: 'https://webpay3gint.transbank.cl/webpayserver/initTransaction',
      error: null,
      created_at: '2021-01-27T03:46:10.000000Z',
      updated_at: '2021-01-27T03:46:10.000000Z',
      webpayplusnormalresponse: {
        id: 11,
        webpayplus_n_transaction_id: 23,
        vci: 'TSY',
        amount: 300,
        status: 'AUTHORIZED',
        buy_order: '92',
        session_id: '1',
        card_detail: '{"card_number":"6623"}',
        accounting_date: '0127',
        transaction_date: '2021-01-27T03:46:09.881Z',
        authorization_code: '1213',
        payment_type_code: 'VN',
        response_code: '0',
        installments_amount: null,
        installments_number: 0,
        balance: null,
        created_at: '2021-01-27T03:48:10.000000Z',
        updated_at: '2021-01-27T03:48:10.000000Z',
      },
    },
    webpayplusmalltransaction: null,
  },
];
