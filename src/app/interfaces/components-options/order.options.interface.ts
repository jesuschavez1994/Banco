export interface Order {
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  images: string[];
  id?: number;
  idStore?: number;
  isFavorite?: boolean;

}
