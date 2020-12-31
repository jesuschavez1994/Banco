export interface OrderListOptions {
  id: number;
  business: Business;
  orders: Order[];
  hasPaid: boolean;
}
export interface Order {
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  images: string[];
  id?: number;
  idStore?: number;
  hasDelivery?: boolean;

}
export interface Business {
  name: string;
  img: string;
}
