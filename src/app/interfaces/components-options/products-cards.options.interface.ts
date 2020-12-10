/**
 * Las interfaces con extensión .option,
 * sirven para aclarar que datos utiliza el componente
 *
 */
export interface ProductsCardsOptions {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isFavorite?: boolean;

}
