export interface PaymentDetails {
  id: number;
  order_id: number;
  contact_id: number;
  address_latitude: number;
  address_longitude: number;
  name: string;
  dispatched: string;
  delivered: string;
  created_at: string;
  updated_at: string;
  contact: Contact;
}

interface Contact {
  id: number;
  user_id: number;
  commune_id: number;
  direction: string;
  house: string;
  phone: string;
  rut: string;
  address_latitude: number;
  address_longitude: number;
  created_at: string;
  updated_at: string;
  commune: Commune;
}

interface Commune {
  id: number;
  name: string;
  region_id: number;
  created_at: null;
  updated_at: null;
  region: Region;
}

interface Region {
  id: number;
  name: string;
  ordinal: string;
  created_at: null;
  updated_at: null;
}

export interface PaymentCredentials {
  order_id: string;
  type: string;
  amount: number;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface MallTransactionCredentials {
  token: string;
  url: string;
}
