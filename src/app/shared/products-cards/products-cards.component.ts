import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent implements OnInit {

  @Input() products: ProductsCardsOptions[] = [];
  @Output() selected = new EventEmitter<ProductsCardsOptions>();

  constructor(


  ) { }

  ngOnInit(): void { }

  public selectedProduct(product: ProductsCardsOptions){
    this.selected.emit(product);
  }

  /**
   * @description
   * Permite que a pesar de que el array de objetos proveniente del la respuesta del backend contenga nombres de atributo
   * diferentes a los que utiliza el component products-cards, estos sean reasignados bajo los nombres correctos
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @param {Product[]} productsResp
   * @param {string[]} atributtesNames
   * @returns {*}  {ProductsCardsOptions[]}
   * @memberof ProductsCardsController
   */
  public formatProductsResponse( productsResp: Product[], atributtesNames: string[] ) {

    let  products = [];

    productsResp.forEach( product => {

      products.push(
        {
          name: product[`${atributtesNames[0]}`],
          description: product[`${atributtesNames[1]}`],
          price: product[`${atributtesNames[2]}`],
          stock: product[`${atributtesNames[3]}`],
          images: product[`${atributtesNames[4]}`],
          id: product[`${atributtesNames[5]}`] ? product[`${atributtesNames[5]}`] : -1,
          idStore: product[`${atributtesNames[6]}`] ? product[`${atributtesNames[6]}`] : -1,
          isFavorite: product[`${atributtesNames[7]}`] ? true : false,
        }
      );

    });

    return products;

  }

}
