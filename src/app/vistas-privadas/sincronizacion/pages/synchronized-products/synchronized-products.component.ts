import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { ProductosLoads, DataProductDB } from '@interfaces/InterfaceProducto';

@Component({
  selector: 'app-synchronized-products',
  templateUrl: './synchronized-products.component.html',
  styleUrls: ['./synchronized-products.component.css']
})
export class SynchronizedProductsComponent implements OnInit {

  constructor(public storeService: StoreService) { }

  itemProductos: DataProductDB[] = [];
  sinchronized = false;

  ngOnInit(): void {
    this.storeService.ProductGet(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'))
      .subscribe( (resp: ProductosLoads) => {
      this.itemProductos = resp.data;
      console.log('ITEM', this.itemProductos);

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.itemProductos.length; i++){
        if (this.itemProductos[i].sincronice === 'sincronizado'){
          return this.sinchronized = true;
        }else{
          this.sinchronized = false;
        }
      }
    });
  }


}
