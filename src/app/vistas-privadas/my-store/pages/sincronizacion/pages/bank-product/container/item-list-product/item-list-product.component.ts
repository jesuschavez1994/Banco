import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataProductDB } from '@interfaces/InterfaceProducto';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';

@Component({
  selector: 'app-item-list-product',
  templateUrl: './item-list-product.component.html',
  styleUrls: ['./item-list-product.component.scss']
})
export class ItemListProductComponent implements OnInit {

  // PARAMETROS //

  p = 1;
  id: string;

  // ENTADAS //
  @Input() index: string;
  @Input() item: DataProductDB;
  @Input() MyProduct: DataProductDB;
  @Input() itemsPerPage = 16;
  @Input() totalItems: number;
  @Input() products: ProductsCardsOptions[] = [];

  // salidas

  @Output() pagination = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  public pageChanged(event) {
    this.p = event;
    this.pagination.emit(this.p);
  }

}
