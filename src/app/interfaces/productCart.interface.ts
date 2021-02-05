export interface ProductToCartResp {
  success: boolean;
  data: ProductOfCart[];
  message: string;
}

export interface ProductOfCart {
  id: number;
  name: string;
  price: number;
  quantity: number;
  attributes: Attributes;
  conditions: any[];
}

export interface Attributes {
  store: Store;
}

export interface Store {
  store_id: number;
  name: string;
  commerce_code: string;
}
