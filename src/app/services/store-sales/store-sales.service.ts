import { Injectable } from '@angular/core';
import { Service } from '@services/service.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class StoreSalesService extends Service {
  constructor(
    protected http: HttpClient,
    protected userService: UsuarioService
  ) {
    super(http);
  }

  private userId: number;
  private storeId: string;

  setIdUser() {
    this.userId = this.userService.getIdUser();
  }

  /**
   * @description Obtenemos todas las ordenes de compra realizadas a la tienda.
   * @returns {*}
   * @memberof StoreSalesService
   */
  public getStoreOrders() {
    this.setIdUser();
    this.storeId = localStorage.getItem('storeId');
    return this.execQuery<Orders>(`users/${this.userId}/stores/2/sales`);
  }
}

export interface Orders {
  current_page: number;
  data: Datum;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  user_id: number;
  title: string;
  cart_data: string;
  total_price: number;
  currency: string;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  user: User;
  payment: Payment;
  order_cart_items: OrderCartItem[];
}

export interface OrderCartItem {
  id: number;
  order_id: number;
  product_id: number;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Product {
  id: number;
  store_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  sincronice: string;
  aviable: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  store: Store;
}

export interface Store {
  id: number;
  user_id: number;
  rut: string;
  name: string;
  social_reason: string;
  description: string;
  level: string;
  certification: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  webpayplusmalltransaction: Webpayplusmalltransaction;
}

export interface Webpayplusmalltransaction {
  id: number;
  payment_id: number;
  token: string;
  url: string;
  error: null;
  created_at: string;
  updated_at: string;
  webpayplusmallresponse: Webpayplusmallresponse;
}

export interface Webpayplusmallresponse {
  id: number;
  webpayplus_mall_transaction_id: number;
  vci: string;
  buy_order: string;
  session_id: string;
  card_detail: string;
  accounting_date: string;
  transaction_date: string;
  created_at: string;
  updated_at: string;
  details: Detail[];
}

export interface Detail {
  id: number;
  webpayplus_mall_response_id: number;
  authorization_code: string;
  payment_type_code: string;
  response_code: string;
  amount: number;
  installments_amount: null;
  installments_number: number;
  commerce_code: string;
  buy_order: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: null;
  email_verified_at: null;
  provider_id: null;
  role: string;
  created_at: null;
  updated_at: null;
  deleted_at: null;
  image: Image[];
}

export interface Image {
  id: number;
  name: string;
  src: string;
  src_size: string;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  pivot: Pivot;
}

export interface Pivot {
  user_id: number;
  image_id: number;
}
