import { Component, OnInit } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { bannerOptions } from '@interfaces/components-options/banner.interface';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.css']
})
export class LoadProductComponent implements OnInit {

  imgsBanners: bannerOptions = {
    m: '../../../../assets/img/Banner/Banner1.svg'
  };

  MyProduct: DataProductDB[] = [];
   // tslint:disable-next-line: no-inferrable-types
   pagesActual: number = 1;
   // tslint:disable-next-line: variable-name
   last_Page_Pagination: number;
   // tslint:disable-next-line: no-inferrable-types
   totalProductAPI: number = 0;
   // tslint:disable-next-line: no-inferrable-types
   page: number = 1;
   scroll:boolean=false;


   addProductNew = false;

   showFooterPaginations = false;

  constructor(public storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getData(this.page);
    this.spinner();
    window.addEventListener('scroll', this.scrolling, true)
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });

  }

  spinner(): void{
    this.spinnerService.show();
  }

  // Funcion para el cambio de paginación //

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

    this.storeService.geatAllProducts(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      page)
      .subscribe( (resp: ProductosLoads) => {
        this.MyProduct = resp.data;
        console.log('MY PRODUCTOS', this.MyProduct);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
        this.showFooterPaginations = true;
        this.spinnerService.hide();
    });

  }

  addNewProduct(){
    this.addProductNew = true;
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
      top:0,
    });
  }

}
