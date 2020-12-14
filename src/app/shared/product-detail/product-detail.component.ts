import { Component, Input, OnInit } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedProduct: ProductsCardsOptions;

  constructor(
  ) {

  }

  ngOnInit(): void {

  }


}
