import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
} from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface'
import { Router } from '@angular/router'
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service'
import { MatSnackBar } from '@angular/material/snack-bar'

interface ProductToSync {
  bank_id: number
  product_id: number
  name?: string
}

@Component({
  selector: 'app-search-store',
  templateUrl: './search-store.component.html',
  styleUrls: ['./search-store.component.scss'],
})
export class SearchStoreComponent implements OnInit, OnChanges {
  addProductNew = false
  expandSidebar = false

  // ENTRADAS //
  @Input() isExpanded = false
  @Input() buttonSidebarList = false
  @Input() filterOptions: FilterOption[]
  @Input() debounce = 3000
  @Input() bulkSync: ProductToSync[]
  // POR DEFECTO MUESTRA EL FILTRO
  @Input() showFilter = true

  // SALIDAS //
  @Output() sidebarExpand = new EventEmitter<boolean>()
  @Output() searchEmitter = new EventEmitter<string>()

  BotonActivated: string
  addBotonEvent: boolean = false
  cantSync = true

  search = new FormControl('')

  constructor(
    private _router: Router,
    private _sincronizacionService: SincronizacionService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((searchTerm) => {
      this.searchEmitter.emit(searchTerm)
      console.log('search', searchTerm)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName]
        switch (propName) {
          case 'bulkSync': {
            this.disableSyncButton(change.currentValue)
          }
        }
      }
    }
  }

  public addNewProduct() {
    this.addProductNew = true
  }

  /**
   * Check if the router url contains the specified route.
   *
   * @param {string} routeForCheck
   * @returns
   * @memberof ThisComponent
   */
  hasRoute(routeForCheck: string) {
    return this._router.url.includes(routeForCheck)
  }

  // Events that happen in the component ----------
  public toggleSidebarList(event) {
    this.isExpanded = event
    this.sidebarExpand.emit(this.isExpanded)
    console.log('event search', event)
  }

  disableSyncButton(bulkData: Array<ProductToSync>): void {
    if (bulkData.length > 0) {
      this.cantSync = false
    } else {
      this.cantSync = true
    }
  }

  // API calls handler methods ------------------
  sendBulkData() {
    let payload = {
      syncs: this.bulkSync,
    }

    let stringPayload = JSON.stringify(payload)
    console.log('Data to send to the server')
    console.log(stringPayload)
    this._sincronizacionService
      .bulkProductsSync(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        stringPayload
      )
      .subscribe((response) => {
        this.snackBar.open(
          '¡Sus productos han sido sincronizado exitosamente!',
          'cerrar',
          { duration: 4000 }
        )
      })
  }
}
