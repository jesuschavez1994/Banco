import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';

@Component({
  selector: 'app-products-cards-store',
  templateUrl: './products-cards-store.component.html',
  styleUrls: ['./products-cards-store.component.scss']
})
export class ProductsCardsStoreComponent implements OnInit {

  @Input() itemsPerPage = 16;
  @Input() totalItems: number;
  @Input() products: ProductsCardsOptions[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
