export interface StoreResponse {
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
  user: User;
  contact: Contact;
  social: Social;
  images: any[];
  banner_image: any[];
}

export interface Social {
  id: number;
  store_id: number;
  facebook?: any;
  instagram?: any;
  twitter?: any;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  store_id: number;
  address_address?: any;
  address_latitude?: any;
  address_longitude?: any;
  direction?: any;
  webside?: any;
  email_1?: any;
  email_2?: any;
  phone_1?: any;
  phone_2?: any;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  email_verified_at?: any;
  provider_id?: any;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}
