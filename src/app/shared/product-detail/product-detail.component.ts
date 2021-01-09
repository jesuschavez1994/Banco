import { Component, Input, OnInit, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { QuantityCounterComponent } from '../quantity-counter/quantity-counter.component';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {

  @ViewChild('quantityCounter') quantityCounter: QuantityCounterComponent;
  @Input() selectedProduct: ProductsCardsOptions;
  @Output() clickButtonCart = new EventEmitter();

  buttonTitle = 'Añadir al carrito';
  quantityProduct = 0;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if (this.quantityCounter) {
      this.quantityCounter.initInputValue();
    }

  }

  public addToCart() {
    console.log('addToCart');

    this.quantityCounter.valid();

    this.clickButtonCart.emit(
      {
        product: this.selectedProduct,
        quantity: this.quantityProduct
      }
    );

    // Luego el codigo para agregar al carrito
  }


  /**
   * @description
   * Permite que a pesar de que el dato de una respuesta del backend contenga nombres de atributo diferentes
   * a los que utiliza el component products-cards, estos sean reasignados bajo los nombres correctos
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 15/12/2020
   * @param {Product} productResp
   * @param {string[]} atributtesNames
   * @returns {*}  {ProductsCardsOptions}
   * @memberof ProductsCardsController
   */
  public formatProductResponse( productResp: Product, atributtesNames: string[] ): ProductsCardsOptions{

    return {
      name: productResp[`${atributtesNames[0]}`],
      description: productResp[`${atributtesNames[1]}`],
      price: productResp[`${atributtesNames[2]}`],
      stock: productResp[`${atributtesNames[3]}`],
      images: productResp[`${atributtesNames[4]}`],
      id: productResp[`${atributtesNames[5]}`] ? productResp[`${atributtesNames[5]}`] : -1,
      idStore: productResp[`${atributtesNames[6]}`] ? productResp[`${atributtesNames[6]}`] : -1,
      isFavorite: productResp[`${atributtesNames[7]}`] ? true : false,
    };

  }

}
