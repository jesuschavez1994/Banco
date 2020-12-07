import { Component, OnInit, Output } from '@angular/core';
import { StoreService } from '../../../../../../services/store/store.service';
import { ProductosLoads, DataProductDB } from '../../../../../../interfaces/InterfaceProducto';



@Component({
  selector: 'app-synchronized-products-table',
  templateUrl: './synchronized-products-table.component.html',
  styleUrls: ['./synchronized-products-table.component.css']
})
export class SynchronizedProductsTableComponent implements OnInit {

  itemProductos: DataProductDB[] = [];
  index = [];
  pagesActual = 1;
  total = 0;
  perPage = 10;

  constructor( public storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.ProductGet(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'))
      .subscribe( (resp: ProductosLoads) => {
      this.itemProductos = resp.data;
      console.log('ITEM', this.itemProductos);
    });
  }

  SynchronizedThis(evt: any, i: number){
    console.log(evt);
    if  (evt.checked === true){
      console.log(i);
      return  this.index.push(i);
    // tslint:disable-next-line: align
    }
    if (evt.checked === false) {
      return this.index.splice(i, 1);
    }
  }


}
