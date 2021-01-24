export interface EditProductStore {
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
  store: Store;
  images: Image[];
  delivery: Delivery;
  sync_bank: any[];
  subcategories: Subcategory[];
  marks: Mark[];
  recipes: any[];
  factories: Factory[];
  suggestion?: any;
}

export interface Factory {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot4;
}

export interface Pivot4 {
  product_id: number;
  factory_id: number;
}

export interface Mark {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot3;
}

export interface Pivot3 {
  product_id: number;
  mark_id: number;
}

export interface Subcategory {
  id: number;
  name: string;
  category_id: number;
  creator: string;
  user_creator_id?: any;
  store_creator_id?: any;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot2;
  category: Category;
}

interface Category {
  id: number;
  name: string;
  creator: string;
  user_creator_id?: any;
  store_creator_id?: any;
  created_at?: any;
  updated_at?: any;
}

export interface Pivot2 {
  product_id: number;
  subcategory_id: number;
}

interface Delivery {
  id: number;
  product_id: number;
  delivery: string;
  created_at: string;
  updated_at: string;
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

export interface Pivot {
  product_id: number;
  image_id: number;
}

export interface Srcsize {
  xl: string;
  l: string;
  m: string;
  s: string;
}

export interface Store {
  id: number;
  user_id: number;
  rut: string;
  name: string;
  social_reason?: any;
  description?: any;
  level: string;
  certification: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
