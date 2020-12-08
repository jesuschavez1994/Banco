import { Component, OnInit, } from '@angular/core';
import { QuantityCounterOptions } from '@interfaces/components-options/quantity-counter.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productSelected = {
    imgs: [
      'assets/img/test-img/organic_protein.jpg',
      'assets/img/test-img/magazine_vegan_food.jpg',
      'assets/img/test-img/banner.png'
    ]
  };

  counter: QuantityCounterOptions = {
    maxValue: 5,
    initValue: 3,
    changeValue: 1,
    minValue: 1,
  };

  constructor( ) { }

  ngOnInit(): void {
  }

}
