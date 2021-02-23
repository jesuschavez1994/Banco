import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Pipe,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { BannerOptions } from '@interfaces/components-options/banner.options.interface'
import { ProductService } from '@services/product/product.service'
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface'
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router'
import { ProductsCardsComponent } from '@shared/products-cards/products-cards.component'
import { ProductDetailComponent } from '@shared/product-detail/product-detail.component'
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component'
import { StoreService } from '@services/store/store.service'
import {
  AnchorsMenu,
  Filter,
  Profile,
} from '@interfaces/components-options/sidebar-list.options.interface'
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface'
import { StoreResponse } from '@interfaces/store.interface'
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { Utils } from '../../utils/utils'
import { PaymentProcessService } from '@services/payment-process/payment-process.service'
import { DropdownOption } from '@interfaces/components-options/dropdown.options.interface'
import { DropdownIconComponent } from '../../shared/dropdown-icon/dropdown-icon.component'
import { ToastComponent } from '../../modals/toast/toast.component'
import { HomeServiceService } from '../services/home-service.service'
import { ProductModel } from '@app/models/product.model'
import { Title } from '@angular/platform-browser'
import { Option } from '../../interfaces/components-options/sidebar-list.options.interface'

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss'],
})
export class BusinessDetailComponent implements OnInit, AfterViewInit {
  readonly pageName = 'business-detail'

  // Components Controllers
  @ViewChild('productCards') productCards: ProductsCardsComponent
  @ViewChild('productDetail') productDetail: ProductDetailComponent
  @ViewChild('sidebarList') sidebarList: SidebarListComponent
  @ViewChild('toastRef') toastRef: ToastComponent
  // @ViewChild('dropdownIcon') dropdownIcon: DropdownIconComponent;

  // Components Inputs
  breadcrumb: BreadcrumbOptions[]
  imgsBanners: BannerOptions

  userLog: boolean
  storeLog: boolean | string

  // sidebar-list
  expandSidebar = true
  anchorsMenu: AnchorsMenu
  profile: Profile
  sidebarFilters: Filter[] = []

  // Products-cards
  showProducts = false
  totalProducts: number
  itemsPerPage = 16
  showShimmerProductsCards = true
  wasFirstLoadedProducts = false

  // SearchBar:
  preloadedValueSearch = ''
  searchBarFilter: FilterOption[] = [
    { label: 'filtrar por', value: 0 },
    { label: 'producto', value: 1 },
    { label: 'Empresa', value: 'hola' },
  ]

  // navbar
  menuOptionsShopping: DropdownOption[] = []

