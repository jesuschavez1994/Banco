import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  Filter,
  Profile,
  AnchorsMenu,
  SidebarSections,
} from '@interfaces/components-options/sidebar-list.options.interface';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Option } from '@interfaces/components-options/sidebar-list.options.interface';

import { ProductsCardsComponent } from '@shared/products-cards/products-cards.component';
import { ProductDetailComponent } from '@shared/product-detail/product-detail.component';
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component';
import { ToastComponent } from '../../modals/toast/toast.component';

import { SearchService } from '@services/Search/search.service';
import { SidebarListService } from '@shared/sidebar-list/services/sidebar-list.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  // Components Controllers
  @ViewChild('productCards') productCards: ProductsCardsComponent;
  @ViewChild('productDetail') productDetail: ProductDetailComponent;
  @ViewChild('sidebarList') sidebarList: SidebarListComponent;
  @ViewChild('toastRef') toastRef: ToastComponent;

  // Sidebar related parameters
  expandSidebar = true;
  sidebarFilters: Filter[] = [];
  categoryFilter = {
    filterId: 1,
    title: 'categorías',
    type: 'single',
    paramName: 'categoria',
    options: [
      {
        optionId: 1,
        name: 'Alimentos',
        totalFounds: 200,
      },
    ],
  };

  subCategoryFilter = {
    filterId: 2,
    title: 'sub categorías',
    type: 'multiple',
    paramName: 'sub-categories',
    parentFilterId: 1,
    options: [
      {
        optionId: 1,
        name: 'Dolor e Inflamación',
        totalFounds: 200,
      },
      {
        optionId: 2,
        name: 'Huesos y Articulaciones',
        totalFounds: 200,
      },
      {
        optionId: 3,
        name: 'Corazón',
        totalFounds: 200,
      },
      {
        optionId: 4,
        name: 'Defensas',
        totalFounds: 200,
      },
      {
        optionId: 5,
        name: 'Vegano',
        totalFounds: 200,
      },
    ],
  };

  priceFilter: Filter = {
    filterId: 3,
    title: 'Precios',
    type: 'single', // Determinamos que solo una opción puede ser seleccionada
    paramName: 'price',
    options: [
      {
        name: '$0 - $10,000',
        value: [0, 10000],
        totalFounds: 200,
      },
      {
        name: '$10,000 - $20,000',
        value: [10000, 20000],
        totalFounds: 200,
      },
      {
        name: '$20,000 - $30,000',
        value: [20000, 30000],
        totalFounds: 200,
      },
      {
        name: '$30,000 - $40,000',
        value: [30000, 40000],
        totalFounds: 200,
      },
      {
        name: '$40,000 - $50,000',
        value: [40000, 50000],
        totalFounds: 200,
      },
    ],
  };

  factoriesFilter = {
    filterId: 4,
    title: 'Fabricante',
    type: 'multiple', // Determinamos que solo una opción puede ser seleccionada
    paramName: 'factories',
    options: [
      {
        optionId: 1,
        name: 'Abbot',
        totalFounds: 200,
        // isSelected: false
      },
      {
        optionId: 2,
        name: 'ANC',
        totalFounds: 200,
        // isSelected: false
      },
      {
        optionId: 3,
        name: 'Aura Vitals',
        totalFounds: 200,
        // isSelected: false
      },
    ],
  };

  marksFilter = {
    filterId: 5,
    title: 'Marca',
    type: 'multiple', // Determinamos que solo una opción puede ser seleccionada
    paramName: 'marks',
    options: [
      {
        optionId: 1,
        name: 'Aquasolar',
        totalFounds: 200,
        // isSelected: false
      },
      {
        optionId: 2,
        name: 'Arama',
        totalFounds: 200,
        // isSelected: false
      },
      {
        optionId: 3,
        name: 'Bosque Miel',
        totalFounds: 200,
        // isSelected: false
      },
    ],
  };

  // Product's cards related parameters
  totalProducts: number;
  itemsPerPage = 16;
  showShimmeringCards = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _searchService: SearchService,
    private titleService: Title,
    private _sidebarListService: SidebarListService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setSidebarFilters();
    // This function triggers all the fecth and modeling of the data that goes
    // on the products cards.
    this.getQueryParamsData();
  }

  // Handlers for events that happen in the component ----------------
  toggleSidebar(event) {
    this.expandSidebar = event;
  }

  productsPagination(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
    });
  }

  goToProductDetails(product: ProductsCardsOptions) {
    if (product.id > -1 && product.idStore > -1) {
      this.router.navigate(['/store', product.idStore, 'products', product.id]);
    }
  }

  /**
   * Chequea los query params de la ruta a la cual se está redirigiendo y usa éstos parámetros
   * para construir los filtros que son necesarios para realizar la consulta a la base de datos. Al
   * suscribirse, retorna la
   * información en bruto de los productos.
   * @author Jacinto Acosta.
   * @date 23/02/2021
   * @memberof SearchResultsComponent
   */
  getQueryParamsData() {
    this.route.queryParamMap
      .pipe(
        switchMap((queryParams: ParamMap) => {
          const page = queryParams.has('page')
            ? parseInt(queryParams.get('page'))
            : 1;

          // We do a quick null check to update the title accordingly. Since de backend accepts the 'name'
          // value as null, no actions are taken.
          this.setNewTitle(`Buscar: ${queryParams.get('name')} | Founduss`);

          let globalSearchPayload = {
            name: queryParams.has('name') ? queryParams.get('name') : '',
            marks: [queryParams.has('marks') ? queryParams.get('marks') : ''],
            categories: [
              queryParams.has('categories')
                ? queryParams.get('categories')
                : '',
            ],
            subcategories: [
              queryParams.has('sub-categories')
                ? queryParams.get('sub-categories')
                : '',
            ],
            factories: [
              queryParams.has('factories') ? queryParams.get('factories') : '',
            ],
          };

          this._sidebarListService.loadFilterOptions(queryParams);

          return this._searchService.globalProductSearch(
            globalSearchPayload,
            page
          );
        })
      )
      .subscribe((productsData: any) => {
        this.fetchProductsData(productsData);
      });
  }

  /**
   * Discrimina la información en bruto de los productos de todos los demas parámetros.
   * Proporciona información necesaria para la paginación y además activa la animación de carga
   * de las cartas de productos.
   * @author Jacinto Acosta.
   * @params { object } productsData
   * @date 23/02/2021
   * @memberof SearchResultsComponent
   */
  fetchProductsData(productsData: any) {
    if (this.productCards) {
      this.productCards.toggleShimmer();
    }

    this.totalProducts = productsData.total;
    this.itemsPerPage = productsData.per_page;

    let productsRawData = productsData.data;
    this.addProductsDataToCards(productsRawData);
  }

  addProductsDataToCards(productsRawData: any) {
    console.log('Products raw data:');
    console.log(productsRawData.length);
    if (productsRawData.length > 0) {
      this.productCards.products = productsRawData.map((product) => {
        let images = [];

        if (product.sync_bank) {
          if (product.sync_bank.length === 0) {
            images = product.images.map((image) => {
              return image.src;
            });
          } else {
            images = product.sync_bank.map((syncBank) => {
              return syncBank.images[0].src_size.xl
                ? syncBank.images[0].src_size.xl
                : '';
            });
          }
        } else {
          images = product.images.map((image) => {
            return image.src;
          });
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
        };
      });

      this.productCards.toggleShimmer(false);
    } else {
      this.toastRef.open('No hay productos que coincidan con la búsqueda.', {
        color: '#ffffff',
        background: '#900909c2',
      });
    }
  }

  setNewTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  setSidebarFilters() {
    let sidebarListFilters: Filter[] = [];
    sidebarListFilters.push(
      this.categoryFilter,
      this.subCategoryFilter,
      this.priceFilter,
      this.factoriesFilter,
      this.marksFilter
    );
    console.log('Sidebar list filters: ');
    console.log(sidebarListFilters);
    this.sidebarFilters = this.sidebarList.setFilters(sidebarListFilters);
    console.log('Sidebar filters: ');
    console.log(this.sidebarFilters);
  }
}
