import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.options.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent  {

  @Input() products: ProductsCardsOptions[];
  @Input() routerLink?: string[];
  @Output() selected = new EventEmitter<ProductsCardsOptions>();

  constructor( private router: Router, private activatedRoute: ActivatedRoute) { }

  public selectProduct(product: ProductsCardsOptions){

    this.selected.emit(product);

    if (product.id > -1 && product.idStore > -1){
      this.router.navigate( ['/business-detail', product.idStore, 'products', product.id] );

    }

  }

}
