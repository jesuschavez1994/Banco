import { Component, Input, OnInit } from '@angular/core'
import { StoreService } from '@services/store/store.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Descripcion } from '@interfaces/sincronizacion'
import { Total, Suggestion, Datum } from '@interfaces/sincronizacion'
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service'
import { FormGroup, FormControl } from '@angular/forms'
import { ProductosLoads } from '@interfaces/InterfaceProducto'
import { Termino } from '@models/buscador.model'
import { BannerOptions } from '@interfaces/components-options/banner.options.interface'
import { NgxSpinnerService } from 'ngx-spinner'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SyncProductsDataService } from '../../../../services/sync-products-data.service'

export interface ICarouselItem {
  bank_id: number
  description: string
  id: number
  images: []
  name: string
  marginLeft?: number
}

interface EventID {
  idsuggested: string
  idproducto: string
  productName?: string
}

interface ProductToSync {
  bank_id: number
  product_id: number
  name: string
  checkedState?: boolean
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
  }

  @Input() SetAllCheckbox: boolean
  @Input() PalabraBuscador: ProductosLoads
  @Input() isExpanded = false

  expandSidebar = true

  // pagesActual = 69;
  forma: FormGroup
  slideIndex = 1
  next = 0
  palabra: any
  suggestedShow = false
  idProductoToSync: any
  scroll: boolean = false

  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0
  Sugerenccias: any[]
  // tslint:disable-next-line: no-inferrable-types
  page: number = 1
  filtro_valor: string = ''
  busqueda = false
  textBuscador: any

  MyProduct: Descripcion[] = []
  itemProductos: Descripcion[] = []
  DescripcionProduct: Descripcion
  Iterador: any[] = []
  finalPercentage: any
  showFooterPaginations = false
  // Used in responsiveness of Angular Material
  headingRowHeight = '5:1'
  innerRowHeight = '2:1.5'

  productToSyncReference: ProductToSync
  bulkSync: Array<ProductToSync> = []

  public currentPosition = 0

  constructor(
    public storeService: StoreService,
    public sincronizacion: SincronizacionService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private _syncProductsDataService: SyncProductsDataService
  ) {
    this.route.params.subscribe((params) => {
      console.log('query', params)
      this.textBuscador = params.id
    })

    this.forma = new FormGroup({
      banck_id: new FormControl(''),
    })
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scrolling, true)

    this.getData(this.page)

    this.spinner()
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe((params) => {
      this.page = parseInt(params.page, 10) || 1
      this.getData(this.page)
    })
  }

  spinner(): void {
    this.spinnerService.show()
  }

  pageChanged(page: number) {
    this.page = page
    const queryParams: Params = { page }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    })
    this.getData(this.page)
  }

  getData(page?: number) {
    this.spinner()
    this.sincronizacion
      .GetAllProductSuggested(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        page
      )
      .subscribe((resp: Total) => {
        this.MyProduct = resp.data
        this.suggestedShow = true
        // this.dataObject = resp.data.suggestion.data.JSON.parse();
        // console.log('MY PRODUCTOSSSS', this.MyProduct)
        this.last_Page_Pagination = resp.last_page
        this.totalProductAPI = resp.total
        this.showFooterPaginations = true
        this.spinnerService.hide()

        this.scrollTop()
      })
  }

  scrolling = (s) => {
    let sc = s.target.scrollingElement.scrollTop
    // console.log(sc)
    setTimeout(() => {
      if (sc >= 10602) {
        this.scroll = true
      } else {
        this.scroll = false
      }
    }, 600)
  }

  scrollDown() {
    window.scrollTo({
      top: 10000000,
    })
  }

  scrollTop() {
    window.scrollTo({
      top: 600,
    })
  }

  // BUSCADOR //
  handleSearch(value: string): void {
    // console.log(value)
    this.filtro_valor = value
    if (value !== undefined) {
      let comparacion = new Termino(value)

      this.sincronizacion
        .BuscadorSugerencias(
          comparacion,
          localStorage.getItem('id'),
          localStorage.getItem('storeId')
        )
        .subscribe((resp: Total) => {
          // console.log(resp.data)
          return (this.MyProduct = resp.data)
        })
    }
  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    this.expandSidebar = event
  }

  updateBulkArray(eventValues: ProductToSync) {
    this.productToSyncReference = {
      bank_id: eventValues.bank_id,
      product_id: eventValues.product_id,
      name: eventValues.name,
    }

    if (eventValues.checkedState) {
      // Updating the bulk array
      this.bulkSync.push(this.productToSyncReference)
      console.log('Bulk array update')
      console.log(this.bulkSync)
    } else {
      // Deleting the product from bulk
      this.bulkSync = this.bulkSync.filter(
        (element) => element.bank_id !== this.productToSyncReference.bank_id
      )
      console.log('Filtered array')
      console.log(this.bulkSync)
    }
  }
}
