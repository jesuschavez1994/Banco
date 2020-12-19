import { Component, Input, OnInit, Renderer2, ElementRef, ViewChild,  ViewChildren, QueryList } from '@angular/core';
import {  StoreService } from '../../../../../../services/store/store.service';
import {  ActivatedRoute, Params, Router} from '@angular/router';
import {  Descripcion } from '@interfaces/sincronizacion';
import {  Total, Suggestion, Datum } from '@interfaces/sincronizacion';
import {  SincronizacionService } from '../../../../../../services/sincronizacion/sincronizacion.service';
import {  SincronizarElProducto } from '@models/sincronizacion/documentExcel.model';
import {  FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Sugerir } from '../../../../../../models/sincronizacion/sugerir';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import {BehaviorSubject} from 'rxjs';
import { Termino } from '../../../../../../models/buscador.model';
import { bannerOptions } from '@interfaces/components-options/banner.interface';
import { NgxSpinnerService } from "ngx-spinner";

export interface ICarouselItem {
  bank_id: number;
  description:string;
  id: number
  images: []
  name: string;
  marginLeft?: number;
}

interface EventID{
  idsuggested: string,
  idproducto: string
}


@Component({
  selector: 'app-items-suggested-products',
  templateUrl: './items-suggested-products.component.html',
  styleUrls: ['./items-suggested-products.component.css']
})


export class ItemsSuggestedProductsComponent implements OnInit{

  imgsBanners: bannerOptions = {
    m: '../../../../assets/img/Banner/Banner1.svg'
  };

  @Input() SetAllCheckbox: boolean;
  @Input() PalabraBuscador: ProductosLoads;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  // pagesActual = 69;
  forma: FormGroup;
  slideIndex = 1;
  next = 0;
  palabra: any
  suggestedShow = false;
  idProductoToSync: any;
  scroll:boolean=false;

  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number;
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0;
  Sugerenccias: any[];
  // tslint:disable-next-line: no-inferrable-types
  page: number = 1;
  filtro_valor: string = '';
  busqueda = false;
  textBuscador: any;

  MyProduct: Descripcion[] = [];
  itemProductos: Descripcion[] = [];
  DescripcionProduct: Descripcion;
  Iterador: any[] = [];
  finalPercentage: any;
  showFooterPaginations = false;

  public currentPosition = 0;

  constructor(public storeService: StoreService,
              public sincronizacion: SincronizacionService,
              private route: ActivatedRoute,
              private router: Router,
              private renderer: Renderer2,
              private el: ElementRef,
              private spinnerService: NgxSpinnerService
             )

  {
              this.route.params.subscribe(params => {
                console.log('query', params);
                this.textBuscador = params.id;
              })
              
              this.forma = new FormGroup(
                {
                  banck_id: new FormControl(''),
                }
              );

  }


  ngOnInit() {

    window.addEventListener('scroll', this.scrolling, true)

    this.getData(this.page);

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
        this.suggestedShow = true;
        // this.dataObject = resp.data.suggestion.data.JSON.parse();
        console.log('MY PRODUCTOSSSS', this.MyProduct);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
        this.showFooterPaginations = true;
        this.spinnerService.hide();
        
        this.scrollTop();
    });

  }


  formSincronizacion(){
  }

  // SINCRONIZACION //
  sincronizar(value: EventID){
    
    // this.idProductoToSync = this.MyProduct[index].id
    // console.log('to', this.idProductoToSync);

    console.log('id', value);

    const BankId = new Sugerir(
      value.idsuggested
    )

    this.sincronizacion.productSyncrhonized(
      localStorage.getItem('id'),
      localStorage.getItem('storeId'),
      value.idproducto,
      BankId
    ).subscribe( resp => {
      console.log(resp);
    })


  }


  scrolling=(s)=>{
    let sc = s.target.scrollingElement.scrollTop;
    console.log(sc);
    if(sc >=10602){this.scroll=true}
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
  

  // BUSCADOR //
  handleSearch(value: string): void {
    console.log(value);
    this.filtro_valor = value;

    let comparacion = new Termino( value  );

    this.sincronizacion.BuscadorSugerencias(
      comparacion,
      localStorage.getItem('id'),
      localStorage.getItem('storeId')).subscribe( (resp: Total) => {
      console.log(resp.data);
      return  this.MyProduct = resp.data;
    });
  }


}
