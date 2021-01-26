export interface Category {
  id: number;
  name: string;
  creator: string;
  user_creator_id?: any;
  store_creator_id?: any;
  created_at?: any;
  updated_at?: any;
  subcategories: Subcategory[];
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
}