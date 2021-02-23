import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'
import {
  AnchorsMenu,
  Filter,
  Profile,
} from '@interfaces/components-options/sidebar-list.options.interface'
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface'
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router'

import { ProductsCardsComponent } from '@shared/products-cards/products-cards.component'
import { ProductDetailComponent } from '@shared/product-detail/product-detail.component'
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component'
import { ToastComponent } from '../../modals/toast/toast.component'

import { SearchService } from '@services/Search/search.service'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  // Components Controllers
  @ViewChild('productCards') productCards: ProductsCardsComponent
  @ViewChild('productDetail') productDetail: ProductDetailComponent
  @ViewChild('sidebarList') sidebarList: SidebarListComponent
  @ViewChild('toastRef') toastRef: ToastComponent

  // Sidebar related parameters
  expandSidebar = true
  sidebarFilters: Filter[] = [
    {
      filterId: 1,
      title: 'categorías',
      type: 'single',
      paramName: 'categoria',
      options: [
        {
          optionId: 1,
          name: 'Cosmeticos',
          totalFounds: 200,
        },
        {
          optionId: 2,
          name: 'Alimentos',
          totalFounds: 200,
        },
      ],
    },
    {
      filterId: 2,
      title: 'sub categorías',
      type: 'multiple',
      paramName: 'sub-categoria',
      parentFilterId: 1,
      options: [
        {
          optionId: 1,
          parentOptionId: 1,
          name: 'labial',
          totalFounds: 200,
        },
        {
          optionId: 2,
          parentOptionId: 1,
          name: 'labia2',
          totalFounds: 200,
        },
        {
          optionId: 3,
          parentOptionId: 2,
          name: 'labial3',
          totalFounds: 200,
        },
      ],
    },
    {
      filterId: 3,
      title: 'Precios',
      type: 'single', // Determinamos que solo una opción puede ser seleccionada
      paramName: 'price',
      options: [
        {
          optionId: 1,
          name: '$0 - $10,000',
          totalFounds: 200,
          // isSelected: false
        },
        {
          optionId: 2,
          name: '$10,000 - $20,000',
          totalFounds: 200,
          // isSelected: false
        },
        {
          optionId: 3,
          name: '$20,000 - $30,000',
          totalFounds: 200,
          // isSelected: false
        },
        {
          optionId: 4,
          name: '$30,000 - $40,000',
          totalFounds: 200,
          // isSelected: false
        },
        {
          optionId: 5,
          name: '$40,000 - $50,000',
          totalFounds: 200,
          // isSelected: false
        },
      ],
    },
  ]

  // Product's cards related parameters
  totalProducts: number
  itemsPerPage = 16
  showShimmeringCards = true

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.sidebarFilters = this.sidebarList.setFilters(this.sidebarFilters)
  }

  ngAfterViewInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((queryParams: ParamMap) => {
          const page = queryParams.has('page')
            ? parseInt(queryParams.get('page'))
            : 1

          let globalSearchPayload = {
            name: queryParams.has('name') ? queryParams.get('name') : '',
          }

          return this._searchService.globalProductSearch(
            globalSearchPayload,
            page
          )
        })
      )
      .subscribe((productsData: any) => {
        if (this.productCards) {
          this.productCards.toggleShimmer()
        }

        this.totalProducts = productsData.total
        this.itemsPerPage = productsData.per_page

        let productsRawData = productsData.data
        this.addProductsData(productsRawData)
      })
  }

  // Handlers for events that heppen in the component ----------------
  toogleSidebar(event) {
    this.expandSidebar = event
  }

  productsPagination(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    })
  }

  goToProductDetails(product: ProductsCardsOptions) {
    if (product.id > -1 && product.idStore > -1) {
      this.router.navigate([
        '/business-detail',
        product.idStore,
        'products',
        product.id,
      ])
    }
  }

  addProductsData(productsRawData: any) {
    console.log('Products raw data:')
    console.log(productsRawData.length)
    if (productsRawData.length > 0) {
      this.productCards.products = productsRawData.map((product) => {
        let images = []

        if (product.sync_bank) {
          if (product.sync_bank.length === 0) {
            images = product.images.map((image) => {
              return image.src
            })
          } else {
            images = product.sync_bank.map((syncBank) => {
              return syncBank.images[0].src_size.xl
                ? syncBank.images[0].src_size.xl
                : ''
            })
          }
        } else {
          images = product.images.map((image) => {
            return image.src
          })
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
        }
      })

      this.productCards.toggleShimmer(false)
    } else {
      this.toastRef.open('No hay productos que coincidan con la búsqueda.', {
        color: '#ffffff',
        background: '#900909c2',
      })
    }
  }
}
