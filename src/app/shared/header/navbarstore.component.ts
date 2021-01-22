import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserStoreService } from '@services/user-store/user-store.service';
import { StoreService } from '@services/store/store.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '@services/usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { DropdownOption, ClassIcon, ExtraButtonEmitter } from '@interfaces/components-options/dropdown.options.interface';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { DropdownIconComponent } from '../dropdown-icon/dropdown-icon.component';
import { ToastComponent } from '../../modals/toast/toast.component';


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
      color: '#f00707'
    }
  };
  @Input() menuOptions: DropdownOption[] = [];


  usuario: Usuario;
  datosUsuario: any[] = [];
  IMG_USER: string;

  constructor(
    public usuarioService: UsuarioService,
    public userStoreServices: UserStoreService,
    public storeService: StoreService,
    private paymentProcessService: PaymentProcessService,
    private dropdownIconComp: DropdownIconComponent

  ) {
   }

  ngOnInit() {

    this.userStoreServices.getStore().subscribe( resp => {
      this.datosUsuario.push(resp);
    });

    this.usuarioService.datosUserImages(localStorage.getItem('id')).subscribe( (Response: any) => {
      this.IMG_USER = Response[0].src;
    });


    this.paymentProcessService.getProductsFromCart().subscribe(
      resp => {
        // console.log('getProductsFromCart');
        // console.log(resp);

        const products = resp.data;
        this.menuOptions = this.dropdownIconComp.loadOptionsWithProductsCartResp(products);

      }
    );

  }

  public deleteProductFromCart(event: ExtraButtonEmitter) {

    // console.log('deleteProductFromCart');
    // console.log(event);
    const idProduct = event.option.data.id;

    this.paymentProcessService.deleteProductFromCart(idProduct).subscribe(

      resp => {

        // console.log('deleteProsductFromCart');
        // console.log(resp);

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

}
