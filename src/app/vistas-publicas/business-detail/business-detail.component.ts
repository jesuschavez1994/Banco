import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BannerOptions } from '@interfaces/components-options/banner.options.interface';
import { ProductService } from '@services/product/product.service';
import { ProductsCardsOptions } from '@interfaces/components-options/products-cards.option.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsCardsComponent } from '@shared/products-cards/products-cards.component';
import { ProductDetailComponent } from '@shared/product-detail/product-detail.component';
import { SidebarListComponent } from '@shared/sidebar-list/sidebar-list.component';
import { StoreService } from '@services/store/store.service';
import { AnchorsMenu, Profile, Category } from '@interfaces/components-options/sidebar-list.options.interface';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.scss']
})
export class BusinessDetailComponent implements OnInit, AfterViewInit {

  expandSidebar = true;
  showProducts = false;

  // Components Controllers
  @ViewChild('productCards') productCards: ProductsCardsComponent;
  @ViewChild('productDetail') productDetail: ProductDetailComponent;
  @ViewChild('sidebarList') sidebarList: SidebarListComponent;

  // Components Inputs
  imgsBanners: BannerOptions = {
      m: 'assets/img/test-img/banner.png'
  };

  anchorsMenu: AnchorsMenu;
  profile: Profile;
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private storeService: StoreService,

  ){}

  ngOnInit(): void {
    this.setDataByParams();

  }

  ngAfterViewInit(): void {

  }


  public setDataByParams(){

    this.route.paramMap.subscribe( params => {

      if ( params.has('show') && params.get('show') === 'products' ){
        this.showProducts = true;

      }else {
        this.showProducts = false;

      }

      this.setSidebarOptions(params);

      this.loadProductDetail(params);

      this.loadProductsCards(params);

    });

  }

  // Products

  /**
   * @description Al hacer click sobre un card de producto se dispara esta función a casusa del evento (selected).
   * De esta manera, manipulamos la siguiente acción la cual modifica el :idStore y :idProduct de la ruta business-detail
   * @author Christopher Dallar, On GiLab and GitHub: christopherdal, Mail: christpherdallar1234@matiz.com.ve
   * @date 13/12/2020
   * @param {ProductsCardsOptions} product
   * @memberof BusinessDetailComponent
   */
  public detailProduct(product: ProductsCardsOptions) {

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
  public loadProductDetail(params) {

    if (
      (params.has('show') && params.get('show') === 'products')
      && params.has('idStore')
      && params.has('idProduct')
    ) {

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
        }
      );

    }


  }

  public loadProductsCards(params) {

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

  }

  // Sidebar-list
  public setSidebarOptions(params){

    if ( params.has('idStore') ) {
      const idStore =  parseInt(params.get('idStore'));

      this.storeService.getStoreById(idStore).subscribe( storeResp => {
        console.log(storeResp);

        this.anchorsMenu = {
          productLink: `/business-detail/${idStore}/products`,
          contactLink: `/business-detail/${idStore}`,
          wordToMatch: `products`
        };

        this.profile = {
          name: storeResp.name,
          instagram: { // la base de datos no tiene el dato
            url: '',
            name: '@medicalbackground'
          },
          img: 'assets/img/no-image-banner.jpg', // la base de datos no tiene el dato
          isVerified: storeResp.certification == 'true' ? true : false
        };

        this.categories = [
          {
            id: 1,
            name: 'Medicamentos',

            subcategories: [
              {
                id: 1,
                name: 'Dolor & inflamación',

              },
              {
                id: 1,
                name: 'Belleza & Higiene',

              },
              {
                id: 1,
                name: 'Dieta & Fitness',

              },
              {
                id: 1,
                name: 'Salud y vitaminas',

              },
              {
                id: 1,
                name: 'Vida sexual',

              },
              {
                id: 1,
                name: 'Ortopedia',

              },
              {
                id: 1,
                name: 'Homeopatia & natural',

              },
              {
                id: 1,
                name: 'Mascotas & veterinaria',

              }
            ]
          },
          {
            id: 1,
            name: 'Medicamentos2',

            subcategories: [
              {
                id: 1,
                name: 'Dolor & inflamación2',

              },
              {
                id: 1,
                name: 'Belleza & Higiene2',

              },
              {
                id: 1,
                name: 'Dieta & Fitness2',

              },
              {
                id: 1,
                name: 'Salud y vitaminas2',

              },
              {
                id: 1,
                name: 'Vida sexual2',

              },
              {
                id: 1,
                name: 'Ortopedia2',

              },
              {
                id: 1,
                name: 'Homeopatia & natural2',

              },
              {
                id: 1,
                name: 'Mascotas & veterinaria2',

              }
            ]
          },
        ];

      });

    }

  }

  public toogleSidebar(event) {
    this.expandSidebar = event;
  }

  public selectedCategory(event){
    console.log(event);

    this.route.paramMap.subscribe( params => {

      if (params.has('idStore')){

        const idStore = params.get('idStore');

        this.router.navigate(
          ['/business-detail', idStore, 'products'],
          { queryParams: { category: 1 } }
        );

      }

    } );

  }

}
