import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { DataProductDB } from '../../../../interfaces/InterfaceProducto';
import { StoreService } from '../../../../services/store/store.service';

@Component({
  selector: 'app-products-cards-store',
  templateUrl: './products-cards-store.component.html',
  styleUrls: ['./products-cards-store.component.scss']
})
export class ProductsCardsStoreComponent implements OnInit {

  // PARAMETROS //
  p = 1;
  id: string;

  // ENTADAS //
  @Input() itemsPerPage = 16;
  @Input() totalItems: number;
  @Input() products: ProductsCardsOptions[] = [];
  @Input() MyProduct: DataProductDB;

  // SALIDAS // 
  @Output() pagination = new EventEmitter<number>();


  constructor(private cd: ChangeDetectorRef, public storeService: StoreService) { }

  ngOnInit(): void {
  }

  public Id(index){
    console.log(index);
    console.log(this.MyProduct[index].id);
    return this.id = this.MyProduct[index].id;
  }

  public refresh(){
    this.cd.detectChanges();
  }

  public Delete(index: number){
    console.log(index);
    this.storeService.DeleteProduct(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      this.MyProduct[index].id
    ).subscribe();
  }

  public pageChanged(event) {
    this.p = event;
    this.pagination.emit(this.p);
  }

}
