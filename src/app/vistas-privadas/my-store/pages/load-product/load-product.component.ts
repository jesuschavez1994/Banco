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
} from '@angular/core'
import { StoreService } from '@services/store/store.service'
import { DataProductDB, Image } from '@interfaces/InterfaceProducto'
import { ProductosLoads } from '@interfaces/InterfaceProducto'
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router'
// tslint:disable-next-line: import-spacing
import { BannerOptions } from '@interfaces/components-options/banner.options.interface'
import { NgxSpinnerService } from 'ngx-spinner'
import { FilstroStoreService } from '@services/FiltroStore/filstro-store.service'
import { ProductsCardsStoreComponent } from '../../../shared/products-cards-store/products-cards-store/products-cards-store.component'
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface'
import { StoreResponse } from '@interfaces/store.interface'
import { SearchStore } from '@models/search/search-store.model'
import { SearchService } from '@services/Search/search.service'
import { MyStoreService } from '../../services/my-store.service'
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';
import { Utils } from '../../../../utils/utils';
import { ProductService } from '@services/product/product.service';
import { ProducStoretModel } from '@app/models/produc-store.model';
import { ToastComponent } from '../../../../modals/toast/toast.component';
import { Option } from '@interfaces/components-options/sidebar-list.options.interface';
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import * as Hammer from 'hammerjs'
import { MyStoreComponent } from '../../my-store.component'
import {
  Profile,
  AnchorsMenu,
  Filter
} from '@interfaces/components-options/sidebar-list.options.interface'

@Component({
  selector: 'app-load-product',
  templateUrl: './load-product.component.html',
  styleUrls: ['./load-product.component.scss'],
})
export class LoadProductComponent implements OnInit {
  @Input() isExpanded = false
  

  @Output() sidebarExpand = new EventEmitter<boolean>()

  // Selectores //
  @ViewChild('main') main: ElementRef
  @ViewChild('productCardsStore')
  productCardsStore: ProductsCardsStoreComponent
  @ViewChild('MyStoreComponent') estadoAside: MyStoreComponent
  @ViewChild('toastRef') toastRef: ToastComponent;
  @ViewChild('sidebarList') sidebarList: SidebarListComponent;

  StoreName = ''
  // sidebar-list
  expandSidebar = true
  textBuscador: any

  marks = []
  subcategories = []
  factories = []
  price = []
  delivery = ''
  recipes = []

   // Variables
   storeData: StoreResponse;
   wasChangedStoreData = true;
   queryParam: ParamMap;
   wasChangedQueryParam = true;
   showShimmerProductsCards = true;

  // Products-cards
  showProducts = false;
  totalProducts: number;
  itemsPerPage = 16;
  wasFirstLoadedProducts = false;

  imgsBanners: BannerOptions = {
    m: 'assets/img/Banner/Banner1.svg',
  }

  MyProduct: DataProductDB[] = []
  sidebarFilters: Filter[] = [];
  // tslint:disable-next-line: no-inferrable-types
  pagesActual: number = 1
  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0
  // tslint:disable-next-line: no-inferrable-types
  page: number = 1
  scroll = false
  addProductNew = false
  showFooterPaginations = false


  filterOptions: FilterOption[] = [
    { label: 'filtrar por', value: 0 },
    { label: 'producto', value: 1 },
    { label: 'Empresa', value: 'hola' },
  ]

  // Sidebar related properties
  profile: Profile
  storeName = ''
  anchorsMenu: AnchorsMenu
  breadcrumb: BreadcrumbOptions[]
  categories: any[] = []

  constructor(
    public storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private filtroService: FilstroStoreService,
    private renderer: Renderer2,
    private _searchService: SearchService,
    private _myStoreService: MyStoreService,
    private utils: Utils,
    private productService: ProductService,
    private productModel: ProducStoretModel,
  ) {
    this.route.params.subscribe((params) => {
      console.log('query', params)
      this.textBuscador = params.id
    })
  }

  ngOnInit() {
    this.loadDataByParams();
    // this.getData(this.page)
    // this.spinner();
    window.addEventListener('scroll', this.scrolling, true)
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe((params) => {
      this.page = parseInt(params.page, 10) || 1
      // this.getData(this.page)
    })
  }

