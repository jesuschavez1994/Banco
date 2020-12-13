import { Component, OnInit } from '@angular/core';
import { SidebarListControler } from '@models/models-components-options/sidebar-list.model';
import { bannerOptions } from '@interfaces/components-options/banner.interface';
import { ProductService } from '@services/product/product.service';
import { ProductsCardsController } from '@models/models-components-options/products-cards.model';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.options.interface';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit {

  imgsBanners: bannerOptions = {
    m: 'assets/img/test-img/banner.png'
  };

  // Components Controllers
  sidebarListCtr = new SidebarListControler();
  productsCardsCtr = new ProductsCardsController();

  // Components Inputs
  productsCards: ProductsCardsOptions[] = [];
  selectedProduct: ProductsCardsOptions;

  constructor( private productService: ProductService ) {
    this.sidebarListCtr.expandSidebarlist = true;

  }

  ngOnInit(): void {
    this.showProductsCards();

  }

  public selectProduct(event){
    this.selectedProduct = event;

  }

  public showProductsCards(){

    this.productService.getProductsByStore(1).subscribe( resp => {

      const products = resp.data;

      this.productsCards = this.productsCardsCtr.formatProductResponse(
        products,
        ['name', 'description', 'price', 'stock', 'images', 'id']
      );

    });

  }

}
