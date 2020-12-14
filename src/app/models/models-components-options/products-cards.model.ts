import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.options.interface';
export class ProductsCardsController {

  private productsDataFormated: ProductsCardsOptions[] = [];

  constructor(
    public name?: string,
    public description?: string,
    public price?: number,
    public stock?: number,
    public images?: string[],
    public id: number =  -1,
    public idStore: number = -1,
    public isFavorite: boolean = false,
  ){
    // this.isFavorite = isFavorite;
  }

  public formatProductResponse( productsResp: any[], atributtesNames: string[] ){

    this.productsDataFormated = [];

    productsResp.forEach(product => {

      this.productsDataFormated.push(
        {
          name: product[`${atributtesNames[0]}`],
          description: product[`${atributtesNames[1]}`],
          price: product[`${atributtesNames[2]}`],
          stock: product[`${atributtesNames[3]}`],
          images: product[`${atributtesNames[4]}`],
          id: product[`${atributtesNames[5]}`] ? product[`${atributtesNames[5]}`] : -1,
          idStore: product[`${atributtesNames[6]}`] ? product[`${atributtesNames[6]}`] : -1,
          isFavorite: product[`${atributtesNames[7]}`] ? true : this.isFavorite,
        }
      );

    });

    return this.productsDataFormated;

  }

}
