import { Component, OnInit, Output } from '@angular/core';
import { StoreService } from '../../../../../../services/store/store.service';
import { ProductosLoads, DataProductDB } from '../../../../../../interfaces/InterfaceProducto';
import { SincronizacionService } from '../../../../../../services/sincronizacion/sincronizacion.service';
import { ListProductSyncAnNoSync, DataListProductSyncAnNoSync } from '../../../../../../interfaces/table-product-sync-and-no-sync/ListProductSyncAndNosync';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

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
  showFooterPaginations = false;
  scroll:boolean=false;

  constructor(  public storeService: StoreService,
                private sincronizacion: SincronizacionService,
                private route: ActivatedRoute,
                private router: Router,
                private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    this.getData(this.page);

    window.addEventListener('scroll', this.scrolling, true)

    this.spinner()

    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });

  }

  spinner(): void{
    this.spinnerService.show();
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

    this.spinner();

    this.sincronizacion.ListProductSincronizadosYNosincronizados(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      page
    ).subscribe((resp: ListProductSyncAnNoSync) => {
      console.log('DataList', resp.data);
      this.itemProductos = resp.data;
      this.totalPage = resp.total;
      this.showFooterPaginations = true;
      this.spinnerService.hide();

      this.scrollTop();
    })

  }

  handleSearch($event){
    
  }

  scrolling=(s)=>{
    let sc = s.target.scrollingElement.scrollTop;
    console.log(sc);
    if(sc >=1027){this.scroll=true}
    else{
      this.scroll=false
    }
  }

  scrollDown(){
    window.scrollTo({
      top: 10000000,
    });
  }
  

  scrollTop(){
    window.scrollTo({
      top:0,
    });
  }


}
