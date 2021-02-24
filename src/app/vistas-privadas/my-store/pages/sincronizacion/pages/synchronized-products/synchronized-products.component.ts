import { Component, OnInit, Input } from '@angular/core'
import { StoreService } from '@services/store/store.service'
import { ProductosLoads, DataProductDB } from '@interfaces/InterfaceProducto'
import {
  AnchorsMenu,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface'
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service'

@Component({
  selector: 'app-synchronized-products',
  templateUrl: './synchronized-products.component.html',
  styleUrls: ['./synchronized-products.component.css'],
})
export class SynchronizedProductsComponent implements OnInit {
  itemProductos: DataProductDB[] = []
  sinchronized = false
  // Sidebar related parameters
  anchorsMenu: AnchorsMenu[] = []
  sidebarSections: SidebarSections

  constructor(
    public storeService: StoreService,
    private _sidebarListService: SidebarListService
  ) {}

  ngOnInit(): void {
    this.storeService
      .ProductGet(localStorage.getItem('id'), localStorage.getItem('storeId'))
      .subscribe((resp: ProductosLoads) => {
        this.itemProductos = resp.data
        console.log('ITEM', this.itemProductos)

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.itemProductos.length; i++) {
          if (this.itemProductos[i].sincronice === 'sincronizado') {
            return (this.sinchronized = true)
          } else {
            this.sinchronized = false
          }
        }
      })

    this.setSidebarSections()
    this.loadAnchorsMenuData()
  }

  private loadAnchorsMenuData() {
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
      {
        anchorName: 'Ventas',
        anchorLink: `/my-store/ventas`,
        wordToMatch: `products`,
      },
    ]

    // Eliminamos los enlaces de la sidebar.
    this._sidebarListService.setAnchors(this.anchorsMenu)
  }

  private setSidebarSections() {
    this.sidebarSections = {
      bussinessProfile: true,
      anchorOptions: true,
      filters: false,
    }

    this._sidebarListService.setRequiredSections(this.sidebarSections)
  }
}
