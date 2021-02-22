import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { StoreService } from '@services/store/store.service'
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service'
import { Sugerir } from '@models/sincronizacion/sugerir'
import { BannerOptions } from '@interfaces/components-options/banner.options.interface'
import { NgxSpinnerService } from 'ngx-spinner'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

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
  selector: 'app-suggested-section',
  templateUrl: './suggested-section.component.html',
  styleUrls: ['./suggested-section.component.scss'],
})
export class SuggestedSectionComponent implements OnInit {
  imgsBanners: BannerOptions = {
    m: '.assets/img/Banner/Banner1.svg',
  }

  @Input() item: any
  @Input() i: string
  @Output() actualProduct: EventEmitter<ProductToSync>

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`)

  // Used in responsiveness of Angular Material
  headingRowHeight = '5:1'
  innerRowHeight = '2:1.5'

  isProductChecked = false

  productToSyncReference: ProductToSync

  constructor(
    public storeService: StoreService,
    public sincronizacion: SincronizacionService,
    private spinnerService: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private breakPointObserver: BreakpointObserver
  ) {
    this.actualProduct = new EventEmitter()
  }

  ngOnInit() {
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
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.headingRowHeight = '2:2'
          this.innerRowHeight = '2:3'
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

    if (e.checked) {
      document.getElementById(i).style.filter =
        'grayscale(5%) brightness(90%) opacity(100%)'
      document.getElementById(i).style.filter =
        '-webkit-filter: grayscale(5%) brightness(90%) opacity(100%)'
      document.getElementById(i).style.filter =
        '-moz-filter: grayscale(5%) brightness(90%) opacity(100%)'
      document.getElementById(i).style.background = '#f4f4f4'

      this.isProductChecked = true
      this.productToSyncReference.checkedState = true
      this.actualProduct.emit(this.productToSyncReference)
    } else {
      document.getElementById(i).style.background = 'none'
      document.getElementById(i).style.filter = 'none'

      this.isProductChecked = false
      this.productToSyncReference.checkedState = false
      this.actualProduct.emit(this.productToSyncReference)
    }
  }

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
        this.snackBar.open(
          '¡Su producto ha sido sincronizado exitosamente!',
          'cerrar',
          { duration: 4000 }
        )
      })
  }

  scrollTop() {
    window.scrollTo({
      top: 600,
    })
  }

  // Logic for modeling the data of the product we need to sync, in case that bulk sync is choosen.
  getSuggestedProductDetails(eventValues: EventID) {
    this.productToSyncReference = {
      bank_id: parseInt(eventValues.idsuggested),
      product_id: parseInt(eventValues.idproducto),
      name: eventValues.productName,
    }
  }
}
