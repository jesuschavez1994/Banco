import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { debounceTime } from 'rxjs/operators'
import { FilterOption } from '@interfaces/components-options/search-bar.options.interface'
import { AsideFiltrosComponent } from '../../../../../shared/aside-filtros/aside-filtros.component'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service'

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
  @Input() BuscarText: any
  @Input() debounce = 3000
  @Input() bulkSync: ProductToSync[]
    // POR DEFECTO MUESTRA EL FILTRO
    @Input() showFilter = true;

  // SALIDAS //
  @Output() sidebarExpand = new EventEmitter<boolean>()
  @Output() public searchEmitter = new EventEmitter<string>()

  BotonActivated: string
  addBotonEvent: boolean = false
  cantSync = true

  public search = new FormControl('')

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _sincronizacionService: SincronizacionService
  ) {
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        console.log('BotonActivated', event['url'])
        this.BotonActivated = this.router.routerState.snapshot.url
      })
  }

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
            console.log(`bulkSync changed to:`, change.currentValue)
            this.disableSyncButton(change.currentValue)
          }
        }
      }
    }
  }

  public addNewProduct() {
    this.addProductNew = true
  }

  // Events that happen in the component ----------
  public toggleSidebarList(event) {
    this.isExpanded = event
    this.sidebarExpand.emit(this.isExpanded)
    console.log('event search', event)
  }

  disableSyncButton(bulkData: Array<ProductToSync>): void {
    console.log('Entramos en disableSyncButton')
    if (bulkData.length > 0) {
      this.cantSync = false
    } else {
      this.cantSync = true
    }
  }

  // API calls handler methods ------------------
  sendBulkData() {
    let payload = {
      syncs: this.bulkSync
    }
    console.log('Data to send to the server')

    let stringPayload = JSON.stringify(payload)
    console.log(stringPayload)
    this._sincronizacionService
      .bulkProductsSync(
        localStorage.getItem('id'),
        localStorage.getItem('storeId'),
        stringPayload
      )
      .subscribe((response) => {
        console.log('Respuesta del servidor')
        console.log(response)
      })
  }
}