  public loadDataByParams() {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        map(([params, queryParam]) => {
          return {
            params,
            queryParam,
          };
        })
      )
      .subscribe((data) => {
        const params = data.params;
        const queryParam = data.queryParam;
        console.log('params', params);

        this.loadDataStore(params, queryParam);

      });
  }

  public loadDataStore(params, queryParam: ParamMap) {
    if (params.has('idStore')) {
      const idStore = parseInt(params.get('idStore'));
      console.log('IdStore', idStore);

      this.storeService.getStoreById(idStore).subscribe((storeResp) => {
        // Gestionamos el valor de wasChangedStoreData
        // El cual sera ula variable que determinara
        // si los datos de la tienda cambiaron o no
        // console.log('loadDataStore -this.storeData:');

        if (this.storeData) {
          // console.log(this.storeData.id);
          // console.log(storeResp.id);
          if (this.storeData.id !== storeResp.id) {
            this.wasChangedStoreData = true;
            this.storeData = storeResp;
          } else {
            this.wasChangedStoreData = false;
          }
        } else {
          this.storeData = storeResp; // guardamos de forma global los datos de la tienda
          // console.log('this.storeData undefined');
        }

        if (storeResp.banner_image.length > 0) {
          const storeBanners = storeResp.banner_image;

          const sizes = Object.keys(storeBanners[0].src_size);

          if (sizes.length > 1) {
            this.imgsBanners = {
              m: storeBanners[0].src_size.xl,
              s: storeBanners[0].src_size.s,
            };
          } else if (sizes.length === 1) {
            this.imgsBanners = {
              m: storeBanners[0].src_size.xl,
            };
          }
        }

        // Evitamos que la página carguen los mismos datos
        // cuando la tienda sigue siendo la misma.
        // solo permite actualizar los datos cuando la tienda es cambiada
        if (this.wasChangedStoreData) {
          this.setSidebarOptions(storeResp, queryParam);
          this.setBreadcrumbOptions(storeResp);

          if (this.wasFirstLoadedProducts) {

            this.loadProductsCards(params, queryParam);

          } else {
            this.loadProductsCards(params, queryParam);
            this.wasFirstLoadedProducts = true;
          }
        } else {

          if (this.wasFirstLoadedProducts) {

            if (this.wasChangedQueryParam) {
              this.loadProductsCards(params, queryParam);

            }

          } else {
            this.loadProductsCards(params, queryParam);
            this.wasFirstLoadedProducts = true;
          }

        }

      });

    }
  }

  public loadProductsCards(params: ParamMap, queryParams: ParamMap) {
    if (params.has('idStore')) {
      // tslint:disable-next-line: radix
      const idStore = parseInt(params.get('idStore'));
      // tslint:disable-next-line: radix
      const page = queryParams.has('page') ? parseInt(queryParams.get('page')) : 1;

      let filter;
      filter = {};

      console.log('queryParams Key: ', queryParams.keys);

      const keysQueryParams = queryParams.keys;

      if (keysQueryParams.length > 0) {
        let queryParamsAllowed;
        queryParamsAllowed = {};

        keysQueryParams.forEach((key) => {
          switch (key) {
            case 'name':
              queryParamsAllowed.name = queryParams.get('name');
              // name: 'l',
              break;

            case 'marcas':
              queryParamsAllowed.marks = this.utils.stringToArray(queryParams.get('marcas'));
              // marks: ['generica', 'ALBENZA', 'XANAX', 'gillete'],
              break;

            case 'categoria':
              queryParamsAllowed.categories = this.utils.stringToArray(queryParams.get('categoria'));
              // categories: ['Cosmeticos', 'infantil'],
              break;

            case 'sub-categorias':
              queryParamsAllowed.subcategories = this.utils.stringToArray(queryParams.get('sub-categorias'));
              // subcategories: ['Cutis', 'Analgesicos'],

              break;

            case 'fabricantes':
              queryParamsAllowed.factories = this.utils.stringToArray(
                queryParams.get('fabricantes')
              );
              // factories: ['gerber', 'polar'],
              break;

            case 'precios':
              // console.log('queryParams.get(precios)');
              // console.log(queryParams.get('precios'));
              queryParamsAllowed.price = this.utils.stringToArray(queryParams.get('precios'), true);
              // queryParams.get('price').split(',');
              // price: [1, 284],
              break;

            case 'delivery':
              queryParamsAllowed.delivery =
                queryParams.get('delivery') == 'si' ? true : false;
              // delivery: true,
              break;

            case 'recipes':
              queryParamsAllowed.recipes = this.utils.stringToArray(
                queryParams.get('recipes')
              );
              // recipes: ['morado', 'polar']
              break;
          }
        });

        filter = queryParamsAllowed;

        console.log('queryParamsAllowed: ', queryParamsAllowed);
      }

      // this.showShimmerProductsCards = true;

      if (this.productCardsStore) {
        this.productCardsStore.toggleShimmer();
      }

      this.productService.getProductsByStore(idStore, page, filter).subscribe(
        (resp) => {
          // console.log('getProductsByStore');
          console.log(resp.data);
          const products = resp.data;
          this.totalProducts = resp.total;
          this.itemsPerPage = resp.per_page;

          if (products.length > 0) {

            // Formateamos la respuesta del back y retornamos el formato correcto para el componente
            this.productCardsStore.products = this.productModel.productsCardsComponent.formatProductResp(products);
            console.log('products loaded: ', this.productCardsStore.products);

            this.productCardsStore.toggleShimmer(false);
          } else {
            this.toastRef.open('Tienda sin productos disponibles', {
              color: '#ffffff',
              background: '#900909c2',
            });
          }
        },
        (error) => {
          this.toastRef.open(
            'Error al cargar los productos, Recargue la página',
            { color: '#ffffff', background: '#900909c2' }
          );
          console.log('error al cargar productos');
          console.log(error);
        }
      );
    }
  }

  public setSidebarOptions(storeResp: StoreResponse, queryParam: ParamMap){

    const idStore = storeResp.id;

    let contactStore;
    contactStore = {
      // la base de datos no tiene el dato
      url: '',
      name: 'sin dato de contacto',
    };

    const mainContactSocialKey = ['facebook', 'instagram', 'twitter'];
    const mainContactKey = ['email_1', 'email_2', 'phone_1', 'phone_2'];

    // buscamos entre las posibles propiedades alguna propiedad la cual no tenga null y en el orden de los elementos
    const isSomeContactSocial = mainContactSocialKey.find((contactKey) => {
      return storeResp.social[contactKey];
    });

    const isSomeContact = mainContactKey.find((contactKey) => {
      return storeResp.contact[contactKey];
    });

    if (isSomeContactSocial) {
      // si encuentra algún dato de contacto de redes sociales ese se mostrará
      contactStore = {
        // la base de datos no tiene el dato
        url: isSomeContactSocial,
        name: `@${storeResp.name}`, // coloco el nombre porque el back no devuelve el nombre de la cuenta de instagram
      };
    } else if (isSomeContact) {
      // sino mostrara algún dato de contacto común y si ninguna condición se cumple, sera ''
      contactStore = contactStore = {
        // la base de datos no tiene el dato
        url: '',
        name: isSomeContact,
      };
    }

    this.profile = {
      name: storeResp.name,
      contact: contactStore,
      img: 'assets/img/no-image-banner.jpg', // la base de datos no tiene el dato
      isVerified: storeResp.certification == 'true' ? true : false,
    };

    // Obtenemos las categorías de los productos vinculados a una tienda
    this.storeService.getCategoriesProducts(idStore).subscribe( resp => {

      let sidebarListFilters: Filter[];
      sidebarListFilters = [];

      const respKeys = Object.keys(resp);

      const categoriesResp = respKeys.map(respKey => {
        return resp[respKey];
      });

      let categoryOptions: Option[];
      let subCategoryOptions: Option[];

      categoryOptions = [];
      subCategoryOptions = [];

      // Llenamos las opciones de categoria y las opciones de sub-categorías, todas vinculadas mediante su id
      categoriesResp.forEach( categoryResp => {

        categoryOptions.push(
            {
                optionId: categoryResp.id,
                name: categoryResp.name,
                totalFounds: 200,
            }
        );

        categoryResp.subcategories.forEach( subcategoryResp => {
          subCategoryOptions.push(
            {
              optionId: subcategoryResp.id,
              parentOptionId: subcategoryResp.category_id,
              name: subcategoryResp.name,
              totalFounds: 200,
            },
          );
        });

      });

      const categoryFilter = {
        filterId: 1,
        title: 'categorías',
        type: 'single',
        paramName: 'categoria',
        options: categoryOptions,
      };

      const subCategoryFilter =  {
        filterId: 2,
        title: 'sub categorías',
        type: 'multiple',
        paramName: 'sub-categorias',
        parentFilterId: 1,
        options: subCategoryOptions
      };

      const priceFilter = {
        title: 'Precios',
        type: 'single', // Determinamos que solo una opción puede ser seleccionada
        paramName: 'precios',
        options: [
          {
            name: '$0 - $10,000',
            value: [0, 10000],
            totalFounds: 200,
          },
          {
            name: '$10,000 - $20,000',
            value: [10000, 20000],
            totalFounds: 200,
          },
          {
            name: '$20,000 - $30,000',
            value: [20000, 30000],
            totalFounds: 200,
          },
          {
            name: '$30,000 - $40,000',
            value: [30000, 40000],
            totalFounds: 200,
          },
          {
            name: '$40,000 - $50,000',
            value: [40000, 50000],
            totalFounds: 200,
          },
        ]
      };

      // Agregamos todos los filtros
      sidebarListFilters.push(
        categoryFilter,
        subCategoryFilter,
        priceFilter
      );

      // retornamos los filters con el formato correcto para el component
      //this.sidebarFilters = this.sidebarList.setFilters(sidebarListFilters);

      //this.sidebarList.loadOptionsFilter( queryParam ); // seleccionamos las opciones filtradas por url

    });

    //this.sidebarList.loadOptionsFilter(queryParam); // seleccionamos las opciones filtradas por url

  }

  spinner(): void {
    this.spinnerService.show()
  }

  // Funcion para el cambio de paginación //

  // En este caso lo que hará es que “reasignará”
  // la URL y obtendrá la información usando la nueva página
  pageChanged(page: number) {
    this.page = page
    const queryParams: Params = { page }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    })
    // this.getData(this.page)
  }

  // getData(page?: number) {
  //   this.spinner()

  //   this.storeService
  //     .geatAllProducts(
  //       localStorage.getItem('id'),
  //       localStorage.getItem('storeId'),
  //       page
  //     )
  //     .subscribe((resp: any) => {
  //       const products = resp.data

  //       this.MyProduct = resp.data
  //       // console.log('MY PRODUCTOS', this.MyProduct);
  //       this.last_Page_Pagination = resp.last_page
  //       this.totalProductAPI = resp.total
  //       this.itemsPerPage = resp.per_page
  //       this.showFooterPaginations = true
  //       this.spinnerService.hide()
  //       this.scrollTop()

  //       this.productCardsStore.products = products.map((product) => {
  //         // console.log('MAP', product);

  //         if (
  //           (product.images.length > 0 || product.images.length === 0) &&
  //           product.sync_bank.length === 0
  //         ) {
  //           const images = product.images.map((image) => {
  //             return image.src
  //           })

  //           return {
  //             name: product.name,
  //             description: product.description,
  //             price: product.price,
  //             stock: product.stock,
  //             images, // product.images
  //             id: product.id ? product.id : -1,
  //             idStore: product.store_id ? product.store_id : -1,
  //             isFavorite: product.isFavorite ? product.isFavorite : false,
  //             sinchronized: product.sincronice,
  //           }
  //         }

  //         if (product.sync_bank.length > 0) {
  //           const images = product.sync_bank.map((image) => {
  //             return image.images[0].src_size.xl
  //           })

  //           return {
  //             name: product.name,
  //             description: product.description,
  //             price: product.price,
  //             stock: product.stock,
  //             images, // product.images
  //             id: product.id ? product.id : -1,
  //             idStore: product.store_id ? product.store_id : -1,
  //             isFavorite: product.isFavorite ? product.isFavorite : false,
  //             sinchronized: product.sincronice,
  //           }
  //         }
  //       })

  //       // console.log('products loaded: ', this.productCardsStore.products);
  //     })
  // }

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
      )
      this._searchService
        .SearchProductStore(
          localStorage.getItem('id'), // id => user
          localStorage.getItem('storeId'), // id => store
          comparacion
        )
        .subscribe((resp: ProductosLoads) => {
          this.MyProduct = resp.data
        })
    }
  }

  addNewProduct() {
    this.addProductNew = true
  }

  scrolling = (s) => {
    const sc = s.target.scrollingElement.scrollTop
    // console.log(sc);
    if (sc >= 2733) {
      this.scroll = true
    } else {
      this.scroll = false
    }
  }

  scrollDown() {
    window.scrollTo({
      top: 10000000,
    })
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
    })
  }

  public toggleSidebarList(event) {
    this.isExpanded = event
    // this._myStoreService.expandSidebar(event)
    // this.sidebarExpand.emit(this.isExpanded)
  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    this.expandSidebar = event
  }

  @HostListener('window:scroll', ['$event'])
  doSomethingOnWindowScroll($event: Event) {
    // console.log('window scroll:', $event);
  }

  // FUNCIONALIDAD DE TOUCHED //
  onSwipe(event?: any) {
    // console.log(event);
    if (event.direction === 4) {
      this.expandSidebar = true
      this.renderer.removeClass(this.main.nativeElement, 'touched')
    }
    if (event.direction === 2) {
      this.expandSidebar = false
      this.renderer.removeClass(this.main.nativeElement, 'touched')
    }
    if (event.direction === 8) {
      this.renderer.removeAttribute(this.main.nativeElement, 'touch-action')
    }
  }

  // Updating the sidebar options
  // loadStoreData() {
  //   this.storeService
  //     .getStoreById(localStorage.getItem('storeId'))
  //     .subscribe((storeResponse) => {
  //       this.storeName = storeResponse.name
  //       this.setBreadcrumbOptions(
  //         localStorage.getItem('storeId'),
  //         storeResponse
  //       )
  //       this.setSidebarOptions(storeResponse)
  //     })
  // }

  public setBreadcrumbOptions(storeResp: StoreResponse) {
    const idStore = storeResp.id;

    this.breadcrumb = [
      {
        title: 'inicio',
        routerLink: ['/home'],
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

  // setSidebarOptions(storeResp: StoreResponse) {
  //   this.anchorsMenu = {
  //     productLink: `/product-catalogue`,
  //     contactLink: `contact'`,
  //     wordToMatch: `products`,
  //     synchronizationLink: `/my-store/sincronizacion/exportar-lista-excel`,
  //   }

  //   this.profile = {
  //     name: storeResp.name,
  //     contact: {
  //       // la base de datos no tiene el dato
  //       url: '',
  //       name: '@medicalbackground',
  //     },
  //     img: 'assets/img/no-image-banner.jpg', // la base de datos no tiene el dato
  //     isVerified: storeResp.certification == 'true' ? true : false,
  //   }

  //   this.categories = [
  //     {
  //       id: 1,
  //       name: 'Cosmeticos',

  //       subcategories: [
  //         {
  //           id: 1,
  //           name: 'Dolor inflamación',
  //         },
  //         {
  //           id: 2,
  //           name: 'Belleza Higiene',
  //         },
  //         {
  //           id: 3,
  //           name: 'Dieta & Fitness',
  //         },
  //         {
  //           id: 4,
  //           name: 'Salud y vitaminas',
  //         },
  //         {
  //           id: 5,
  //           name: 'Vida sexual',
  //         },
  //         {
  //           id: 6,
  //           name: 'Ortopedia',
  //         },
  //         {
  //           id: 7,
  //           name: 'Homeopatia & natural',
  //         },
  //         {
  //           id: 8,
  //           name: 'Mascotas & veterinaria',
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: 'Medicamentos2',

  //       subcategories: [
  //         {
  //           id: 1,
  //           name: 'Dolor & inflamación2',
  //         },
  //         {
  //           id: 2,
  //           name: 'Belleza & Higiene2',
  //         },
  //         {
  //           id: 3,
  //           name: 'Dieta & Fitness2',
  //         },
  //         {
  //           id: 4,
  //           name: 'Salud y vitaminas2',
  //         },
  //         {
  //           id: 5,
  //           name: 'Vida sexual2',
  //         },
  //         {
  //           id: 6,
  //           name: 'Ortopedia2',
  //         },
  //         {
  //           id: 7,
  //           name: 'Homeopatia & natural2',
  //         },
  //         {
  //           id: 8,
  //           name: 'Mascotas & veterinaria2',
  //         },
  //       ],
  //     },
  //   ]
  // }
}
