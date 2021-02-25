import { Component, OnInit, ViewChild } from '@angular/core';
import { SincronizacionService } from '@services/sincronizacion/sincronizacion.service';
import { ProductosLoads, DataProductDB } from '@interfaces/InterfaceProducto';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Descripcion } from '@interfaces/sincronizacion';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemListProductComponent } from './container/item-list-product/item-list-product.component';
import {
  AnchorsMenu,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface';
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service';

export class Termino {
  constructor(public name: string) {}
}

@Component({
  selector: 'app-bank-product',
  templateUrl: './bank-product.component.html',
  styleUrls: ['./bank-product.component.css'],
})
export class BankProductComponent implements OnInit {
  itemProduct: DataProductDB[] = [];
  MyProduct: ProductosLoads;
  page: number = 1;
  // tslint:disable-next-line: variable-name
  last_Page_Pagination: number;
  // tslint:disable-next-line: no-inferrable-types
  totalProductAPI: number = 0;
  showFooterPaginations = false;
  scroll: boolean = false;
  itemsPerPage = 16;
  textBuscador: any;
  expandSidebar = true;
  // Sidebar related parameters
  anchorsMenu: AnchorsMenu[] = [];
  sidebarSections: SidebarSections;

  @ViewChild('bankProductList') bankProductList: ItemListProductComponent;

  constructor(
    public sincronizacion: SincronizacionService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private _sidebarListService: SidebarListService
  ) {
    this.route.params.subscribe((params) => {
      console.log('query', params);
      this.textBuscador = params.id;
    });
  }

  ngOnInit(): void {
    this.getData(this.page);
    window.addEventListener('scroll', this.scrolling, true);
    this.spinner();
    // sistema que nos permita leer el parámetro de la página una vez que cambiamos entre estas usando la función
    this.route.queryParams.subscribe((params) => {
      this.page = parseInt(params.page, 10) || 1;
      this.getData(this.page);
    });

    this.setSidebarSections();
    this.loadAnchorsMenuData();
  }

  spinner(): void {
    this.spinnerService.show();
  }

  public handleSearch(value: string): void {
    console.log('value', value);
    if (value !== undefined) {
      let comparacion = new Termino(value);
      this.sincronizacion
        .BuscadorBancoDeProductos(
          comparacion,
          localStorage.getItem('id'),
          localStorage.getItem('storeId')
        )
        .subscribe((resp: ProductosLoads) => {
          console.log('RESP BUSCADOR', resp);
          const products = resp.data;

          this.bankProductList.products = products.map((product) => {
            console.log('MAP', product);

            let images = [];

            if (product.images) {
              if (product.images.length === 0) {
                images = product.images.map((image) => {
                  console.log('images 0', image);
                });
              }

              if (product.images.length >= 1) {
                images = product.images[0].src_size.xl;
              }
            }

            return {
              name: product.name,
              description: product.description,
              price: product.price,
              stock: product.stock,
              images, // product.images
              id: product.id ? product.id : -1,
              idStore: product.store_id ? product.store_id : -1,
              sinchronized: product.sincronice,
            };

            // product.images['0'].src_size.xl
          });
        });
    }
  }

  pageChanged(page: number) {
    this.page = page;
    const queryParams: Params = { page };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });
    this.getData(this.page);
  }

  getData(page?: number) {
    this.spinner();
    this.sincronizacion.GetBankProduct(page).subscribe((resp: any) => {
      this.itemProduct = resp.data;
      console.log('RESPUESTA BANK PRODUCT', resp);
      this.last_Page_Pagination = resp.last_page;
      this.totalProductAPI = resp.total;
      this.itemsPerPage = resp.per_page;
      this.showFooterPaginations = true;
      this.spinnerService.hide();
      const products = resp.data;
      this.scrollTop();

      this.bankProductList.products = products.map((product) => {
        console.log('MAP', product);

        let images = [];

        if (product.images) {
          if (product.images.length === 0) {
            images = product.images.map((image) => {
              console.log('images 0', image);
            });
          }

          if (product.images.length >= 1) {
            images = product.images[0].src_size.xl;
          }
        }

        return {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          images, // product.images
          id: product.id ? product.id : -1,
          idStore: product.store_id ? product.store_id : -1,
          isFavorite: product.isFavorite ? product.isFavorite : false,
          sinchronized: product.sincronice,
        };

        // product.images['0'].src_size.xl
      });

      console.log('products loaded: ', this.bankProductList.products);
    });
  }

  // Expand or contract sidebar-list on responsive mode
  public toogleSidebar(event) {
    this.expandSidebar = event;
  }

  scrolling = (s) => {
    let sc = s.target.scrollingElement.scrollTop;
    console.log(sc);
    if (sc >= 2733) {
      this.scroll = true;
    } else {
      this.scroll = false;
    }
  };

  scrollDown() {
    window.scrollTo({
      top: 10000000,
    });
  }

  scrollTop() {
    window.scrollTo({
      top: 300,
    });
  }

  loadAnchorsMenuData() {
    const id = localStorage.getItem('storeId');
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
    ];

    // Eliminamos los enlaces de la sidebar.
    this._sidebarListService.setAnchors(this.anchorsMenu);
  }

  private setSidebarSections() {
    this.sidebarSections = {
      bussinessProfile: true,
      anchorOptions: true,
      filters: false,
    };

    this._sidebarListService.setRequiredSections(this.sidebarSections);
  }
}
