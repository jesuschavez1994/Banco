import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { BannerOptions }  from '@interfaces/components-options/banner.options.interface';
import { NgxSpinnerService } from "ngx-spinner";
import { FilstroStoreService } from '../../../services/FiltroStore/filstro-store.service';
import { FiltroStore } from '../../../models/filtro/filtro-store.model';
import { ProductsCardsStoreComponent } from '../../shared/products-cards-store/products-cards-store/products-cards-store.component';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.css']
})
export class LoadProductComponent implements OnInit {

  @ViewChild('productCardsStore') productCardsStore: ProductsCardsStoreComponent;

  imgsBanners: BannerOptions = {
    m: 'assets/img/Banner/Banner1.svg'
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
   itemsPerPage = 16;
   

   marks         = [];
   subcategories = [];
   categories    = [];
   factories     = [];
   price         = [];
   delivery      = '';
   recipes       = [];

  constructor(public storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private filtroService: FilstroStoreService) { }

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
      .subscribe( (resp: any) => {

        const products = resp.data

        this.MyProduct = resp.data;
        console.log('MY PRODUCTOS', this.MyProduct);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
        this.itemsPerPage = resp.per_page;
        this.showFooterPaginations = true;
        this.spinnerService.hide();
        this.scrollTop();

        this.productCardsStore.products = products.map( product => {
          console.log('MAP', product);


          if( ( product.images.length > 0 || product.images.length === 0) && product.sync_bank.length === 0 ){
            const images = product.images.map(image => {
              return image.src;
            });
  
            return {
              name: product.name,
              description: product.description,
              price: product.price,
              stock: product.stock,
              images, // product.images
              id: product.id ? product.id : -1,
              idStore: product.store_id ? product.store_id : -1,
              isFavorite: product.isFavorite ? product.isFavorite : false,
              sinchronized: product.sincronice
            };
          }

          if(product.sync_bank.length > 0){
            const images = product.sync_bank.map(image => {
              return image.images[0].src_size.xl;
            });
  
            return {
              name: product.name,
              description: product.description,
              price: product.price,
              stock: product.stock,
              images, // product.images
              id: product.id ? product.id : -1,
              idStore: product.store_id ? product.store_id : -1,
              isFavorite: product.isFavorite ? product.isFavorite : false,
              sinchronized: product.sincronice
            };
          }

        });

        console.log('products loaded: ', this.productCardsStore.products);


    });

  }

  public handleSearch(value: string): void {

    

    console.log('value', value);
    if(value !== undefined){
      let comparacion = new FiltroStore( 
        value,
        this.marks,
        this.subcategories,
        this.categories,
        this.factories,
        this.price,
        this.delivery,
        this.recipes,
          
      );
      this.filtroService.PostProductSearchFiltro(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        comparacion).subscribe( (resp: ProductosLoads) => {
          this.MyProduct = resp.data;
      })
    }
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



  // ****** ///

}
