import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { Datum } from '@interfaces/sincronizacion'
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

import { SyncProductsDataService } from '../../../../services/sync-products-data.service'

interface SuggestedProductDetails {
  bank_id: number
  product_id: number
  name: string
}

@Component({
  selector: 'app-carousel-suggested',
  templateUrl: './carousel-suggested.component.html',
  styleUrls: ['./carousel-suggested.component.css'],
})
export class CarouselSuggestedComponent implements OnInit {
  @Input() item: Datum
  @Input() checkboxState: boolean
  @Output() idSugerencia: EventEmitter<any>
  @Output() suggestedProductDetails: EventEmitter<any>
  currentPosition = 0
  // Used in responsiveness of Angular Material
  rowHeight = '2:1.5'

  productDetails: SuggestedProductDetails

  constructor(
    public sincronizacion: SincronizacionService,
    private breakPointObserver: BreakpointObserver,
    private _syncProductsDataService: SyncProductsDataService
  ) {
    this.idSugerencia = new EventEmitter()
    this.suggestedProductDetails = new EventEmitter()
  }

  ngOnInit(): void {
    // console.log('ITEM CAROUSEL', this.item.data)

    this.item.data.map((i, index) => {
      i.id = index
      i.marginLeft = 0
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
          this.rowHeight = '2:4'
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.rowHeight = '2:3'
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.rowHeight = '2:2'
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.rowHeight = '2:2'
        }
      })

    // Updating the component's initial state
    this.suggestedProductDetails.emit({
      idsuggested: this.item.data[0].bank_id,
      idproducto: this.item.product_id,
      productName: this.item.data[0].name,
    })
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position
    this.item.data.find((i) => i.id === 0).marginLeft = -100 * position
    // console.log('currentPosition', this.currentPosition);
  }

  setNext() {
    let finalPercentage = 0
    let nextPosition = this.currentPosition + 1

    console.log('nextPosition', nextPosition)
    if (nextPosition <= this.item.data.length - 1) {
      finalPercentage = -100 * nextPosition
      console.log('finalPercentage', finalPercentage)
    } else {
      nextPosition = 0
      console.log('nextPosition', nextPosition)
    }
    this.item.data.find((i) => i.id === 0).marginLeft = finalPercentage
    console.log('finalPercentage', finalPercentage)
    this.currentPosition = nextPosition

    console.log('currentPosition', this.currentPosition)

    // We send the pertinent data to the parent component, since from there it'll be modeled
    this.suggestedProductDetails.emit({
      idsuggested: this.item.data[this.currentPosition].bank_id,
      idproducto: this.item.product_id,
      productName: this.item.data[this.currentPosition].name,
    })
  }

  setBack() {
    let finalPercentage = 0
    let backPosition = this.currentPosition - 1
    console.log('nextPosition', backPosition)
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition
    } else {
      backPosition = this.item.data.length - 1
      finalPercentage = -100 * backPosition
    }
    this.item.data.find((i) => i.id === 0).marginLeft = finalPercentage
    this.currentPosition = backPosition

    // We send the pertinent data to the parent component, since from there it'll be modeled
    this.suggestedProductDetails.emit({
      idsuggested: this.item.data[this.currentPosition].bank_id,
      idproducto: this.item.product_id,
      productName: this.item.data[this.currentPosition].name,
    })
  }

  // SINCRONIZACION //
  sincronizar() {
    this.idSugerencia.emit({
      idsuggested: this.item.data[this.currentPosition].bank_id,
      idproducto: this.item.product_id,
    })
  }
}
