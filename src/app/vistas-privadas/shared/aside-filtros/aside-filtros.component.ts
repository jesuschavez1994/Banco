import { ProductLoadingService } from '../../../services/product-loading/product-loading.service'
import { FilstroStoreService } from '../../../services/FiltroStore/filstro-store.service'

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
} from '@angular/core'
import {
  Profile,
  SidebarListOptions,
  AnchorsMenu,
  ActivatedRoutesParams,
  SelectedEmitter,
  Filter,
} from '@interfaces/components-options/sidebar-list.options.interface'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'
import 'rxjs/add/operator/filter'
import { MyStoreService } from '../../my-store/services/my-store.service'

@Component({
  selector: 'app-aside-filtros',
  templateUrl: './aside-filtros.component.html',
  styleUrls: ['./aside-filtros.component.scss'],
})
export class AsideFiltrosComponent implements OnInit, AfterViewInit {
  // // category
  currentCategory

  // **** Input **** //
  @Input() isExpanded = false
  @Input() anchorsMenu: AnchorsMenu
  @Input() profile: Profile
  // @Input() RouterActivate: ActivatedRoutesParams;

  // filters
  @Input() categories = []
  @Input() sidebarOptions: SidebarListOptions

  // **** Output **** //
  @Output() sidebarExpand = new EventEmitter<boolean>()
  @Output() categiriaSelected = new EventEmitter<string>()
  @Output() subcategiriaSelected = new EventEmitter<string>()
  @Output() RouterActivate = new EventEmitter<ActivatedRoutesParams>()
  // Elements
  @ViewChild('sidebarList') sidebarList: ElementRef
  @ViewChild('productsOptionMenu') productsOptionMenu: ElementRef
  @ViewChild('contactoOptionMenu') contactoOptionMenu: ElementRef

  // VARIABLES LOCALES //
  category: any
  subcategoria: any
  showcategory: string

  constructor(
    public _productLoadingService: ProductLoadingService,
    public filtroService: FilstroStoreService,
    private router: Router,
    private _router: Router,
    private _myStoreService: MyStoreService
  ) {
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        console.log(event['url'])
        this.showcategory = this.router.routerState.snapshot.url
      })
  }

  ngOnInit(): void {
    if (this.sidebarOptions) {
      this.anchorsMenu = this.sidebarOptions.anchorsMenu
      this.profile = this.sidebarOptions.profile
      // this.categories = this.sidebarOptions.categories;
    }

    this.currentCategory = this.categories[0]
  }

  ngAfterViewInit(): void {
    console.log(this.anchorsMenu)
  }

  public emitRouterActivated() {
    // console.log(this.router.routerState.snapshot.url);
    this.showcategory = this.router.routerState.snapshot.url
  }

  @HostListener('window:scroll', ['$event'])
  public fixedSidebar($event: Event) {
    const sidebarList = this.sidebarList.nativeElement
    const pxTopElement = sidebarList.offsetTop
    const pxTopDocument = document.documentElement.scrollTop

    if (pxTopDocument > pxTopElement) {
      sidebarList.classList.add('aside--fixed')
    } else {
      sidebarList.classList.remove('aside--fixed')
    }
  }

  public toggleSidebarList(event?: any) {
    this.isExpanded = event
    // console.log('isExpanded', event);
    this._myStoreService.expandSidebar(event)
    return this.sidebarExpand.emit(this.isExpanded)
  }

  public GetCategoriasFiltro() {
    this.filtroService
      .GetCategoriaStoreFiltro(localStorage.getItem('storeId'))
      .subscribe((response) => {
        console.log('CATEGORIAS', response)
        return (this.category = response)
      })
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
}
