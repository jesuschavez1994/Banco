import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  HostListener,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { DataProductDB, Image } from '@interfaces/InterfaceProducto';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { ActivatedRoute, Params, Router } from '@angular/router';
// tslint:disable-next-line: import-spacing
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { FilstroStoreService } from '../../../services/FiltroStore/filstro-store.service';
import { ProductsCardsStoreComponent } from '../../shared/products-cards-store/products-cards-store/products-cards-store.component';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';
import { StoreResponse } from '@interfaces/store.interface';
import { SearchStore } from '@models/search/search-store.model';
import { SearchService } from '@services/Search/search.service';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';

import * as Hammer from 'hammerjs';
import { MyStoreComponent } from '../../my-store/my-store.component';

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.scss'],
})
export class LoadProductComponent implements OnInit {
  @Input() isExpanded = false;

  @Output() sidebarExpand = new EventEmitter<boolean>();

  // Selectores //
  @ViewChild('main') main: ElementRef;
  @ViewChild('productCardsStore')
  productCardsStore: ProductsCardsStoreComponent;
  @ViewChild('MyStoreComponent') estadoAside: MyStoreComponent;

  breadcrumb: BreadcrumbOptions[];
  StoreName = '';
  // sidebar-list
  expandSidebar = true;
  textBuscador: any;

  marks = [];
  subcategories = [];
  factories = [];
  price = [];
  delivery = '';
  recipes = [];
  categories = [];

  imgsBanners: BannerOptions = {
    m: 'assets/img/Banner/Banner1.svg',
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
  scroll = false;
  addProductNew = false;
  showFooterPaginations = false;
  itemsPerPage = 16;

  filterOptions: FilterOption[] = [
    { label: 'filtrar por', value: 0 },
    { label: 'producto', value: 1 },
    { label: 'Empresa', value: 'hola' },
  ];

  constructor(
    public storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private filtroService: FilstroStoreService,
    private renderer: Renderer2,
    private _searchService: SearchService
  ) {
    this.route.params.subscribe((params) => {
      console.log('query', params);
      this.textBuscador = params.id;
    });
  }

  ngOnInit() {
    this.getData(this.page);
    // this.spinner();
    window.addEventListener('scroll', this.scrolling, true);
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe((params) => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });
  }

  spinner(): void {
    this.spinnerService.show();
  }

  // Funcion para el cambio de paginación //

  // En este caso lo que hará es que “reasignará”
  // la URL y obtendrá la información usando la nueva página
  pageChanged(page: number) {
    this.page = page;
    const queryParams: Params = { page };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
    this.getData(this.page);
  }

  getData(page?: number) {
    this.spinner();

    this.storeService
      .geatAllProducts(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        page
      )
      .subscribe((resp: any) => {
        const products = resp.data;

        this.MyProduct = resp.data;
        // console.log('MY PRODUCTOS', this.MyProduct);
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
        this.itemsPerPage = resp.per_page;
        this.showFooterPaginations = true;
        this.spinnerService.hide();
        this.scrollTop();

        this.productCardsStore.products = products.map((product) => {
          // console.log('MAP', product);

          if (
            (product.images.length > 0 || product.images.length === 0) &&
            product.sync_bank.length === 0
          ) {
            const images = product.images.map((image) => {
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
              sinchronized: product.sincronice,
            };
          }

          if (product.sync_bank.length > 0) {
            const images = product.sync_bank.map((image) => {
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
              sinchronized: product.sincronice,
            };
          }
        });

        // console.log('products loaded: ', this.productCardsStore.products);
      });
  }

  public handleSearch(value: string): void {
    // console.log('value', value);
    if (value !== undefined) {
      const comparacion = new SearchStore(
        value,
        this.marks,
        this.subcategories,
        this.categories,
        this.factories,
        this.price,
        this.delivery,
        this.recipes
      );
      this._searchService
        .SearchProductStore(
          localStorage.getItem('id'), // id => user
          localStorage.getItem('storeId'), // id => store
          comparacion
        )
        .subscribe((resp: ProductosLoads) => {
          this.MyProduct = resp.data;
        });
    }
  }

  addNewProduct() {
    this.addProductNew = true;
  }

  scrolling = (s) => {
    const sc = s.target.scrollingElement.scrollTop;
    // console.log(sc);
    if (sc >= 2733) {
      this.scroll = true;
    } else {
      this.scroll = false;
    }
  };

  scrollDown() {
    window.scrollTo({
      top: 10000000,
    });
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
    });
  }

  public toggleSidebarList(event) {
    this.isExpanded = event;
    this.sidebarExpand.emit(this.isExpanded);
  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    this.expandSidebar = event;
  }

  @HostListener('window:scroll', ['$event'])
  doSomethingOnWindowScroll($event: Event) {
    // console.log('window scroll:', $event);
  }

  // FUNCIONALIDAD DE TOUCHED //
  onSwipe(event?: any) {
    // console.log(event);
    if (event.direction === 4) {
      this.expandSidebar = true;
      this.renderer.removeClass(this.main.nativeElement, 'touched');
    }
    if (event.direction === 2) {
      this.expandSidebar = false;
      this.renderer.removeClass(this.main.nativeElement, 'touched');
    }
    if (event.direction === 8) {
      this.renderer.removeAttribute(this.main.nativeElement, 'touch-action');
    }
  }
}
