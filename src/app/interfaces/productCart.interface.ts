export interface ProductToCartResp {
  success: boolean;
  data: Product[];
  message: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  attributes: any[];
  conditions: any[];
}
