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
  marks: Mark[]; // any
  factories: Factory[]; //
  subcategories: Subcategory[]; //
  delivery: Delivery; //
  store: Store; //
  recipes: Recipe[]; //
  images: Image[]; // string[]
  sync_bank: Syncbank[];
  suggestion: SuggestionsResponse;
  isFavorite?: boolean; // este lo invente, en la respuesta actual no forma parte
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

export interface Srcsize {
  xl: string;
  l: string;
  m: string;
  s: string;
}

export interface Pivot2 {
  bank_id: number;
  image_id: number;
}

export interface Pivot {
  product_id: number;
  bank_id: number;
}

interface Recipe { //
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot4;
}

interface Store { //
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
  delivery: Delivery;
}

interface Delivery { //
  id: number;
  product_id: number;
  delivery: string;
  distance_km?: number;
  created_at: string;
  updated_at: string;
}

interface Subcategory { //
  id: number;
  name: string;
  category_id: number;
  creator: string;
  user_creator_id?: any;
  store_creator_id?: any;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot3;
  category: Category;
}

interface Category { //
  id: number;
  name: string;
  creator: string;
  user_creator_id?: any;
  store_creator_id?: any;
  created_at?: any;
  updated_at?: any;
}

interface Mark { //
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot;
}

interface Factory { //
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot2;
}

interface Pivot3 {
  product_id: number;
  subcategory_id: number;
}

interface Pivot4 {
  product_id: number;
  recipe_id: number;
}

// Others
export interface FilterProductResp{
  marks?: string[];
  subcategories?: string[];
  categories?: string[];
  factories?: string[];
  price?: number[];
  delivery?: boolean;
  recipes?: string[];
}
