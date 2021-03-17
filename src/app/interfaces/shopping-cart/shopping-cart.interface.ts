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
