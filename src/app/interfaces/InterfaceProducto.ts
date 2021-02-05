
export interface ProductosLoads {
  current_page: number;
  data: DataProductDB[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface DataProductDB {
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
  images: any[];
  sync_bank: (Syncbank | Syncbank2)[];
  suggestion: Suggestion;
}

export interface Suggestion {
  id: number;
  product_id: number;
  data: Datum[];
  created_at: string;
  updated_at: string;
  bank_id?: any;
}

export interface Datum {
  id: number;
  name: string;
  description?: string | string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  bank_id: number;
  images: Image2[];
}

interface Image2 {
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

export interface Srcsize {
  xl: string;
  l: string;
  m: string;
  s: string;
}

export interface Syncbank2 {
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
  src_size: string;
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

export interface Syncbank {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  pivot: Pivot;
  images: any[];
}

export interface Pivot {
  product_id: number;
  bank_id: number;
}
