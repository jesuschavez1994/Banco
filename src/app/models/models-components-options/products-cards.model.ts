// import { Injectable } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { Product } from '@interfaces/product.interface';

// @Injectable({
//   providedIn: 'root'
// })
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


  /**
   * @description
   * Permite que a pesar de que el array de objetos contenga nombres de atributo diferentes a los que utiliza el
   * component products-cards, estos sean reasignados bajo los nombres correctos
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @param {Product[]} productsResp
   * @param {string[]} atributtesNames
   * @returns {*}  {ProductsCardsOptions[]}
   * @memberof ProductsCardsController
   */
  public formatProductsResponse( productsResp: Product[], atributtesNames: string[] ): ProductsCardsOptions[]{

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

  public formatProductResponse( productResp: Product, atributtesNames: string[] ): ProductsCardsOptions{

    return {
      name: productResp[`${atributtesNames[0]}`],
      description: productResp[`${atributtesNames[1]}`],
      price: productResp[`${atributtesNames[2]}`],
      stock: productResp[`${atributtesNames[3]}`],
      images: productResp[`${atributtesNames[4]}`],
      id: productResp[`${atributtesNames[5]}`] ? productResp[`${atributtesNames[5]}`] : -1,
      idStore: productResp[`${atributtesNames[6]}`] ? productResp[`${atributtesNames[6]}`] : -1,
      isFavorite: productResp[`${atributtesNames[7]}`] ? true : this.isFavorite,
    };

  }

}
