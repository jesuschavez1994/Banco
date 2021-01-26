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

export interface PaymentInfo {}
