import { Component, Input, OnInit } from '@angular/core';
import { UserStoreService } from '@services/user-store/user-store.service';
import { StoreService } from '@services/store/store.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '@services/usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { DropdownMenu, ClassIcon } from '@interfaces/components-options/dropdown.options.interface';
import { PaymentProcessService } from '@services/payment-process/payment-process.service';


@Component({
  selector: 'app-navbarstore',
  templateUrl: './navbarstore.component.html',
  styleUrls: ['./navbarstore.component.css']
})
export class NavbarstoreComponent implements OnInit {

  @Input() fixed = true;

  // Button DropDown - cart
  classIcon: ClassIcon = {
    class: 'fas fa-shopping-cart',
    color: '#F09207'
  };
  @Input() menuOptions: DropdownMenu[] = [];


  usuario: Usuario;
  datosUsuario: any[] = [];
  IMG_USER: string;

  constructor(
    public usuarioService: UsuarioService,
    public userStoreServices: UserStoreService,
    public storeService: StoreService,
    private paymentProcessService: PaymentProcessService,

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
        console.log('getProductsFromCart');
        console.log(resp);

        resp.data.forEach( product => {
          let option;
          option = {
            title: product.name,
            typeEvent: 'routerLink',
            eventValue: ['/panel/carrito-compras']
          };

          this.menuOptions.push(option);
        });
      }
    );

  }


  buscar( ){}

}
