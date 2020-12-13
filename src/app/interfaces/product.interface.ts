export interface ProductsResponse {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
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
  deleted_at?: any;
  marks: any[];
  images: string[];
  sync_bank: Syncbank[];
  suggestion: SuggestionsResponse;
}

export interface SuggestionsResponse {
  id: number;
  product_id: number;
  data: Suggestion[];
  created_at: string;
  updated_at: string;
  bank_id?: any;
}

export interface Suggestion {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  bank_id: number;
  images: Image[];
}

export interface Syncbank {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  pivot: Pivot;
  images: Image[];
}

export interface Image {
  id: number;
  name: string;
  src: string;
  src_size: Srcsize;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  pivot: Pivot2;
}

export interface Pivot2 {
  bank_id: number;
  image_id: number;
}

export interface Srcsize {
  xl: string;
  l: string;
  m: string;
  s: string;
}

export interface Pivot {
  product_id: number;
  bank_id: number;
}
