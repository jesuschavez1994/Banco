import { Component, Input, OnInit } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedProduct: ProductsCardsOptions;
  currentValueCounter: number;

  constructor() { }

  ngOnInit(): void { }

  public setCurrentValueCounter(event) {
    this.currentValueCounter = event;

  }

  public addToCart() {
    const currentValueCounter = this.currentValueCounter;

    if ( isNaN((currentValueCounter)) ) {
      this.currentValueCounter = 1;

    }

    // Luego el codigo para agregar al carrito
  }

}
