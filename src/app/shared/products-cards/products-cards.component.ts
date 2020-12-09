import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent implements OnInit {

  @Input() products: Product[];
  @Output() selected = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  public selectProduct(product){
    this.selected.emit(product);
  }

}
