export interface ListProductSyncAnNoSync {
  current_page: number;
  data: DataListProductSyncAnNoSync[];
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

export interface DataListProductSyncAnNoSync {
  id: number;
  store_id: number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  sincronice: string;
  aviable: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  store: Store;
  images: any[];
  delivery?: Delivery;
  sync_bank: Syncbank[];
  subcategories: Subcategory2[];
  marks: Mark2[];
  recipes: Recipe[];
  factories: Factory2[];
  suggestion?: Suggestion;
}

export interface Suggestion {
  id: number;
  product_id: number;
  bank_id?: any;
  data: DataSuggestion[];
  created_at: string;
  updated_at: string;
}

export interface DataSuggestion {
  id: number;
  name: string;
  description?: string | string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  bank_id: number;
  images: any[];
}

export interface Factory2 {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot9;
}

export interface Pivot9 {
  product_id: number;
  factory_id: number;
}

export interface Recipe {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot8;
}

export interface Pivot8 {
  product_id: number;
  recipe_id: number;
}

export interface Mark2 {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot7;
}

export interface Pivot7 {
  product_id: number;
  mark_id: number;
}

export interface Subcategory2 {
  id: number;
  name: string;
  category_id: number;
  creator: string;
  user_creator_id?: any;
  store_creator_id?: any;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot6;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  creator: string;
  user_creator_id?: any;
  store_creator_id?: any;
  created_at?: any;
  updated_at?: any;
}

export interface Pivot6 {
  product_id: number;
  subcategory_id: number;
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
  subcategories: Subcategory[];
  marks: Mark[];
  factories: Factory[];
}

export interface Factory {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot5;
}

export interface Pivot5 {
  bank_id: number;
  factory_id: number;
}

export interface Mark {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot4;
}

export interface Pivot4 {
  bank_id: number;
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
  pivot: Pivot3;
}

export interface Pivot3 {
  bank_id: number;
  subcategory_id: number;
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

export interface Delivery {
  id: number;
  product_id: number;
  delivery: string;
  created_at: string;
  updated_at: string;
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