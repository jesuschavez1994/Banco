export interface Region {
  id: number;
  name: string;
  ordinal: string;
  created_at?: any;
  updated_at?: any;
  communes: Commune[];
}

export interface Commune {
  id: number;
  name: string;
  region_id: number;
  created_at?: any;
  updated_at?: any;
  region?: Region;
}
