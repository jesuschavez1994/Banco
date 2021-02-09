import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {ModalRegisterComponent} from '@shared/modal-register/modal-register.component';
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownOption, ClassIcon, ExtraButtonEmitter } from '@interfaces/components-options/dropdown.options.interface';
/******* */
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { DropdownIconComponent } from '../../dropdown-icon/dropdown-icon.component';
import { ProductService } from '../../../services/product/product.service';
import { ToastComponent } from '../../../modals/toast/toast.component';

/******* */
@Component({
  selector: 'app-nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss']
})
export class NavOptionsComponent implements OnInit {
  @Input() auth: boolean;
  @Input() storeAct: boolean | string;
  constructor(private modal : MatDialog, private paymentProcessService: PaymentProcessService,
    private dropdownIconComp: DropdownIconComponent,
    private productService: ProductService,) { }

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
  // Button DropDown - favorite
  classIconFavorite: ClassIcon = {
    class: 'far fa-heart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323'
    }
  };
  @Input() menuOptions: DropdownOption[] = [];
  @Input() menuOptionsFavorite: DropdownOption[] = [];
  @ViewChild('toastRef') toastRef: ToastComponent;
  ngOnInit(): void {
    this.menuOptionsFavorite.push(
      {
        title: 'name 1',
        typeEvent: 'none',
      }
    );
    // Carga items dropdown
    if(this.auth && !this.storeAct ){
      this.loadProductCart();
      this.loadFavoriteList()
    }
  }

  // BY: Christofer
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

  openDialog(): void {
    const dialogRef = this.modal.open(ModalRegisterComponent,{width: 'auto',height: 'auto', panelClass: 'custom-modalbox'} );
  }
}
