import { Component, OnInit, Input } from '@angular/core'
import { StoreService } from '@services/store/store.service'
import { ProductosLoads, DataProductDB } from '@interfaces/InterfaceProducto'
import {
  AnchorsMenu,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface'
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service'
import { ListProductSyncAnNoSync, DataListProductSyncAnNoSync } from '@interfaces/table-product-sync-and-no-sync/ListProductSyncAndNosync';

@Component({
  selector: 'app-synchronized-products',
  templateUrl: './synchronized-products.component.html',
  styleUrls: ['./synchronized-products.component.css'],
})
export class SynchronizedProductsComponent implements OnInit {

  itemProductos: DataProductDB[] = []
  sinchronized = false;
  ListDAta: ListProductSyncAnNoSync;
  // Sidebar related parameters
  anchorsMenu: AnchorsMenu[] = []
  sidebarSections: SidebarSections;
  ShowElemets: boolean;
  NoSincronyzed: boolean;

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

        if(this.itemProductos.length === 0){
          this.NoSincronyzed = true;
        }

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

  DataList($event){
    this.ListDAta = $event;
    console.log(this.ListDAta.data);
    if(this.ListDAta.data.length === 0){
      this.ShowElemets = false;
    }
    if(this.ListDAta.data.length > 0){
      this.ShowElemets = true;
    }
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
        anchorLink: `/my-store/product-catalogue`,
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
