export interface ProductosLoads {
  current_page: number;
  data: DataProductDB[];
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
  images: Image[];
  sync_bank: any[];
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
  pivot: Pivot;
}

interface Pivot {
  product_id: number;
  image_id: number;
}

interface Srcsize {
  xl: string;
  l: string;
  m: string;
  s: string;
}
