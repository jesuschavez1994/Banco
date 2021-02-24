import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'
import { StoreService } from '@services/store/store.service'
import { BreadcrumbOptions } from '@interfaces/components-options/breadcrumb.options.interface'
import {
  StoreResponse,
  Bannerimage,
  Srcsize,
} from '@interfaces/store.interface'
import { SearchService } from '@services/Search/search.service'
import { MyStoreService } from './services/my-store.service'
import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

import {
  // Category,
  Profile,
  SidebarListOptions,
  AnchorsMenu,
  SelectedEmitter,
  Filter,
  // PriceRange,
} from '@interfaces/components-options/sidebar-list.options.interface'
import { HomeServiceService } from '../../vistas-publicas/services/home-service.service'
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service'

import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component'
import { DataProductDB, ProductosLoads } from '@interfaces/InterfaceProducto'
import { UserStoreService } from '../../services/user-store/user-store.service'
import { Option } from '@interfaces/components-options/sidebar-list.options.interface'

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.component.html',
  styleUrls: ['./my-store.component.scss'],
})
export class MyStoreComponent implements OnInit {
  expandSidebar = true
  StoreName = ''
  BannerVerifiqued: any
  VerifiquedSuccesfull = false
  Onerror = false

  profile: Profile
  anchorsMenu: AnchorsMenu[] = []

  breadcrumb: BreadcrumbOptions[]
  categories: any[] = []
  MyProduct: DataProductDB[] = []
  idStore: number
  sidebarFilters: Filter[] = []

  // Variables
  storeData: StoreResponse
  wasChangedStoreData = true
  queryParam: ParamMap
  wasChangedQueryParam = true
  showShimmerProductsCards = true

  @ViewChild('sidebarList') sidebarList: SidebarListComponent

  userLog: boolean
  storeLog: boolean | string

  imgsBanners: Srcsize = {
    xl: 'assets/img/Banner/Banner1.svg',
    l: 'assets/img/Banner/Banner1.svg',
    m: 'assets/img/Banner/Banner1.svg',
    s: 'assets/img/Banner/Banner1.svg',
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public storeService: StoreService,
    private _searchService: SearchService,
    private homeService: HomeServiceService,
    private userStoreService: UserStoreService,
    private _myStoreService: MyStoreService,
    private _sidebarListService: SidebarListService
  ) {
    _myStoreService.sidebarExpanded$.subscribe(
      (sidebarState) => (this.expandSidebar = sidebarState)
    )
  }

  ngOnInit() {
    this.loadDataByParams()
    this.userLog = this.homeService.islog()
    this.storeLog = this.homeService.storeActive()
    this.VeriquedBanner()
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
        console.log('params', params)

        this.loadDataStore(params, queryParam)
      })
  }

  ngAfterViewInit() {}

  // **** Verificamos si existe un Banner ****//
  VeriquedBanner() {
    this.userStoreService
      .getDataStore(localStorage.getItem('id'), localStorage.getItem('storeId'))
      .subscribe(
        (resp: StoreResponse) => {
          console.log('Banner verifiqued', resp)

          if (resp.banner_image.length === 0) {
            this.BannerVerifiqued = this.imgsBanners
          } else {
            this.BannerVerifiqued = resp.banner_image[0].src_size
          }
          this.VerifiquedSuccesfull = true
        },
        (error) => {
          this.BannerVerifiqued = 'assets/img/no-image-banner.JPG'
          this.VerifiquedSuccesfull = true
          this.Onerror = true
        }
      )
  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    console.log('toggle', event)
    this.expandSidebar = event
  }

  public loadDataStore(params, queryParam: ParamMap) {
    const idStore = parseInt(params.get('idStore'))
    console.log('IdStore', idStore)

    this.storeService
      .getStoreById(localStorage.getItem('storeId'))
      .subscribe((storeResp) => {
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

        // Evitamos que la página carguen los mismos datos
        // cuando la tienda sigue siendo la misma.
        // solo permite actualizar los datos cuando la tienda es cambiada
        if (this.wasChangedStoreData) {
          this.setSidebarOptions(storeResp, queryParam)
          this.setBreadcrumbOptions(storeResp)
        }
      })
  }

  public setSidebarOptions(storeResp: StoreResponse, queryParam: ParamMap) {
    const id = localStorage.getItem('storeId')
    this.anchorsMenu = [
      {
        anchorName: 'Contacto',
        anchorLink: `/my-store/contact`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Productos',
        anchorLink: `/my-store/product-catalogue/${id}`,
        wordToMatch: `products`,
      },
      {
        anchorName: 'Sincronización',
        anchorLink: `/my-store/sincronizacion/exportar-lista-excel`,
        wordToMatch: `products`,
      },
      // {
      //   anchorName: 'Ventas',
      //   anchorLink: ``,
      //   wordToMatch: `products`,
      // },
    ]

    this._sidebarListService.setAnchors(this.anchorsMenu)

    const idStore = storeResp.id

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

      const categoryFilter = {
        filterId: 1,
        title: 'categorías',
        type: 'single',
        paramName: 'categoria',
        options: categoryOptions,
      }

      const subCategoryFilter = {
        filterId: 2,
        title: 'sub categorías',
        type: 'multiple',
        paramName: 'sub-categorias',
        parentFilterId: 1,
        options: subCategoryOptions,
      }

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

  /**
   * Check if the router url contains the specified route.
   *
   * @param {string} routeForCheck
   * @returns {boolean} boolean
   */
  hasRoute(routeForCheck: string): boolean {
    return this.router.url.includes(routeForCheck)
  }
}
