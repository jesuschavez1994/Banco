import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { Product } from '@interfaces/product.interface';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.scss']
})
export class ProductsCardsComponent implements OnInit {

  p = 1;
  @Input() itemsPerPage = 16;
  @Input() totalItems: number;
  @Input() products: ProductsCardsOptions[] = [];
  @Input() showShimmer = true;

  @Output() selected = new EventEmitter<ProductsCardsOptions>();
  @Output() pagination = new EventEmitter<number>();



  constructor(

  ) { }

  ngOnInit(): void {
  }

  public selectedProduct(product: ProductsCardsOptions){
    this.selected.emit(product);
  }


  public pageChanged(event) {
    this.p = event;

    this.pagination.emit(this.p);

  }

  public toggleShimmer(show = true) {
    this.showShimmer = show;
  }
}
