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
  images: any;
  id?: number;
  idStore?: number;
  isFavorite?: boolean;
  // images_sync_bank?: any;

}

