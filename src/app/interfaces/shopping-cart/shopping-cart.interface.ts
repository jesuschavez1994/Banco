export interface PaymentDetails {
  id: number;
  order_id: number;
  contact_id: number;
  address_latitude: number;
  address_longitude: number;
  name: string;
  dispatched: string;
  delivered: string;
  created_at: string;
  updated_at: string;
  contact: Contact;
}

interface Contact {
  id: number;
  user_id: number;
  commune_id: number;
  direction: string;
  house: string;
  phone: string;
  rut: string;
  address_latitude: number;
  address_longitude: number;
  created_at: string;
  updated_at: string;
  commune: Commune;
}

interface Commune {
  id: number;
  name: string;
  region_id: number;
  created_at: null;
  updated_at: null;
  region: Region;
}

interface Region {
  id: number;
  name: string;
  ordinal: string;
  created_at: null;
  updated_at: null;
}

export interface PaymentCredentials {
  order_id: string;
  type: string;
  amount: number;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface MallTransactionCredentials {
  token: string;
  url: string;
}

export interface OrderDetails {
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
  order_cart_items: OrderCartItem[];
}

interface OrderCartItem {
  id: number;
  order_id: number;
  product_id: number;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

interface Product {
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

interface Store {
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
  mall: Mall;
}

interface Mall {
  id: number;
  store_id: number;
  commerce_code: string;
  created_at: null;
  updated_at: null;
}

export interface Orders {
  current_page: number;
  data: Datum[];
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

interface OrderCartItem {
  id: number;
  order_id: number;
  product_id: number;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

interface Product {
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

interface Store {
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

interface Payment {
  id: number;
  order_id: number;
  amount: number;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
  webpayplusmalltransaction: Webpayplusmalltransaction;
}

interface Webpayplusmalltransaction {
  id: number;
  payment_id: number;
  token: string;
  url: string;
  error: null;
  created_at: string;
  updated_at: string;
  webpayplusmallresponse: Webpayplusmallresponse;
}

interface Webpayplusmallresponse {
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

interface Detail {
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

interface User {
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

interface Image {
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

interface Pivot {
  user_id: number;
  image_id: number;
}

export interface Delivery {
  id: number;
  order_id: number;
  contact_id: number;
  address_latitude: number;
  address_longitude: number;
  name: string;
  dispatched: string;
  delivered: string;
  created_at: string;
  updated_at: string;
  contact: Contact;
}
