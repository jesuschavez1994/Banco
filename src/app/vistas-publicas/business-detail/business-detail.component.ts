import { Component, OnInit, ViewChild, AfterViewInit, Pipe, OnChanges, SimpleChanges } from '@angular/core';
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';
import { ProductService } from '@services/product/product.service';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { ProductsCardsComponent } from '@shared/products-cards/products-cards.component';
import { ProductDetailComponent } from '@shared/product-detail/product-detail.component';
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component';
import { StoreService } from '@services/store/store.service';
import { AnchorsMenu, Filter, Profile } from '@interfaces/components-options/sidebar-list.options.interface';
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface';
import { StoreResponse } from '@interfaces/store.interface';
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '../../utils/utils';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { DropdownOption } from '@interfaces/components-options/dropdown.options.interface';
import { DropdownIconComponent } from '../../shared/dropdown-icon/dropdown-icon.component';
import { ToastComponent } from '../../modals/toast/toast.component';
import {HomeServiceService} from '../services/home-service.service';

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
  @ViewChild('toastRef') toastRef: ToastComponent;
  // @ViewChild('dropdownIcon') dropdownIcon: DropdownIconComponent;

  // Components Inputs
  breadcrumb: BreadcrumbOptions[];
  imgsBanners: BannerOptions;

  // Navbar
  userLog = false;

  // sidebar-list
  expandSidebar = true;
  anchorsMenu: AnchorsMenu;
  profile: Profile;
  sidebarFilters: Filter[] = [
    // {
    //   title: 'categorías',
    //   type: 'single',
    //   paramName: 'categoria',
    //   options: [
    //     {
    //       name: 'Cosmeticos',
    //       totalFounds: 200,
    //     },
    //     {
    //       name: 'Alimentos',
    //       totalFounds: 200,
    //     },
    //   ]
    // },
    // {
    //   title: 'sub categorías',
    //   type: 'multiple',
    //   paramName: 'sub-categoria',
    //   parentFilterId: 1,
    //   options: [
    //     {
    //       parentOptionId: 1,
    //       name: 'labial',
    //       totalFounds: 200,
    //     },
    //     {
    //       parentOptionId: 1,
    //       name: 'labia2',
    //       totalFounds: 200,
    //     },
    //     {
    //       parentOptionId: 2,
    //       name: 'labial3',
    //       totalFounds: 200,
    //     },
    //   ]
    // },
    // {
    //   // filterId: 3,
    //   title: 'Precios',
    //   type: 'single', // Determinamos que solo una opción puede ser seleccionada
    //   paramName: 'price',
    //   options: [
    //     {
    //       // optionId: 1,
    //       name: '$0 - $10,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 2,
    //       name: '$10,000 - $20,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 3,
    //       name: '$20,000 - $30,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 3,
    //       name: '$30,000 - $40,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //     {
    //       // optionId: 3,
    //       name: '$40,000 - $50,000',
    //       totalFounds: 200,
    //       // isSelected: false
    //     },
    //   ]
    // },
  ];

  // Products-cards
  showProducts = false;
  totalProducts: number;
  itemsPerPage = 16;
  showShimmerProductsCards =  true;
  wasFirstLoadedProducts = false;

  // SearchBar:
  preloadedValueSearch = '';
  searchBarFilter: FilterOption[] = [
    {label: 'filtrar por', value: 0},
    {label: 'producto', value: 1},
    {label: 'Empresa', value: 'hola'},
  ];

  // navbar
  menuOptionsShopping: DropdownOption[] = [];

  // Variables
  storeData: StoreResponse;
  wasChangedStoreData = true;
  queryParam: ParamMap;
  wasChangedQueryParam = true;

  // Toast
  // dataToast: any = '';

  constructor(
    private homeService: HomeServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private storeService: StoreService,
    private paymentProcessService: PaymentProcessService,
    private utils: Utils,
    private dropdownIconComp: DropdownIconComponent

  ){}

  ngOnInit() {
    this.userLog = this.homeService.islog();
  }

  ngAfterViewInit(): void {
    this.loadDataByParams();

  }

  public loadDataByParams() {

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

      // Para detectar si los valores de queryParam han cambiado o no
      // y poder crear validaciones, como evitar que el listado de productos
      // se actualice si solo se cambio el id del producto a detallar
      console.log('QUERY PARAMS - this.storeData:');

      if (this.queryParam) {

        console.log('loadDataByParams - this.queryParam');
        console.log(this.queryParam);
        console.log(queryParam);

        // if ( this.queryParam.keys.length > 0) {

        if (this.queryParam !== queryParam) {
          this.wasChangedQueryParam = true;
          this.queryParam = queryParam;

        } else {
          this.wasChangedQueryParam = false;

        }

        // } else {
        //   this.wasChangedQueryParam = false;

        // }


      }else {
        this.queryParam = queryParam; // guardamos de forma global los datos de la tienda
        console.log('this.queryParam - undefined');
      }

      this.loadDataStore(params, queryParam);

      this.loadProductDetail(params);

      this.preloadValueSearch(queryParam);
    });

  }

  // Store
  public loadDataStore(params, queryParam: ParamMap){

    if ( params.has('idStore') ) {

      const idStore =  parseInt(params.get('idStore'));

      this.storeService.getStoreById(idStore).subscribe( storeResp => {

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

          }else {
            this.wasChangedStoreData = false;

          }

        }else {
          this.storeData = storeResp; // guardamos de forma global los datos de la tienda
          // console.log('this.storeData undefined');
        }

        if (storeResp.banner_image.length > 0) {

          const storeBanners = storeResp.banner_image;

          const sizes = Object.keys(storeBanners[0].src_size);

          if (sizes.length > 1) {

            this.imgsBanners = {
              m: storeBanners[0].src_size.xl,
              s: storeBanners[0].src_size.s
            };

          } else if (sizes.length === 1){
            this.imgsBanners = {
              m: storeBanners[0].src_size.xl
            };
          }

        }

        console.log('wasChangedStoreData');
        console.log(this.wasChangedStoreData);

        console.log('wasFirstLoadedProducts');
        console.log(this.wasFirstLoadedProducts);

        console.log('wasChangedQueryParam');
        console.log(this.wasChangedQueryParam);

        // Evitamos que la página carguen los mismos datos
        // cuando la tienda sigue siendo la misma.
        // solo permite actualizar los datos cuando la tienda es cambiada
        if (this.wasChangedStoreData) {
          this.setSidebarOptions(storeResp, queryParam);
          this.setBreadcrumbOptions(storeResp);

          if (this.wasFirstLoadedProducts) {

            // if (this.wasChangedQueryParam) {
            this.loadProductsCards(params, queryParam);

            // }


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

  // Products

  /**
   * @description Al hacer click sobre un card de producto se dispara esta función a causá del evento (selected).
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

          let images = [];

          if (product.sync_bank) {

            if (product.sync_bank.length === 0) {

              images = product.images.map(image => {
                return image.src;
              });

            }else {
              images = product.sync_bank.map(syncBank => {
                return syncBank.images[0].src_size.xl ? syncBank.images[0].src_size.xl : '';
              });
            }

          }else {
            images = product.images.map(image => {
              return image.src;
            });
          }

          // Antes
          // const images = product.images.map(image => {
          //   return image.src;
          // });

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

          this.scrollToElement(document.querySelector('#profile-name'));

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


      // this.showShimmerProductsCards = true;

      if(this.productCards) {
        this.productCards.toggleShimmer();
      }

      this.productService.getProductsByStore(idStore, page, filter).subscribe(
        resp => {

          // console.log('getProductsByStore');
          // console.log(resp.data);
          const products = resp.data;
          this.totalProducts = resp.total;
          this.itemsPerPage = resp.per_page;

          if (products.length > 0) {

            this.productCards.products = products.map( product => {

              let images = [];

              if (product.sync_bank) {

                if (product.sync_bank.length === 0) {

                  images = product.images.map(image => {
                    return image.src;
                  });

                }else {
                  images = product.sync_bank.map(syncBank => {
                    return syncBank.images[0].src_size.xl ? syncBank.images[0].src_size.xl : '';
                  });
                }

              }else {
                images = product.images.map(image => {
                  return image.src;
                });
              }

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

            } );

            // console.log('products loaded: ', this.productCards.products);

            this.productCards.toggleShimmer(false);


          } else{
            this.toastRef.open(
              'Tienda sin productos disponibles',
              { color: '#ffffff', background: '#900909c2'}

            );
          }

        },
        error => {
          this.toastRef.open(
            'Error al cargar los productos, Recargue la página',
            { color: '#ffffff', background: '#900909c2'}

          );
          console.log('error al cargar productos');
          console.log(error);
        }
      );

    }

  }

  public addProductToCart( event ) {

    const idProduct = event.product.id;
    const quantity = event.quantity;

    this.productDetail.disableButtonCart(true);

    this.paymentProcessService.addProductToCart(idProduct, quantity).subscribe(
      resp => {

        if (resp.success) {

          const products = resp.data;

          this.menuOptionsShopping = this.dropdownIconComp.loadOptionsWithProductsCartResp(products);

          this.toastRef.open(
            'Producto agregado al carrito'
          );

          this.productDetail.disableButtonCart();

        }else{

          this.toastRef.open(
            'Producto no agregado al carrito',
            { color: '#ffffff', background: '#900909c2'}

          );

          this.productDetail.disableButtonCart();

        }

      },
      error => {
        this.toastRef.open(
          'Producto no agregado al carrito',
          { color: '#ffffff', background: '#900909c2'}
        );
        this.productDetail.disableButtonCart();
      }
    );

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

  // Sidebar-list
  public setSidebarOptions(storeResp: StoreResponse, queryParam: ParamMap) {

    const idStore = storeResp.id;

    this.anchorsMenu = {
      productLink: `/business-detail/${idStore}/products`,
      contactLink: `/business-detail/${idStore}`,
      wordToMatch: `products`
    };

    let contactStore;
    contactStore = { // la base de datos no tiene el dato
      url: '',
      name: 'sin dato de contacto'
    };

    const mainContactSocialKey = ['facebook', 'instagram', 'twitter'];
    const mainContactKey = ['email_1', 'email_2', 'phone_1', 'phone_2'];

    // buscamos entre las posibles propiedades alguna propiedad la cual no tenga null y en el orden de los elementos
    const isSomeContactSocial = mainContactSocialKey.find( contactKey => {
      return storeResp.social[contactKey];
    });

    const isSomeContact = mainContactKey.find( contactKey => {
      return storeResp.contact[contactKey];
    });

    if (isSomeContactSocial) { // si encuentra algún dato de contacto de redes sociales ese se mostrará
      contactStore = { // la base de datos no tiene el dato
        url: isSomeContactSocial,
        name: `@${storeResp.name}` // coloco el nombre porque el back no devuelve el nombre de la cuenta de instagram
      };

    } else if (isSomeContact) { // sino mostrara algún dato de contacto común y si ninguna condición se cumple, sera ''
      contactStore = contactStore = { // la base de datos no tiene el dato
        url: '',
        name: isSomeContact
      };
    }

    this.profile = {
      name: storeResp.name,
      contact: contactStore,
      img: 'assets/img/no-image-banner.jpg', // la base de datos no tiene el dato
      isVerified: storeResp.certification == 'true' ? true : false
    };

    const sidebarFilters = [
      {
        filterId: 1,
        title: 'categorías',
        type: 'single',
        paramName: 'categoria',
        options: [
          {
            optionId: 1,
            name: 'Cosmeticos',
            totalFounds: 200,
          },
          {
            optionId: 2,
            name: 'Alimentos',
            totalFounds: 200,
          },
        ]
      },
      {
        filterId: 2,
        title: 'sub categorías',
        type: 'multiple',
        paramName: 'sub-categoria',
        parentFilterId: 1,
        options: [
          {
            optionId: 1,
            parentOptionId: 1,
            name: 'labial',
            totalFounds: 200,
          },
          {
            optionId: 2,
            parentOptionId: 1,
            name: 'labia2',
            totalFounds: 200,
          },
          {
            optionId: 3,
            parentOptionId: 2,
            name: 'labial3',
            totalFounds: 200,
          },
        ]
      },
      {
        filterId: 3,
        title: 'Precios',
        type: 'single', // Determinamos que solo una opción puede ser seleccionada
        paramName: 'price',
        options: [
          {
            optionId: 1,
            name: '$0 - $10,000',
            totalFounds: 200,
            // isSelected: false
          },
          {
            optionId: 2,
            name: '$10,000 - $20,000',
            totalFounds: 200,
            // isSelected: false
          },
          {
            optionId: 3,
            name: '$20,000 - $30,000',
            totalFounds: 200,
            // isSelected: false
          },
          {
            optionId: 4,
            name: '$30,000 - $40,000',
            totalFounds: 200,
            // isSelected: false
          },
          {
            optionId: 5,
            name: '$40,000 - $50,000',
            totalFounds: 200,
            // isSelected: false
          },
        ]
      },
    ];

    // Evitamos que con cada cambio de la url se carguen las mismas opciones
    // de filtro, solo se sobre escriben las opciones cundo es una tienda diferente

    this.sidebarFilters = this.sidebarList.setFilters(sidebarFilters); // retornamos los filters con el formato correcto para el component


    this.sidebarList.loadOptionsFilter( queryParam ); // seleccionamos las opciones filtradas por url

  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    this.expandSidebar = event;
  }

  public setBreadcrumbOptions(storeResp: StoreResponse){

    const idStore = storeResp.id;

    this.breadcrumb = [
      {
        title: 'inicio',
        routerLink: ['/home']
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

  public scrollToElement(element) {

    element.scrollIntoView(
      {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      }
    );
  }

}
