import { Component, OnInit } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import {ActivatedRoute, Params, Router} from '@angular/router';
@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.css']
})
export class LoadProductComponent implements OnInit {

  MyProduct: DataProductDB[] = [];
   // tslint:disable-next-line: no-inferrable-types
   pagesActual: number = 1;
   // tslint:disable-next-line: variable-name
   last_Page_Pagination: number;
   // tslint:disable-next-line: no-inferrable-types
   totalProductAPI: number = 0;
   // tslint:disable-next-line: no-inferrable-types
   page: number = 1;

   addProductNew = false;

  constructor(public storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getData(this.page);

    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });

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

    this.storeService.geatAllProducts(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      page)
      .subscribe( (resp: ProductosLoads) => {
        this.MyProduct = resp.data;
        console.log('MY PRODUCTOS', this.MyProduct);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
    });

  }

  addNewProduct(){
    this.addProductNew = true;
  }

}
