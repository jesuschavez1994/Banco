import { ProductsCardsOptions } from '@app/interfaces/components-options/products-cards.option.interface';
import { Product as ProductInterface } from '@interfaces/product.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductModel {
  productsCardsComponent = new ProductsCardsComponent();
}

class ProductsCardsComponent {

  /**
   * @description Formatea la respuesta del back para coincidir con el formato de objecto necesario para el componente
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christopher<@>matiz.com.ve
   * @date 21/02/2021
   * @param {ProductInterface[]} products
   * @memberof ProductsCardsComponent
   */
  public formatProductResp(productsResp: ProductInterface[] | ProductInterface): ProductsCardsOptions[] {

    const isProductArray = Array.isArray(productsResp);

    let products;
    products = [];

    let productsFormatead;
    productsFormatead = [];

    if (isProductArray) { // si es un array de products
      products = productsResp; // solo guardamos las repuestas bajo la variable a usar con el .map

    }else { // en caso de NO ser array de productos
      products = [productsResp]; // Lo convertimos en un array, para no volver a crear el código siguiente

    }

    // Formateamos la respuesta
    productsFormatead = products.map( product => {

      let images = [];

      if (product.sync_bank) {

        if (product.sync_bank.length === 0) {

          images = product.images.map(image => {
            return image.src;
          });

        }else {
          const syncBankImages = product.sync_bank.map(syncBank => {
            return syncBank.images;
          });

          images = syncBankImages.map(syncBankImage => {
            return syncBankImage.map(syBankImage => {
              return syBankImage.src;
            });
          });

        }

      }else {
        images = product.images.map(image => {
          return image.src;
        });
      }

      return {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images, // product.images
        id: product.id ? product.id : -1,
        idStore: product.store_id ? product.store_id : -1,
        isFavorite: product.isFavorite ? product.isFavorite : false,
      };

    } );

    return productsFormatead;

  }

}
