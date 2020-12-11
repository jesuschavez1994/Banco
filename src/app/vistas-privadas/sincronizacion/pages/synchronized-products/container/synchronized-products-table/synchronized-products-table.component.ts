import { Component, OnInit, Output } from '@angular/core';
import { StoreService } from '../../../../../../services/store/store.service';
import { ProductosLoads, DataProductDB } from '../../../../../../interfaces/InterfaceProducto';
import { SincronizacionService } from '../../../../../../services/sincronizacion/sincronizacion.service';
import { ListProductSyncAnNoSync, DataListProductSyncAnNoSync } from '../../../../../../interfaces/table-product-sync-and-no-sync/ListProductSyncAndNosync';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-synchronized-products-table',
  templateUrl: './synchronized-products-table.component.html',
  styleUrls: ['./synchronized-products-table.component.css']
})
export class SynchronizedProductsTableComponent implements OnInit {

  itemProductos: DataListProductSyncAnNoSync[] = [];
  index = [];
  page = 1;
  total = 0;
  perPage = 10;
  totalPage: number = 0;

  constructor(  public storeService: StoreService,
                private sincronizacion: SincronizacionService,
                private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {

    this.getData(this.page);

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
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

  // En este caso lo que hará es que “reasignará”
  // la URL y obtendrá la información usando la nueva página
  pageChanged(page: number) {
    this.page = page;
    const queryParams: Params = {page};
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams
      }
    );
    this.getData(this.page);
  }

  getData(page?: number){

    this.sincronizacion.ListProductSincronizadosYNosincronizados(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      page
    ).subscribe((resp: ListProductSyncAnNoSync) => {
      console.log('DataList', resp.data);
      this.itemProductos = resp.data;
      this.totalPage = resp.total;
    })

  }


}
