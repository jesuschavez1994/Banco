/* 
	Interfaces usadas en el modelo de datos de los planes
*/

export interface BonusDetails {
  description: string;
  available?: boolean;
}

export interface ProductBankDetails {
  index: number;
  amountOfPictures: number | string;
  price: number;
}
