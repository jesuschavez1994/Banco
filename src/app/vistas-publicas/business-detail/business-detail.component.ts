import { Component, OnInit } from '@angular/core';
import { SidebarListControler } from '@models/models-components-options/sidebar-list.model';
import { bannerOptions } from '@interfaces/components-options/banner.interface';
import { ProductService } from '@services/product/product.service';
import { ProductsCardsController } from '@models/models-components-options/products-cards.model';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.options.interface';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
    ) {
    this.sidebarListCtr.expandSidebarlist = true;

  }

  ngOnInit(): void {
    this.setSelectedProduct();
    this.setProductsCards();
    this.showProductsContainer();

  }

  /**
   * @description Al hacer click sobre un card de producto se dispara esta función a casusa del evento (selected).
   * De esta manera, manipulamos la siguiente acción la cual modifica el :idStore y :idProduct de la ruta business-detail
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @param {ProductsCardsOptions} product
   * @memberof BusinessDetailComponent
   */
  public selectProduct(product: ProductsCardsOptions) {
    // this.selectedProduct = event; // manera anterior, reactiva y sin petición pero con url oculta
    if (product.id > -1 && product.idStore > -1){
      this.router.navigate( ['/business-detail', product.idStore, 'products', product.id] );

    }

  }

  /**
   * @description En caso de que existan los parametros :idStore y idProduct, se realiza la petición a la base de datos
   * para obtener el producto especifico que coincida con ambos datos y asignamos los datos del producto recibido
   * a la variable que carga el detalle del producto en el Input del componente product-detail.
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @memberof BusinessDetailComponent
   */
  public setSelectedProduct() {

    this.route.paramMap.subscribe(params => {

      const routes = this.route.snapshot.url.map( url => url.path );
      const idxRouteMatched = routes.indexOf('products');

      if (idxRouteMatched > -1 && params.has('idStore') && params.has('idProduct') ) {


        const idStore = parseInt( params.get('idStore') );
        const idProduct = parseInt( params.get('idProduct') );

        this.productService.getProductByStore(idStore, idProduct).subscribe(
          product => {

            console.log(product);
            this.selectedProduct = this.productsCardsCtr.formatProductResponse(
              product,
              ['name', 'description', 'price', 'stock', 'images', 'id', 'store_id']
            );

          }, error => {

            console.log('Error loading products', error);
            this.selectedProduct  = null;

          }, () => {
            console.log('products loaded');
          }
        );

      }

    });
  }

  public setProductsCards() {

    // Agregar swichtmap
    this.route.paramMap.subscribe(params => {

      if (params.has('idStore')) {

        // tslint:disable-next-line: radix
        const idStore = parseInt( params.get('idStore') );

        this.productService.getProductsByStore(idStore).subscribe( resp => {

          const products = resp.data;

          this.productsCards = this.productsCardsCtr.formatProductsResponse(
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
