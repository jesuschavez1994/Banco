import { Component, Input, OnInit } from '@angular/core'
import { StoreService } from '@services/store/store.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Descripcion } from '@interfaces/sincronizacion'
import { Total, Suggestion, Datum } from '@interfaces/sincronizacion'
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service'
import { SincronizarElProducto } from '@models/sincronizacion/documentExcel.model'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Sugerir } from '@models/sincronizacion/sugerir'
import { ProductosLoads } from '@interfaces/InterfaceProducto'
import { BehaviorSubject } from 'rxjs'
import { Termino } from '@models/buscador.model'
import { BannerOptions } from '@interfaces/components-options/banner.options.interface'
import { NgxSpinnerService } from 'ngx-spinner'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
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
}

@Component({
  selector: 'app-suggested-section',
  templateUrl: './suggested-section.component.html',
  styleUrls: ['./suggested-section.component.scss'],
})
export class SuggestedSectionComponent implements OnInit {
  imgsBanners: BannerOptions = {
    m: '.assets/img/Banner/Banner1.svg',
  }

  @Input() SetAllCheckbox: boolean
  @Input() PalabraBuscador: ProductosLoads

  expandSidebar = true

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`)

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

  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.scrolling, true)

    this.getData(this.page)

    this.spinner()
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe((params) => {
      this.page = parseInt(params.page, 10) || 1
      this.getData(this.page)
    })

    // Checking the device's breakpoint
    this.breakPointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.headingRowHeight = '2:3'
          this.innerRowHeight = '2:4'
          console.log('XSmall')
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.headingRowHeight = '2:2'
          this.innerRowHeight = '2:3'
          console.log('SMall')
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.headingRowHeight = '5:1'
          this.innerRowHeight = '2:1.5'
          console.log('Medium')
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.headingRowHeight = '4:1'
          this.innerRowHeight = '2:2'
          console.log('Large')
        }
      })
  }

  spinner(): void {
    this.spinnerService.show()
  }

  SelectCheckBox(e: any, i: string) {
    // console.log(e.checked)
    console.log('Item to sync details')
    console.log(this.productToSyncReference)

    if (e.checked) {
      document.getElementById(i).style.filter =
        'grayscale(5%) brightness(90%) opacity(100%)'
      document.getElementById(i).style.filter =
        '-webkit-filter: grayscale(5%) brightness(90%) opacity(100%)'
      document.getElementById(i).style.filter =
        '-moz-filter: grayscale(5%) brightness(90%) opacity(100%)'
      document.getElementById(i).style.background = '#f4f4f4'

      // Updating the bulk array
      /*  this.bulkSync.push(this.productToSyncReference)
      console.log('Product to sync')
      console.log(this.bulkSync) */
    } else {
      document.getElementById(i).style.background = 'none'
      document.getElementById(i).style.filter = 'none'

      // Deleting the product from bulk
      /*   this.bulkSync = this.bulkSync.filter(
        (element) => element.bank_id !== this.productToSyncReference.bank_id
      )

      console.log('New array')
      console.log(this.bulkSync) */
    }
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

  formSincronizacion() {}

  // SINCRONIZACION //
  sincronizar(value: EventID) {
    // console.log('id', value)

    const BankId = new Sugerir(value.idsuggested)
    this.sincronizacion
      .productSyncrhonized(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        value.idproducto,
        BankId
      )
      .subscribe((resp) => {
        // console.log(resp)
        this.snackBar.open(
          '¡Su producto ha sido sincronizado exitosamente!',
          'cerrar',
          { duration: 4000 }
        )
      })
  }

  // Logic for modeling the data of the product we need to sync, in case that bulk sync is choosen.
  getSuggestedProductDetails(eventValues: EventID) {
    /*   this.productToSyncReference = {
      bank_id: parseInt(eventValues.idsuggested),
      product_id: parseInt(eventValues.idproducto),
      name: eventValues.productName,
    } */
  }
}
