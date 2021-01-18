interface productSubcat {
  current_page: number;
  data: Datum[];
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

interface Datum {
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
  subcategories: Subcategory[];
  store: Store;
  images: any[];
  delivery?: any;
  sync_bank: any[];
  marks: Mark[];
  recipes: any[];
  factories: Factory[];
}

interface Factory {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot3;
}

interface Pivot3 {
  product_id: number;
  factory_id: number;
}

interface Mark {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot2;
}

interface Pivot2 {
  product_id: number;
  mark_id: number;
}

interface Store {
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

interface Subcategory {
  id: number;
  name: string;
  category_id: number;
  creator: string;
  user_creator_id?: any;
  store_creator_id?: any;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot;
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

interface Pivot {
  product_id: number;
  subcategory_id: number;
}