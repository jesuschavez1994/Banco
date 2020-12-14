import { Component, OnInit } from '@angular/core';
import { SidebarListControler } from '@models/models-components-options/sidebar-list.model';
import { bannerOptions } from '@interfaces/components-options/banner.interface';
import { ProductService } from '@services/product/product.service';
import { ProductsCardsController } from '@models/models-components-options/products-cards.model';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.options.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {

  showProducts = false;

  // Components Controllers
  sidebarListCtr = new SidebarListControler();
  productsCardsCtr = new ProductsCardsController();

  // Components Inputs
  imgsBanners: bannerOptions = {
    m: 'assets/img/test-img/banner.png'
  };

  productsCards: ProductsCardsOptions[] = [];
  selectedProduct: ProductsCardsOptions;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    ) {
    this.sidebarListCtr.expandSidebarlist = true;

  }

  ngOnInit(): void {

    this.setProductsCards();
    this.showProductsContainer();

  }

  public selectProduct(event) {
    this.selectedProduct = event;

  }

  public setProductsCards() {

    // Agregar swichtmap
    this.route.paramMap.subscribe(params => {

      if (params.has('idStore')) {

        // tslint:disable-next-line: radix
        const idStore = parseInt( params.get('idStore') );

        this.productService.getProductsByStore(idStore).subscribe( resp => {

          const products = resp.data;

          this.productsCards = this.productsCardsCtr.formatProductResponse(
            products,
            ['name', 'description', 'price', 'stock', 'images', 'id', 'store_id']
          );

        });

      }

    });

  }


  /**
   * @description Controla el valor ngIf para desplegar la sección de contacto o productos
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @memberof BusinessDetailComponent
   */
  public showProductsContainer(){

    const routes = this.route.snapshot.url.map( url => url.path );
    const idxRouteMatched = routes.indexOf('products');

    this.showProducts = idxRouteMatched !== -1 ? true : false;

  }

}
