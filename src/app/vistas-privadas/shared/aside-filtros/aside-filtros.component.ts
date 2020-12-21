import { ProductLoadingService } from '../../../services/product-loading/product-loading.service';
import { FilstroStoreService } from '../../../services/FiltroStore/filstro-store.service';

import {Component, OnInit, Input, Output, EventEmitter, ElementRef,ViewChild, HostListener} from '@angular/core';


@Component({
  selector: 'app-aside-filtros',
  templateUrl: './aside-filtros.component.html',
  styleUrls: ['./aside-filtros.component.scss']
})
export class AsideFiltrosComponent implements OnInit {

  // **** Input **** //
  @Input() isExpanded = false;

  // **** Output **** //
  @Output() sidebarExpand = new EventEmitter<boolean>();
  @Output() categiriaSelected = new EventEmitter<string>();
  @Output() subcategiriaSelected = new EventEmitter<string>();

  // **** Viewchild **** //
  @ViewChild('sidebarList') sidebarList: ElementRef;




  // VARIABLES LOCALES //
  category: any;
  subcategoria: any;

  constructor(public _productLoadingService: ProductLoadingService,
              public filtroService: FilstroStoreService) { 
              
              this.categiriaSelected = new EventEmitter();
                
              }

  ngOnInit(): void {

    // *** GET CATEGORIAS ***//
    this.GetCategoriasFiltro();

    // *** SUBCATEGORIAS ***// 
    this.GetSubcategorias();
  }

  @HostListener('window:scroll', ['$event'])
  public fixedSidebar( $event: Event){

    const sidebarList = this.sidebarList.nativeElement;
    const pxTopElement = sidebarList.offsetTop;
    const pxTopDocument = document.documentElement.scrollTop;

    if ( pxTopDocument > pxTopElement ) {
      sidebarList.classList.add( 'aside--fixed' );
    } else {
      sidebarList.classList.remove( 'aside--fixed' );
    }

  }

  public toggleSidebarList(event){
    this.isExpanded = event;
    this.sidebarExpand.emit( this.isExpanded );

  }

  public GetCategoriasFiltro(){
    this.filtroService.GetCategoriaStoreFiltro(
      localStorage.getItem('storeId'))
      .subscribe( response => {
      console.log('CATEGORIAS', response);
      return this.category = response;
    });
  }

  public GetSubcategorias(){
    this.filtroService.GetSubcategoriaStoreFiltro(
      localStorage.getItem('storeId'))
      .subscribe( resp => {
      console.log('SUBCATEGORIAS', resp);
      this.subcategoria = resp;
    })
  }

  public CategorySelect(value: string){
    console.log(value);
    this.categiriaSelected.emit(value);
  }

}
