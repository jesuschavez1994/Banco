import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../../../../../services/store/store.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Descripcion } from '@interfaces/sincronizacion';
import { Total, Suggestion } from '@interfaces/sincronizacion';
import { SincronizacionService } from '../../../../../../services/sincronizacion/sincronizacion.service';
import { SincronizarElProducto } from '@models/sincronizacion/documentExcel.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-items-suggested-products',
  templateUrl: './items-suggested-products.component.html',
  styleUrls: ['./items-suggested-products.component.css']
})
export class ItemsSuggestedProductsComponent implements OnInit {

  pagesActual: number = 1;
  forma: FormGroup;

  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number;
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  page: number = 1;

  MyProduct: Descripcion[] = [];
  itemProductos: Descripcion[] = [];
  DescripcionProduct: Descripcion;

  constructor(public storeService: StoreService,
              public sincronizacion: SincronizacionService,
              private route: ActivatedRoute,
              private router: Router) {

                this.forma = new FormGroup({
                  banck_id: new FormControl(''),
                });


               }

  ngOnInit() {

    this.getData(this.page);

    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });


  }

  SelectCheckBox(e: any, i: string){
    console.log(e.checked);

    if (e.checked){
      document.getElementById(i).style.filter = 'grayscale(5%) brightness(90%) opacity(100%)';
      document.getElementById(i).style.filter = '-webkit-filter: grayscale(5%) brightness(90%) opacity(100%)';
      document.getElementById(i).style.filter = '-moz-filter: grayscale(5%) brightness(90%) opacity(100%)';
      document.getElementById(i).style.background = '#f4f4f4';
    }
    else{
      document.getElementById(i).style.background = 'none';
      document.getElementById(i).style.filter = 'none';
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

    this.storeService.geatAllProducts(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      page)
      .subscribe( (resp: Total) => {
        this.MyProduct = resp.data;
        // this.dataObject = resp.data.suggestion.data.JSON.parse();
        console.log('MY PRODUCTOS', this.MyProduct);

        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
    });

  }

  formSincronizacion(){
  }

  sincronizar(index?: string){
    console.log(index);

    // tslint:disable-next-line: no-unused-expression
    this.MyProduct[index];
    console.log(this.MyProduct[index].id);
    console.log(this.MyProduct[index]);
    console.log(this.MyProduct[index].suggestion);
    console.log(this.MyProduct[index].suggestion.data);
    console.log(this.MyProduct[index].suggestion.data[index]);
    console.log(this.MyProduct[index].suggestion.data[index].bank_id);
    const banck_id = new SincronizarElProducto(
      this.MyProduct[index].suggestion.data[index].bank_id
    );

    this.sincronizacion.productSyncrhonized(
    localStorage.getItem('id'),
    localStorage.getItem('storeId'),
    this.MyProduct[index].id,
    banck_id
    );

  }

  IrPaginacion(){
    window.scrollTo({
      top: 10000000,
    });
  }



}
