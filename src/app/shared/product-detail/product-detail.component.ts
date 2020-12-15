import { Component, Input, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { QuantityCounterComponent } from '../quantity-counter/quantity-counter.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {

  @ViewChild('quantityCounter') quantityCounter: QuantityCounterComponent;
  @Input() selectedProduct: ProductsCardsOptions;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

    if (this.quantityCounter) {
      this.quantityCounter.initInputValue();
    }

  }

  public addToCart() {

    this.quantityCounter.valid();

    // Luego el codigo para agregar al carrito
  }

}
