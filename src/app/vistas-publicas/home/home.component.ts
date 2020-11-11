import { Component, OnInit } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { ProductosLoads } from '@interfaces/InterfaceProducto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemProductos: DataProductDB[] = [];

  constructor(public storeService: StoreService) { }

  ngOnInit() {
    this.storeService.ProductGet(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'))
      .subscribe( (resp: ProductosLoads) => {
      this.itemProductos = resp.data;
      console.log('ITEM', this.itemProductos);
    });
  }

}
