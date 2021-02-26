import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Descripcion } from '@interfaces/sincronizacion';
import { Total, Suggestion, Datum } from '@interfaces/sincronizacion';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductosLoads } from '@interfaces/InterfaceProducto';
import { Termino } from '@models/buscador.model';
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SyncProductsDataService } from '../../../../services/sync-products-data.service';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';

import { StoreResponse } from '@interfaces/store.interface';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';
import {
  // Category,
  Profile,
  SidebarListOptions,
  AnchorsMenu,
  SelectedEmitter,
  Filter,
  // PriceRange,
  Option,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface';
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service';

export interface ICarouselItem {
  bank_id: number;
  description: string;
  id: number;
  images: [];
  name: string;
  marginLeft?: number;
}

interface ProductToSync {
  bank_id: number;
  product_id: number;
  name: string;
  checkedState?: boolean;
}

@Component({
  selector: 'app-items-suggested-products',
  templateUrl: './items-suggested-products.component.html',
  styleUrls: ['./items-suggested-products.component.css'],
  providers: [SyncProductsDataService],
})
export class ItemsSuggestedProductsComponent implements OnInit {
  imgsBanners: BannerOptions = {
    m: '.assets/img/Banner/Banner1.svg',
  };

  @Input() SetAllCheckbox: boolean;
  @Input() PalabraBuscador: ProductosLoads;
  @Input() isExpanded = false;

  expandSidebar = true;

  // pagesActual = 69;
  forma: FormGroup;
  slideIndex = 1;
  next = 0;
  palabra: any;
  suggestedShow = false;
  idProductoToSync: any;
  scroll = false;

  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number;
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI = 0;
  Sugerenccias: any[];
  // tslint:disable-next-line: no-inferrable-types
  page = 1;
  filtro_valor = '';
  busqueda = false;
  textBuscador: any;

  MyProduct: Descripcion[] = [];
  itemProductos: Descripcion[] = [];
  DescripcionProduct: Descripcion;
  Iterador: any[] = [];
  finalPercentage: any;
  showFooterPaginations = false;
  // Used in responsiveness of Angular Material
  headingRowHeight = '5:1';
  innerRowHeight = '2:1.5';

  productToSyncReference: ProductToSync;
  bulkSync: Array<ProductToSync> = [];
  useFilter = false;

  filterOptions: FilterOption[] = [
    { label: 'filtrar por', value: 0 },
    { label: 'producto', value: 1 },
    { label: 'Empresa', value: 'hola' },
  ];

  // Sidebar related properties
  profile: Profile;
  storeName = '';
  anchorsMenu: AnchorsMenu[] = [];
  breadcrumb: BreadcrumbOptions[];
  categories: any[] = [];
  sidebarSections: SidebarSections;
  sidebarFilters: Filter[] = [];

  currentPosition = 0;

  constructor(
    public storeService: StoreService,
    public sincronizacion: SincronizacionService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private _syncProductsDataService: SyncProductsDataService,
    private _sidebarListService: SidebarListService
  ) {
    this.route.params.subscribe((params) => {
      // console.log('query', params)
      this.textBuscador = params.id;
    });

    this.forma = new FormGroup({
      banck_id: new FormControl(''),
    });
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scrolling, true);

    this.getData(this.page);

    this.spinner();
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe((params) => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });

    this.setSidebarSections();
    this.loadAnchorsMenuData();
    this.setSidebarSections();
  }

  spinner(): void {
    this.spinnerService.show();
  }

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
    this.sincronizacion
      .GetAllProductSuggested(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        page
      )
      .subscribe((resp: Total) => {
        this.MyProduct = resp.data;
        this.suggestedShow = true;
        // this.dataObject = resp.data.suggestion.data.JSON.parse();
        // console.log('MY PRODUCTOSSSS', this.MyProduct)
        this.last_Page_Pagination = resp.last_page;
        this.totalProductAPI = resp.total;
        this.showFooterPaginations = true;
        this.spinnerService.hide();

        this.scrollTop();
      });
  }

  scrolling = (s) => {
    let sc = s.target.scrollingElement.scrollTop;
    // console.log(sc)
    setTimeout(() => {
      if (sc >= 10602) {
        this.scroll = true;
      } else {
        this.scroll = false;
      }
    }, 600);
  };

  scrollDown() {
    window.scrollTo({
      top: 10000000,
    });
  }

  scrollTop() {
    window.scrollTo({
      top: 600,
    });
  }

  // BUSCADOR //
  handleSearch(value: string): void {
    // console.log(value)
    this.filtro_valor = value;
    if (value !== undefined) {
      let comparacion = new Termino(value);

      this.sincronizacion
        .BuscadorSugerencias(
          comparacion,
          localStorage.getItem('id'),
          localStorage.getItem('storeId')
        )
        .subscribe((resp: Total) => {
          // console.log(resp.data)
          return (this.MyProduct = resp.data);
        });
    }
  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    this.expandSidebar = event;
  }

  updateBulkArray(eventValues: ProductToSync) {
    this.productToSyncReference = {
      bank_id: eventValues.bank_id,
      product_id: eventValues.product_id,
      name: eventValues.name,
    };

    if (eventValues.checkedState) {
      // Updating the bulk array
      let updatedArray: ProductToSync[];
      updatedArray = [...this.bulkSync, this.productToSyncReference];

      this.bulkSync = updatedArray;
    } else {
      // Deleting the product from bulk.
      this.bulkSync = this.bulkSync.filter(
        (element) => element.bank_id !== this.productToSyncReference.bank_id
      );
    }
  }

  // Updating the sidebar options
  loadDataStore() {
    this.storeService
      .getStoreById(localStorage.getItem('storeId'))
      .subscribe((storeResp) => {
        this.storeName = storeResp.name;
        this.setBreadcrumbOptions(localStorage.getItem('storeId'), storeResp);
        this.setSidebarOptions(storeResp);
      });
  }

  public setBreadcrumbOptions(idStore: string, storeResp: StoreResponse) {
    this.breadcrumb = [
      {
        title: 'inicio',
        routerLink: ['/'],
      },
      {
        title: 'farmacias',
        routerLink: [`/farmacias`],
      },
    ];

    this.breadcrumb[2] = {
      title: `${storeResp.name}`,
      routerLink: [`/business-detail/${idStore}`],
    };
  }

  setSidebarOptions(storeResp: StoreResponse) {
    this.profile = {
      name: storeResp.name,
      contact: {
        // la base de datos no tiene el dato
        url: '',
        name: '@medicalbackground',
      },
      img: 'assets/img/no-image-banner.jpg', // la base de datos no tiene el dato
      isVerified: storeResp.certification == 'true' ? true : false,
    };
  }

  private loadAnchorsMenuData() {
    const id = localStorage.getItem('storeId');
    this.anchorsMenu = [
      {
        anchorName: 'Contacto',
        anchorLink: `/my-store/contact`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Productos',
        anchorLink: `/my-store/product-catalogue`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Sincronización',
        anchorLink: `/my-store/sincronizacion/exportar-lista-excel`,
        wordToMatch: `products`,
      },
      // {
      //   anchorName: 'Ventas',
      //   anchorLink: `/my-store/ventas`,
      // },
    ];

    // Eliminamos los enlaces de la sidebar.
    this._sidebarListService.setAnchors(this.anchorsMenu);
  }

  private setSidebarSections() {
    this.sidebarSections = {
      bussinessProfile: true,
      anchorOptions: true,
      filters: false,
    };

    this._sidebarListService.setRequiredSections(this.sidebarSections);
  }
}
