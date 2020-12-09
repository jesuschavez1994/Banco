import { Component, Input, OnInit, } from '@angular/core';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedProduct: Product;

  constructor( ) {

  }

  ngOnInit(): void {
  }

}
