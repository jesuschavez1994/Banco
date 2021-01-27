export interface Order {
  id: number;
  user_id: number;
  title: string;
  cart_data: string;
  total_price: number;
  currency: string;
  status: string;
  type: string;
  created_at?: string;
  updated_at?: string;
  payment?: Payment;
}

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  webpayplusmalltransaction?: any;
  webpayplusnormaltransaction?: any;
}

//
export interface PaymentCreated {
  order_id: string;
  type: string;
  amount: number;
  updated_at: string;
  created_at: string;
  id: number;
}
