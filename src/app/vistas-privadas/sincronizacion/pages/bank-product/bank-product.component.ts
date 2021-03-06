import { Component, OnInit, ViewChild } from '@angular/core';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { ProductosLoads,  DataProductDB} from '@interfaces/InterfaceProducto';
import {  ActivatedRoute, Params, Router} from '@angular/router';
import { Descripcion } from '../../../../interfaces/sincronizacion';
import { NgxSpinnerService } from "ngx-spinner";
import { ItemListProductComponent } from './container/item-list-product/item-list-product.component';


export class Termino {
  constructor(
      public name: string,
  ) { }
}

@Component({
  selector: 'app-bank-product',
  templateUrl: './bank-product.component.html',
  styleUrls: ['./bank-product.component.css']
})
export class BankProductComponent implements OnInit {

  itemProduct: DataProductDB[];
  MyProduct: ProductosLoads;
  page: number = 1;
  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number;
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0;
  showFooterPaginations = false;
  scroll:boolean=false;
  itemsPerPage = 16;

  @ViewChild('bankProductList') bankProductList: ItemListProductComponent;

  constructor(public sincronizacion: SincronizacionService,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData(this.page);
    window.addEventListener('scroll', this.scrolling, true);
    this.spinner();
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });
  }

  spinner(): void{
    this.spinnerService.show();
  }

  public handleSearch(value: string): void {
    console.log('value', value);
    if(value !== undefined){
      let comparacion = new Termino( value  );
      this.sincronizacion.BuscadorBancoDeProductos(comparacion,
        localStorage.getItem('id'),
        localStorage.getItem('storeId')).subscribe( (resp: ProductosLoads) => {
        this.itemProduct = resp.data;
      })
    }
  }

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
    this.sincronizacion.GetBankProduct(page).subscribe( (resp: any) => {
      this.itemProduct = resp.data;
      console.log('RESPUESTA', resp);
      this.last_Page_Pagination = resp.last_page;
      this.totalProductAPI = resp.total;
      this.itemsPerPage = resp.per_page;
      this.showFooterPaginations = true;
      this.spinnerService.hide();
      const products = resp.data;
      this.scrollTop();

      this.bankProductList.products = products.map( product => {

        // console.log('MAP', product);

        return {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          images: product.images['0'].src_size.xl, // product.images
          id: product.id ? product.id : -1,
          idStore: product.store_id ? product.store_id : -1,
          isFavorite: product.isFavorite ? product.isFavorite : false,
          sinchronized: product.sincronice
        };

      });

      console.log('products loaded: ', this.bankProductList.products);


    });
  }


  scrolling=(s)=>{
    let sc = s.target.scrollingElement.scrollTop;
    console.log(sc);
    if(sc >=2733){this.scroll=true}
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
      top:300,
    });
  }

  

}