  // Variables
  storeData: StoreResponse
  wasChangedStoreData = true
  queryParam: ParamMap
  wasChangedQueryParam = true

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
    private dropdownIconComp: DropdownIconComponent,
    private productModel: ProductModel,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.userLog = this.homeService.islog()
    this.storeLog = this.homeService.storeActive()
  }

  ngAfterViewInit(): void {
    this.loadDataByParams()
  }

  public loadDataByParams() {
    combineLatest([this.route.paramMap, this.route.queryParamMap])
      .pipe(
        map(([params, queryParam]) => {
          return {
            params,
            queryParam,
          }
        })
      )
      .subscribe((data) => {
        const params = data.params
        const queryParam = data.queryParam

        if (params.has('show') && params.get('show') === 'products') {
          this.showProducts = true
        } else {
          this.showProducts = false
        }

        // Para detectar si los valores de queryParam han cambiado o no
        // y poder crear validaciones, como evitar que el listado de productos
        // se actualice si solo se cambio el id del producto a detallar
        // console.log('QUERY PARAMS - this.storeData:');

        if (this.queryParam) {
          // console.log('loadDataByParams - this.queryParam')
          // console.log(this.queryParam)
          // console.log(queryParam)

          // if ( this.queryParam.keys.length > 0) {

          if (this.queryParam !== queryParam) {
            this.wasChangedQueryParam = true
            this.queryParam = queryParam
          } else {
            this.wasChangedQueryParam = false
          }

          // } else {
          //   this.wasChangedQueryParam = false;

          // }
        } else {
          this.queryParam = queryParam // guardamos de forma global los datos de la tienda
          // console.log('this.queryParam - undefined')
        }

        this.loadDataStore(params, queryParam)

        this.loadProductDetail(params)

        this.preloadValueSearch(queryParam)
      })
  }

  // Store
  public loadDataStore(params, queryParam: ParamMap) {
    if (params.has('idStore')) {
      const idStore = parseInt(params.get('idStore'))

      this.storeService.getStoreById(idStore).subscribe((storeResp) => {
        // Gestionamos el valor de wasChangedStoreData
        // El cual sera ula variable que determinara
        // si los datos de la tienda cambiaron o no
        // console.log('loadDataStore -this.storeData:');

        if (this.storeData) {
          // console.log(this.storeData.id);
          // console.log(storeResp.id);
          if (this.storeData.id !== storeResp.id) {
            this.wasChangedStoreData = true
            this.storeData = storeResp
          } else {
            this.wasChangedStoreData = false
          }
        } else {
          this.storeData = storeResp // guardamos de forma global los datos de la tienda
          // console.log('this.storeData undefined');
        }

        if (storeResp.banner_image.length > 0) {
          const storeBanners = storeResp.banner_image

          const sizes = Object.keys(storeBanners[0].src_size)

          if (sizes.length > 1) {
            this.imgsBanners = {
              m: storeBanners[0].src_size.xl,
              s: storeBanners[0].src_size.s,
            }
          } else if (sizes.length === 1) {
            this.imgsBanners = {
              m: storeBanners[0].src_size.xl,
            }
          }
        }

        // Evitamos que la página carguen los mismos datos
        // cuando la tienda sigue siendo la misma.
        // solo permite actualizar los datos cuando la tienda es cambiada
        if (this.wasChangedStoreData) {
          this.setSidebarOptions(storeResp, queryParam)
          this.setBreadcrumbOptions(storeResp)

          if (this.wasFirstLoadedProducts) {
            this.loadProductsCards(params, queryParam)
          } else {
            this.loadProductsCards(params, queryParam)
            this.wasFirstLoadedProducts = true
          }
        } else {
          if (this.wasFirstLoadedProducts) {
            if (this.wasChangedQueryParam) {
              this.loadProductsCards(params, queryParam)
            }
          } else {
            this.loadProductsCards(params, queryParam)
            this.wasFirstLoadedProducts = true
          }
        }
      })
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
    if (product.id > -1 && product.idStore > -1) {
      this.router.navigate([
        '/business-detail',
        product.idStore,
        'products',
        product.id,
      ])
    }
  }

  /**
   * @description En caso de que existan los parámetros :idStore y idProduct, se realiza la petición a la base de datos
   * para obtener el producto especifico que coincida con ambos datos y asignamos los datos del producto recibido
   * a la variable que carga el detalle del producto en el Input del componente product-detail.
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @memberof BusinessDetailComponent
   */
  public loadProductDetail(params) {
    if (
      params.has('show') &&
      params.get('show') === 'products' &&
      params.has('idStore') &&
      params.has('idProduct')
    ) {
      const idStore = parseInt(params.get('idStore'))
      const idProduct = parseInt(params.get('idProduct'))

      this.productService.getProductByStore(idStore, idProduct).subscribe(
        (product) => {
          // console.log('getProductByStore product', product);
          if (product) {
            const productFormatead = this.productModel.productsCardsComponent.formatProductResp(
              product
            )
            this.productDetail.selectedProduct = productFormatead[0] // el método devuelve un array así que obtengo el primer elemento

            this.setTitle(product.name + '' + ' | Founduss ')
            this.scrollToElement(document.querySelector('#profile-name'))
          } else {
            this.errorLoadProductDetail()
          }
        },
        (error) => {
          this.errorLoadProductDetail()
        }
      )
    }
  }

  public errorLoadProductDetail() {
    this.toastRef.open('El producto a detallar no existe en la tienda', {
      color: '#ffffff',
      background: '#900909c2',
    })

    if (this.productDetail) {
      if (this.productDetail.selectedProduct) {
        this.productDetail.selectedProduct = null
      }
    }
  }

  public loadProductsCards(params: ParamMap, queryParams: ParamMap) {
    if (params.has('idStore')) {
      // tslint:disable-next-line: radix
      const idStore = parseInt(params.get('idStore'))
      // tslint:disable-next-line: radix
      const page = queryParams.has('page')
        ? parseInt(queryParams.get('page'))
        : 1

      let filter
      filter = {}

      console.log('queryParams Key: ', queryParams.keys)

      const keysQueryParams = queryParams.keys

      if (keysQueryParams.length > 0) {
        let queryParamsAllowed
        queryParamsAllowed = {}

        keysQueryParams.forEach((key) => {
          switch (key) {
            case 'name':
              queryParamsAllowed.name = queryParams.get('name')
              // name: 'l',
              break

            case 'marcas':
              queryParamsAllowed.marks = this.utils.stringToArray(
                queryParams.get('marcas')
              )
              // marks: ['generica', 'ALBENZA', 'XANAX', 'gillete'],
              break

            case 'categoria':
              queryParamsAllowed.categories = this.utils.stringToArray(
                queryParams.get('categoria')
              )
              // categories: ['Cosmeticos', 'infantil'],
              break

            case 'sub-categorias':
              queryParamsAllowed.subcategories = this.utils.stringToArray(
                queryParams.get('sub-categorias')
              )
              // subcategories: ['Cutis', 'Analgesicos'],

              break

            case 'fabricantes':
              queryParamsAllowed.factories = this.utils.stringToArray(
                queryParams.get('fabricantes')
              )
              // factories: ['gerber', 'polar'],
              break

            case 'precios':
              // console.log('queryParams.get(precios)');
              // console.log(queryParams.get('precios'));
              queryParamsAllowed.price = this.utils.stringToArray(
                queryParams.get('precios'),
                true
              )
              // queryParams.get('price').split(',');
              // price: [1, 284],
              break

            case 'delivery':
              queryParamsAllowed.delivery =
                queryParams.get('delivery') == 'si' ? true : false
              // delivery: true,
              break

            case 'recipes':
              queryParamsAllowed.recipes = this.utils.stringToArray(
                queryParams.get('recipes')
              )
              // recipes: ['morado', 'polar']
              break
          }
        })

        filter = queryParamsAllowed

        console.log('queryParamsAllowed: ', queryParamsAllowed)
      }

      // this.showShimmerProductsCards = true;

      if (this.productCards) {
        this.productCards.toggleShimmer()
      }

      this.productService.getProductsByStore(idStore, page, filter).subscribe(
        (resp) => {
          // console.log('getProductsByStore');
          // console.log(resp.data);
          const products = resp.data
          this.totalProducts = resp.total
          this.itemsPerPage = resp.per_page

          if (products.length > 0) {
            // Formateamos la respuesta del back y retornamos el formato correcto para el componente
            this.productCards.products = this.productModel.productsCardsComponent.formatProductResp(
              products
            )

            this.setTitle(`${this.storeData.name} | Founduss `)
            console.log('products loaded: ', this.productCards.products)

            this.productCards.toggleShimmer(false)
          } else {
            this.toastRef.open('Tienda sin productos disponibles', {
              color: '#ffffff',
              background: '#900909c2',
            })
          }
        },
        (error) => {
          this.toastRef.open(
            'Error al cargar los productos, Recargue la página',
            { color: '#ffffff', background: '#900909c2' }
          )
          console.log('error al cargar productos')
          console.log(error)
        }
      )
    }
  }

  public addProductToCart(event) {
    const idProduct = event.product.id
    const quantity = event.quantity

    this.productDetail.disableButtonCart(true)

    this.paymentProcessService.addProductToCart(idProduct, quantity).subscribe(
      (resp) => {
        if (resp.success) {
          const products = resp.data

          this.menuOptionsShopping = this.dropdownIconComp.loadOptionsWithProductsCartResp(
            products
          )

          this.toastRef.open('Producto agregado al carrito')

          this.productDetail.disableButtonCart()
        } else {
          this.toastRef.open('Producto no agregado al carrito', {
            color: '#ffffff',
            background: '#900909c2',
          })

          this.productDetail.disableButtonCart()
        }
      },
      (error) => {
        this.toastRef.open('Producto no agregado al carrito', {
          color: '#ffffff',
          background: '#900909c2',
        })
        this.productDetail.disableButtonCart()
      }
    )
  }

  // Esto se puede declarar en el componente e invocar aquí a través del ViewChild
  public paginationProducts(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    })
  }

  // Search-bar
  public search(ToSearch) {
    console.log(ToSearch.value)

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: ToSearch.value !== '' ? { name: ToSearch.value } : {},
    })
  }

  public preloadValueSearch(queryParams: ParamMap) {
    this.preloadedValueSearch = queryParams.has('name')
      ? queryParams.get('name')
      : ''
  }

  // Sidebar-list
  public setSidebarOptions(storeResp: StoreResponse, queryParam: ParamMap) {
    const idStore = storeResp.id

    this.anchorsMenu = {
      productLink: `/business-detail/${idStore}/products`,
      contactLink: `/business-detail/${idStore}`,
      wordToMatch: `products`,
    }

    let contactStore
    contactStore = {
      // la base de datos no tiene el dato
      url: '',
      name: 'sin dato de contacto',
    }

    const mainContactSocialKey = ['facebook', 'instagram', 'twitter']
    const mainContactKey = ['email_1', 'email_2', 'phone_1', 'phone_2']

    // buscamos entre las posibles propiedades alguna propiedad la cual no tenga null y en el orden de los elementos
    const isSomeContactSocial = mainContactSocialKey.find((contactKey) => {
      return storeResp.social[contactKey]
    })

    const isSomeContact = mainContactKey.find((contactKey) => {
      return storeResp.contact[contactKey]
    })

    if (isSomeContactSocial) {
      // si encuentra algún dato de contacto de redes sociales ese se mostrará
      contactStore = {
        // la base de datos no tiene el dato
        url: isSomeContactSocial,
        name: `@${storeResp.name}`, // coloco el nombre porque el back no devuelve el nombre de la cuenta de instagram
      }
    } else if (isSomeContact) {
      // sino mostrara algún dato de contacto común y si ninguna condición se cumple, sera ''
      contactStore = contactStore = {
        // la base de datos no tiene el dato
        url: '',
        name: isSomeContact,
      }
    }

    this.profile = {
      name: storeResp.name,
      contact: contactStore,
      img: 'assets/img/no-image-banner.jpg', // la base de datos no tiene el dato
      isVerified: storeResp.certification == 'true' ? true : false,
    }

    // Obtenemos las categorías de los productos vinculados a una tienda
    this.storeService.getCategoriesProducts(idStore).subscribe((resp) => {
      let sidebarListFilters: Filter[]
      sidebarListFilters = []

      const respKeys = Object.keys(resp)

      const categoriesResp = respKeys.map((respKey) => {
        return resp[respKey]
      })

      let categoryOptions: Option[]
      let subCategoryOptions: Option[]

      categoryOptions = []
      subCategoryOptions = []

      // Llenamos las opciones de categoria y las opciones de sub-categorías, todas vinculadas mediante su id
      categoriesResp.forEach((categoryResp) => {
        categoryOptions.push({
          optionId: categoryResp.id,
          name: categoryResp.name,
          totalFounds: 200,
        })

        categoryResp.subcategories.forEach((subcategoryResp) => {
          subCategoryOptions.push({
            optionId: subcategoryResp.id,
            parentOptionId: subcategoryResp.category_id,
            name: subcategoryResp.name,
            totalFounds: 200,
          })
        })
      })

      const categoryFilter: Filter = {
        filterId: 1,
        title: 'categorías',
        type: 'single',
        paramName: 'categoria',
        options: categoryOptions,
      }

      const subCategoryFilter: Filter = {
        filterId: 2,
        title: 'sub categorías',
        type: 'multiple',
        paramName: 'sub-categorias',
        parentFilterId: 1,
        options: subCategoryOptions,
      }

      const priceFilter: Filter = {
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
        ],
      }

      // Agregamos todos los filtros
      sidebarListFilters.push(categoryFilter, subCategoryFilter, priceFilter)

      // retornamos los filters con el formato correcto para el component
      this.sidebarFilters = this.sidebarList.setFilters(sidebarListFilters)

      this.sidebarList.loadOptionsFilter(queryParam) // seleccionamos las opciones filtradas por url
    })

    this.sidebarList.loadOptionsFilter(queryParam) // seleccionamos las opciones filtradas por url
  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    this.expandSidebar = event
  }

  public setBreadcrumbOptions(storeResp: StoreResponse) {
    const idStore = storeResp.id

    this.breadcrumb = [
      {
        title: 'inicio',
        routerLink: ['/home'],
      },
      {
        title: 'farmacias',
        routerLink: [`/farmacias`],
      },
    ]

    this.breadcrumb[2] = {
      title: `${storeResp.name}`,
      routerLink: [`/business-detail/${idStore}`],
    }
  }

  public scrollToElement(element) {
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }
}
