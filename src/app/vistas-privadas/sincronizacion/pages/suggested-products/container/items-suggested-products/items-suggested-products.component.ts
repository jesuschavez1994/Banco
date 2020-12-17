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


export interface ICarouselItem {
  bank_id: number;
  description:string;
  id: number
  images: []
  name: string;
  marginLeft?: number;
}


@Component({
  selector: 'app-items-suggested-products',
  templateUrl: './items-suggested-products.component.html',
  styleUrls: ['./items-suggested-products.component.css']
})


export class ItemsSuggestedProductsComponent implements OnInit{

  imgsBanners: bannerOptions = {
    m: 'assets/img/test-img/banner.png'
  };

  @Input() SetAllCheckbox: boolean;
  @Input() PalabraBuscador: ProductosLoads;
  @Input() items: ICarouselItem[] = [];
  @ViewChild("grid") grid: ElementRef;

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  // pagesActual = 69;
  forma: FormGroup;
  slideIndex = 1;
  next = 0;
  palabra: any
  suggestedShow = false;

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

  public currentPosition = 0;

  constructor(public storeService: StoreService,
              public sincronizacion: SincronizacionService,
              private route: ActivatedRoute,
              private router: Router,
              private renderer: Renderer2,
              private el: ElementRef
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
        this.suggestedShow = true;
        // this.dataObject = resp.data.suggestion.data.JSON.parse();
        console.log('MY PRODUCTOSSSS', this.MyProduct);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
    });

  }


  setCurrentPosition(position: number, item: ICarouselItem[], iterador: any) {
    console.log('position', position);
    console.log('item', item);
    this.currentPosition = position;
    // this.items.find(i => i.id === 0).marginLeft = -100 * position;
    item.find(element => element.bank_id === 0 ).marginLeft = -100 * position;
  }

 
  ToNextItem(indice: any, item: ICarouselItem[], iterador: any){
    console.log(indice);
    console.log('item', item);
    console.log('iterador', iterador);


    this.finalPercentage = 0;

    
    let nextPosition = this.currentPosition + 1;
    console.log('nextPosition', nextPosition);
    if (nextPosition <= item.length - 1) {
      this.finalPercentage = -100 * nextPosition;
      console.log('finalPercentage', this.finalPercentage);
    } else {
      nextPosition = 0;
      console.log('nextPosition', nextPosition);
    }
    // this.items.find(i => i.bank_id === 0).marginLeft = finalPercentage;
    console.log('finalPercentage', this.finalPercentage);
    this.currentPosition = nextPosition;
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
