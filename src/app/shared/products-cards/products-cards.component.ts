import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.options.interface';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent implements OnInit {

  @Input() products: ProductsCardsOptions[];
  @Output() selected = new EventEmitter<ProductsCardsOptions>();

  constructor() { }

  ngOnInit(): void {
  }

  public selectProduct(product){
    this.selected.emit(product);
  }

}
