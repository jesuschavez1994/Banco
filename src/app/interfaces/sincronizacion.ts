export interface Total {
  current_page: number;
  data: Descripcion[];
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

export interface Descripcion {
  id: number;
  store_id: number;
  name: string;
  description: string;
  price?: number;
  stock: number;
  sincronice: string;
  aviable: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  marks: Mark[];
  images: Image[];
  sync_bank: any[];
  suggestion: Suggestion;
}

export interface Suggestion {
  id: number;
  product_id: number;
  data: Datum[];
  created_at: string;
  updated_at: string;
}

export interface Datum {
  [x: string]: any;
  bank_id: number;
  name: string;
  description: string;
  marginLeft?: number;
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
  product_id: number;
  image_id: number;
}

export interface Srcsize {
  xl: string;
  l: string;
  m: string;
  s: string;
}

export interface Mark {
  id: number;
  name: string;
  created_at?: any;
  updated_at?: any;
  pivot: Pivot;
}

export interface Pivot {
  product_id: number;
  mark_id: number;
}


// export interface Total {
//   current_page: number;
//   data: Descripcion[];
//   first_page_url: string;
//   from: number;
//   last_page: number;
//   last_page_url: string;
//   next_page_url: string;
//   path: string;
//   per_page: number;
//   prev_page_url?: any;
//   to: number;
//   total: number;
// }

// export interface Descripcion {
//   id: number;
//   store_id: number;
//   name: string;
//   description?: string;
//   price?: number;
//   stock: number;
//   sincronice: string;
//   aviable: string;
//   created_at: string;
//   updated_at: string;
//   deleted_at?: any;
//   marks: Mark[];
//   images: Image[];
//   sync_bank: Syncbank[];
//   suggestion: Suggestion;
// }

// export interface Suggestion {
//   id: number;
//   product_id: number;
//   data: Datum[];
//   created_at: string;
//   updated_at: string;
//   bank_id?: any;
// }

// export interface Datum {
//   id: number;
//   name: string;
//   description?: string | string;
//   created_at: string;
//   updated_at: string;
//   deleted_at?: any;
//   bank_id: number;
//   images: Image3[][];
// }

// export interface Image3 {
//   id: number;
//   name: string;
//   src: string;
//   src_size: Srcsize;
//   version: number;
//   created_at: string;
//   updated_at: string;
//   deleted_at?: any;
//   pivot: Pivot4;
// }

// export interface Syncbank {
//   id: number;
//   name: string;
//   description: string;
//   created_at: string;
//   updated_at: string;
//   deleted_at?: any;
//   pivot: Pivot3;
//   images: Image2[];
// }

// export interface Image2 {
//   id: number;
//   name: string;
//   src: string;
//   src_size: string;
//   version: number;
//   created_at: string;
//   updated_at: string;
//   deleted_at?: any;
//   pivot: Pivot4;
// }

// export interface Pivot4 {
//   bank_id: number;
//   image_id: number;
// }

// export interface Pivot3 {
//   product_id: number;
//   bank_id: number;
// }

// export interface Image {
//   id: number;
//   name: string;
//   src: string;
//   src_size: Srcsize;
//   version: number;
//   created_at: string;
//   updated_at: string;
//   deleted_at?: any;
//   pivot: Pivot2;
// }

// export interface Pivot2 {
//   product_id: number;
//   image_id: number;
// }

// export interface Srcsize {
//   xl: string;
//   l: string;
//   m: string;
//   s: string;
// }

// export interface Mark {
//   id: number;
//   name: string;
//   created_at?: any;
//   updated_at?: any;
//   pivot: Pivot;
// }

// export interface Pivot {
//   product_id: number;
//   mark_id: number;
// }
