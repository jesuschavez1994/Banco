export interface OrderListOptions {
  id: number;
  business: Business;
  orders: Order[];
  hasPaid: boolean;
}
/**
 * agrego el atributo de porcentaje de impuesto aquí
 * y no de forma global, para manejar la posibilidad de que
 * productos especificos tengan un porcentaje de impuesto
 * especifico (Porque chile no es Venezuela
 * y alguno paises manejan aranceles diferentes)
 */
export interface Order {
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  images: string[];
  id?: number;
  idStore?: number;
  taxPorcentageByProduct?: number;
  hasDelivery?: boolean;
  deliveryCost?: number;

}
export interface Business {
  name: string;
  img: string;
}
