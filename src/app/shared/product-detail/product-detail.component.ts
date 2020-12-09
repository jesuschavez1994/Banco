import { Component, Input, OnInit, } from '@angular/core';
import { QuantityCounterOptions } from '@interfaces/components-options/quantity-counter.interface';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedProduct: Product;

  counter: QuantityCounterOptions = {
    maxValue: 5,
    initValue: 1,
    changeValue: 1,
    minValue: 1,
  };

  constructor( ) { }

  ngOnInit(): void {
  }

}
