import {  Component, Input, OnInit } from '@angular/core';
import {  StoreService } from '../../../../../../services/store/store.service';
import {  ActivatedRoute, Params, Router} from '@angular/router';
import {  Descripcion } from '@interfaces/sincronizacion';
import {  Total, Suggestion, Datum } from '@interfaces/sincronizacion';
import {  SincronizacionService } from '../../../../../../services/sincronizacion/sincronizacion.service';
import {  SincronizarElProducto } from '@models/sincronizacion/documentExcel.model';
import {  FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Sugerir } from '../../../../../../models/sincronizacion/sugerir';

@Component({
  selector: 'app-items-suggested-products',
  templateUrl: './items-suggested-products.component.html',
  styleUrls: ['./items-suggested-products.component.css']
})
export class ItemsSuggestedProductsComponent implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  pagesActual = 1;
  forma: FormGroup;
  slideIndex = 1;
  next = 1;

  @Input() SetAllCheckbox: boolean;

  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number;
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0;
  Sugerenccias: any[];
  // tslint:disable-next-line: no-inferrable-types
  page: number = 1;


  MyProduct: Descripcion[] = [];
  itemProductos: Descripcion[] = [];
  DescripcionProduct: Descripcion;

  constructor(public storeService: StoreService,
              public sincronizacion: SincronizacionService,
              private route: ActivatedRoute,
              private router: Router)
  {

              this.forma = new FormGroup(
                {
                  banck_id: new FormControl(''),
                }
              );

  }

  Iterador: any[] = [];

  ngOnInit() {

    // if ( this.SetAllCheckbox ){
    //   for ( let index = 0; index < this.MyProduct.length; index++){
    //     document.getElementById(i).style.filter = 'grayscale(5%) brightness(90%) opacity(100%)';
    //     document.getElementById(i).style.filter = '-webkit-filter: grayscale(5%) brightness(90%) opacity(100%)';
    //     document.getElementById(i).style.filter = '-moz-filter: grayscale(5%) brightness(90%) opacity(100%)';
    //     document.getElementById(i).style.background = '#f4f4f4';
    //   }
    // }

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

        // tslint:disable-next-line: prefer-for-of
        // for ( let i = 0; i < this.MyProduct.length; i++){
        //   console.log('SUGERENCIAS', this.MyProduct[i].suggestion.data);
        //   this.Sugerenccias.splice(i, 1, this.MyProduct[i].suggestion.data);
        // }

        // let slides = document.getElementsByClassName('mySlides');
        // console.log(slides);
        // console.log(slides.length);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
    });

  }


  ToNextItem(event: number, iterador: any){
    console.log(event);
    console.log(iterador);

    if (event === 0){
    }
    switch (event){
      case 0:
        return this.next = this.next + 1;
    }
  }



  formSincronizacion(){
  }

  // SINCRONIZACION //
  sincronizar(index?: string){
    const id = new Sugerir(
      this.MyProduct[index].suggestion.data[index].bank_id
    );

    this.sincronizacion.productSyncrhonized(localStorage.getItem('id'),
    localStorage.getItem('storeId'),
    this.MyProduct[index].id, id).subscribe( resp => {
      console.log(resp);
    });
  }


  IrPaginacion(){
    window.scrollTo({
      top: 10000000,
    });
  }


}
