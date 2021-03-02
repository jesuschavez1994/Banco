export interface UserPublic {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: any;
  email_verified_at?: any;
  provider_id?: any;
  role: string;
  created_at?: any;
  updated_at?: any;
  deleted_at?: any;
  image: Image[];
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
  pivot: Pivot;
}

interface Pivot {
  user_id: number;
  image_id: number;
}
