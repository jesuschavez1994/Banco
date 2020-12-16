import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { bannerOptions } from '@interfaces/components-options/banner.option.interface';
import { ProductService } from '@services/product/product.service';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsCardsComponent } from '@shared/products-cards/products-cards.component';
import { ProductDetailComponent } from '@shared/product-detail/product-detail.component';
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component';
import { StoreService } from '@services/store/store.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit, AfterViewInit {

  showProducts = false;

  // Components Controllers
  @ViewChild('productCards') productCards: ProductsCardsComponent;
  @ViewChild('productDetail') productDetail: ProductDetailComponent;
  @ViewChild('sidebarList') sidebarList: SidebarListComponent;

  // Components Inputs
  imgsBanners: bannerOptions = {
      m: 'assets/img/test-img/banner.png'
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private storeService: StoreService,

  ){}

  ngOnInit(): void {
    this.setSelectedProduct();
    this.setProductsCards();
    this.showProductsContainer();

    this.store();

  }

  ngAfterViewInit(): void {
      this.sidebarList.isExpanded = true;

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

      this.route.paramMap.subscribe( params => {

          const routes = this.route.snapshot.url.map( url => url.path );
          const idxRouteMatched = routes.indexOf('products');

          if (idxRouteMatched > -1 && params.has('idStore') && params.has('idProduct') ) {

              const idStore = parseInt( params.get('idStore') );
              const idProduct = parseInt( params.get('idProduct') );

              this.productService.getProductByStore(idStore, idProduct).subscribe(
              product => {

                  this.productDetail.selectedProduct = this.productDetail.formatProductResponse(
                  product,
                  ['name', 'description', 'price', 'stock', 'images', 'id', 'store_id']
                  );

              }, error => {

                  console.log('Error loading products', error);
                  this.productDetail.selectedProduct = null;

              }, () => {
                  // console.log('products loaded');
              });

          }

      });
  }

  public setProductsCards() {

      // Agregar swichtmap
      this.route.paramMap.subscribe( params => {

          if (params.has('idStore')) {

              // tslint:disable-next-line: radix
              const idStore = parseInt( params.get('idStore') );

              this.productService.getProductsByStore(idStore).subscribe( resp => {

                  const products = resp.data;

                  this.productCards.products = this.productCards.formatProductsResponse(
                      products,
                      ['name', 'description', 'price', 'stock', 'images', 'id', 'store_id']
                  );

              });

          }

      });

  }

  public store() {
    // getStoreById(1)
    this.storeService.getStoreById(1).subscribe(resp => {
      console.log(resp);
    });
  }


}
