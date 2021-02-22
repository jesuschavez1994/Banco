import { Component, OnInit } from '@angular/core'
import {
  AnchorsMenu,
  Filter,
  Profile,
} from '@interfaces/components-options/sidebar-list.options.interface'
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface'
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
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
  showShimmeringCards: boolean

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  // Handlers for events that heppen in the component ----------------
  toogleSidebar($event) {}

  paginationProducts(page: number) {
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
}
