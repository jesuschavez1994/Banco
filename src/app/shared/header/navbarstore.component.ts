import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserStoreService } from '@services/user-store/user-store.service';
import { StoreService } from '@services/store/store.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '@services/usuario/usuario.service';
import { DropdownOption, ClassIcon, ExtraButtonEmitter } from '@interfaces/components-options/dropdown.options.interface';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { DropdownIconComponent } from '../dropdown-icon/dropdown-icon.component';
import { ToastComponent } from '../../modals/toast/toast.component';
import { ProductService } from '../../services/product/product.service';
import { FavoriteResp } from '../../interfaces/product.interface';


@Component({
  selector: 'app-navbarstore',
  templateUrl: './navbarstore.component.html',
  styleUrls: ['./navbarstore.component.css']
})
export class NavbarstoreComponent implements OnInit {

  @ViewChild('toastRef') toastRef: ToastComponent;
  @Input() fixed = true;

  // Button DropDown - cart
  classIcon: ClassIcon = {
    class: 'fas fa-shopping-cart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323'
    }
  };
  @Input() menuOptions: DropdownOption[] = [];

  // Button DropDown - favorite
  classIconFavorite: ClassIcon = {
    class: 'fas fa-heart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323'
    }
  };

  @Input() menuOptionsFavorite: DropdownOption[] = [];

  usuario: Usuario;
  datosUsuario: any[] = [];
  IMG_USER: string;

  constructor(
    public usuarioService: UsuarioService,
    public userStoreServices: UserStoreService,
    public storeService: StoreService,
    private paymentProcessService: PaymentProcessService,
    private dropdownIconComp: DropdownIconComponent,
    private productService: ProductService,

  ){
  }

  ngOnInit() {

    this.userStoreServices.getStore().subscribe( resp => {
      this.datosUsuario.push(resp);
    });

    this.usuarioService.datosUserImages(localStorage.getItem('id')).subscribe( (Response: any) => {
      if (Response.length > 0) {
        this.IMG_USER = Response[0].src;
      }
    });

    this.loadProductCart();

    this.productService.addProductToFavorite( 3 ).subscribe(
      resp => {
        console.log('addProductToFavorite');
        console.log(resp);

        if (resp) {

          if (resp.created) {

            if (!resp.created) {
              this.toastRef.open(
                'Producto no agregado a favoritos',
                { color: '#ffffff', background: '#900909c2'}
              );
            }

          }else if (resp.message) {

            if ( resp.message === 'ya existe como favorito' ) {
              this.toastRef.open(
                'Producto existe como favorito',
                { color: '#ffffff', background: '#900909c2'}
              );
            }

          }


        }

      },
      error => {
        this.toastRef.open(
          'Producto no agregado a favoritos',
          { color: '#ffffff', background: '#900909c2'}
        );
      }
    );

    this.loadFavoriteList();

  }

  public deleteProductFromCart(event: ExtraButtonEmitter) {

    const idProduct = event.option.data.id;

    this.paymentProcessService.deleteProductFromCart(idProduct).subscribe(

      resp => {

        this.menuOptions = [];

        if (resp.data) {

          if (resp.data.length > 0) {

            resp.data.forEach( product => {

              let option;

              option = {
                title: product.name,
                typeEvent: 'routerLink',
                eventValue: ['/panel/carrito-compras'],
                data: product
              };

              this.menuOptions.push(option);
            });

          }

        }

        this.toastRef.open(
          'Producto eliminado del carrito'
        );

      },
      error => {
        this.toastRef.open(
          'Producto eliminado del carrito'
        );
      }

    );

  }


  buscar( ){}

  public loadProductCart() {
    this.paymentProcessService.getProductsFromCart().subscribe(
      resp => {
        const products = resp.data;
        this.menuOptions = this.dropdownIconComp.loadOptionsWithProductsCartResp(products);

      }
    );
  }

  public loadFavoriteList() {
    this.productService.getFavoriteProducts().subscribe(
      resp => {
        // console.log('loadFavoriteList');
        // console.log(resp);
        this.menuOptionsFavorite = this.dropdownIconComp.loadOptionsWithFavoriteProductResp(resp);

      }
    );
  }

  public deleteProductFromFavorite(data) {
    const idProductFav = data.option.data.productFavorite.id;

    // console.log('idUser');
    // console.log(idUser);

    // console.log('idProductFav');
    // console.log(idProductFav);

    this.productService.removeProductFromFavorite(idProductFav).subscribe(
      resp => {

        if (resp.deleted) {

          this.productService.getFavoriteProducts().subscribe(
            favoriteProduct => {

              this.menuOptionsFavorite = this.dropdownIconComp.loadOptionsWithFavoriteProductResp(favoriteProduct);

            }
          );

          this.toastRef.open(
            'Producto eliminado de favoritos'
          );

        }

      },
      error => {
        console.log(error);
        this.toastRef.open(
          'Producto no eliminado de favoritos'
        );
      }
    );

  }

}
