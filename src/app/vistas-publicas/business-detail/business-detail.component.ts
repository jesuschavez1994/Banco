import { Component, OnInit, ViewChild, AfterViewInit, Pipe } from '@angular/core';
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';
import { ProductService } from '@services/product/product.service';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsCardsComponent } from '@shared/products-cards/products-cards.component';
import { ProductDetailComponent } from '@shared/product-detail/product-detail.component';
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component';
import { StoreService } from '@services/store/store.service';
import { AnchorsMenu, Profile, Category } from '@interfaces/components-options/sidebar-list.options.interface';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';
import { StoreResponse } from '@interfaces/store.interface';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '../../utils/utils';
import { PriceRange, Filter } from '@interfaces/components-options/sidebar-list.options.interface';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit, AfterViewInit {

  // Components Controllers
  @ViewChild('productCards') productCards: ProductsCardsComponent;
  @ViewChild('productDetail') productDetail: ProductDetailComponent;
  @ViewChild('sidebarList') sidebarList: SidebarListComponent;

  // Components Inputs
  breadcrumb: BreadcrumbOptions[];
  imgsBanners: BannerOptions = {
    m: 'assets/img/test-img/banner.png'
  };

  // sidebar-list
  expandSidebar = true;
  anchorsMenu: AnchorsMenu;
  profile: Profile;
  categories: Category[];
  priceRanges: PriceRange[] = [
    { min: 0, max: 10000, totalFounds: 559 },
    { min: 10000, max: 20000, totalFounds: 58 },
    { min: 20000, max: 30000, totalFounds: 9 },
    { min: 30000, max: 40000, totalFounds: 1 },
    { min: 50000, max: 60000, totalFounds: 1 },
  ];
  filterOptions: FilterOption[] = [
    {label: 'filtrar por', value: 0},
    {label: 'producto', value: 1},
    {label: 'Empresa', value: 'hola'},
  ];
  factories: Filter[] = [
    {name: 'abbot', totalFounds: 1},
    {name: 'anc', totalFounds: 36},
    {name: 'andrómaatico', totalFounds: 1},
    {name: 'aura vitalis', totalFounds: 38},
    {name: 'bach', totalFounds: 7},
  ];
  delivery: Filter[] = [
    { name: 'si', totalFounds: 579 },
    { name: 'no', totalFounds: 274 },
  ];
  marks: Filter[] = [
    { name: 'albaderm', totalFounds: 16 },
    { name: 'Aquasolar', totalFounds: 3 },
    { name: 'Arama', totalFounds: 8 },
    { name: 'Bosque miel', totalFounds: 2 },
    { name: 'Brota', totalFounds: 5 },
  ];

  // Products-cards
  showProducts = false;
  totalProducts: number;
  itemsPerPage = 16;

  // SearchBar:
  preloadedValueSearch = '';

  // Variables
  StoreName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private storeService: StoreService,
    private utils: Utils

  ){
    this.loadDataByParams();
  }

  ngOnInit() {


  }

  ngAfterViewInit(): void {

  }


  public loadDataByParams(){

    combineLatest([this.route.paramMap, this.route.queryParamMap])
    .pipe(
      map(([params, queryParam]) => {

        return {
          params,
          queryParam
        };

      })
    )
    .subscribe(data => {
      const params = data.params;
      const queryParam = data.queryParam;

      if ( params.has('show') && params.get('show') === 'products' ){
        this.showProducts = true;

      }else {
        this.showProducts = false;

      }

      this.loadDataStore(params);

      this.loadProductDetail(params);

      this.loadProductsCards(params, queryParam);

      this.preloadValueSearch(queryParam);
    });

  }

  // Products

  /**
   * @description Al hacer click sobre un card de producto se dispara esta función a casusa del evento (selected).
   * De esta manera, manipulamos la siguiente acción la cual modifica el :idStore y :idProduct de la ruta business-detail
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @param {ProductsCardsOptions} product
   * @memberof BusinessDetailComponent
   */
  public goTodetailProduct(product: ProductsCardsOptions) {

    if (product.id > -1 && product.idStore > -1){
      this.router.navigate( ['/business-detail', product.idStore, 'products', product.id] );

    }

  }

  /**
   * @description En caso de que existan los parametros :idStore y idProduct, se realiza la petición a la base de datos
   * para obtener el producto especifico que coincida con ambos datos y asignamos los datos del producto recibido
   * a la variable que carga el detalle del producto en el Input del componente product-detail.
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @memberof BusinessDetailComponent
   */
  public loadProductDetail(params) {

    if (
      (params.has('show') && params.get('show') === 'products')
      && params.has('idStore')
      && params.has('idProduct')
    ) {

      const idStore = parseInt( params.get('idStore') );
      const idProduct = parseInt( params.get('idProduct') );

      this.productService.getProductByStore(idStore, idProduct).subscribe(
        product => {

          console.log('response', product)

          const images = product.images.map(image => {
            return image.src;
          });

          this.productDetail.selectedProduct =  {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            images, // product.images
            id: product.id ? product.id : -1,
            idStore: product.store_id ? product.store_id : -1,
            isFavorite: product.isFavorite ? product.isFavorite : false,
          };

        }, error => {

          console.log('Error loading products', error);
          this.productDetail.selectedProduct = null;

        }, () => {
          // console.log('products loaded');
        }
      );

    }


  }

  public loadProductsCards(params: ParamMap, queryParams: ParamMap) {

    if (params.has('idStore')) {

      // tslint:disable-next-line: radix
      const idStore = parseInt( params.get('idStore') );
      // tslint:disable-next-line: radix
      const page = queryParams.has('page') ? parseInt( queryParams.get('page') ) : 1;

      let filter;
      filter = {};

      // console.log('queryParams Key: ', queryParams.keys);

      const keysQueryParams = queryParams.keys;

      if (keysQueryParams.length > 0){

        let queryParamsAllowed;
        queryParamsAllowed = {};

        keysQueryParams.forEach(key => {

          switch (key) {
            case 'name':
              queryParamsAllowed.name = queryParams.get('name');
              // name: 'l',
              break;

            case 'marks':
              queryParamsAllowed.marks = this.utils.stringToArray(queryParams.get('marks'));
              // marks: ['generica', 'ALBENZA', 'XANAX', 'gillete'],
              break;

            case 'category':
              queryParamsAllowed.categories = this.utils.stringToArray(queryParams.get('category'));
              // categories: ['Cosmeticos', 'infantil'],
              break;

            case 'subcategories':
              queryParamsAllowed.subcategories = this.utils.stringToArray(queryParams.get('subcategories'));
              // subcategories: ['Cutis', 'Analgesicos'],

              break;

            case 'fabricantes':
              queryParamsAllowed.factories = this.utils.stringToArray(queryParams.get('fabricantes'));
              // factories: ['gerber', 'polar'],
              break;

            case 'price':
              queryParamsAllowed.price = this.utils.stringToArray(queryParams.get('price'), true);
              // queryParams.get('price').split(',');
              // price: [1, 284],
              break;

            case 'delivery':
              queryParamsAllowed.delivery = queryParams.get('delivery') == 'si' ? true : false;
              // delivery: true,
              break;

            case 'recipes':
              queryParamsAllowed.recipes = this.utils.stringToArray(queryParams.get('recipes'));
              // recipes: ['morado', 'polar']
              break;
          }

        });

        filter = queryParamsAllowed;

        console.log('queryParamsAllowed: ', queryParamsAllowed);
      }



      this.productService.getProductsByStore(idStore, page, filter).subscribe( resp => {


        const products = resp.data;
        this.totalProducts = resp.total;
        this.itemsPerPage = resp.per_page;

        this.productCards.products = products.map( product => {

          console.log('products', product)

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
            };
          }
         
        } );

        console.log('products loaded: ', this.productCards.products);

      });

    }

  }

  // Esto se puede declarar en el componente e invocar aquí a través del ViewChild
  public paginationProducts(page: number){
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {page},
        queryParamsHandling: 'merge',
      }
    );
  }

  // Search-bar
  public search(ToSearch){
    console.log(ToSearch.value);

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: ToSearch.value !== '' ? { name: ToSearch.value } : {},
      }
    );

  }

  public preloadValueSearch(queryParams: ParamMap){
    this.preloadedValueSearch = queryParams.has('name') ? queryParams.get('name') : '';
  }

  // Store
  public loadDataStore(params){

    if ( params.has('idStore') ) {

      const idStore =  parseInt(params.get('idStore'));

      this.storeService.getStoreById(idStore).subscribe( storeResp => {

        this.StoreName = storeResp.name;

        // this.imgsBanners = {
        //   m: storeResp.banner_image[0]
        // }

        this.setSidebarOptions(idStore, storeResp);
        this.setBreadcrumbOptions(idStore, storeResp);

      });

    }

  }

  // Sidebar-list
  public setSidebarOptions(idStore: number, storeResp: StoreResponse){

    this.anchorsMenu = {
      productLink: `/business-detail/${idStore}/products`,
      contactLink: `/business-detail/${idStore}`,
      wordToMatch: `products`
    };

    this.profile = {
      name: storeResp.name,
      instagram: { // la base de datos no tiene el dato
        url: '',
        name: '@medicalbackground'
      },
      img: 'assets/img/no-image-banner.jpg', // la base de datos no tiene el dato
      isVerified: storeResp.certification == 'true' ? true : false
    };

    this.categories = [
      {
        id: 1,
        name: 'Cosmeticos',

        subcategories: [
          {
            id: 1,
            name: 'Dolor inflamación',

          },
          {
            id: 2,
            name: 'Belleza Higiene',

          },
          {
            id: 3,
            name: 'Dieta & Fitness',

          },
          {
            id: 4,
            name: 'Salud y vitaminas',

          },
          {
            id: 5,
            name: 'Vida sexual',

          },
          {
            id: 6,
            name: 'Ortopedia',

          },
          {
            id: 7,
            name: 'Homeopatia & natural',

          },
          {
            id: 8,
            name: 'Mascotas & veterinaria',

          }
        ]
      },
      {
        id: 2,
        name: 'Medicamentos2',

        subcategories: [
          {
            id: 1,
            name: 'Dolor & inflamación2',

          },
          {
            id: 2,
            name: 'Belleza & Higiene2',

          },
          {
            id: 3,
            name: 'Dieta & Fitness2',

          },
          {
            id: 4,
            name: 'Salud y vitaminas2',

          },
          {
            id: 5,
            name: 'Vida sexual2',

          },
          {
            id: 6,
            name: 'Ortopedia2',

          },
          {
            id: 7,
            name: 'Homeopatia & natural2',

          },
          {
            id: 8,
            name: 'Mascotas & veterinaria2',

          }
        ]
      },
    ];

    // console.log(storeResp);

  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    this.expandSidebar = event;
  }

  public setBreadcrumbOptions(idStore: number, storeResp: StoreResponse){
    this.breadcrumb = [
      {
        title: 'inicio',
        routerLink: ['/']
      },
      {
        title: 'farmacias',
        routerLink: [`/farmacias`]
      },

    ];

    this.breadcrumb[2] = {
      title: `${storeResp.name}`,
      routerLink: [`/business-detail/${idStore}`]
    };
  }


}
