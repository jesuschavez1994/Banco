import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { HomeServiceService } from '../../vistas-publicas/services/home-service.service';
import { ModalRegisterComponent } from '@shared/modal-register/modal-register.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  DropdownOption,
  ClassIcon,
  ExtraButtonEmitter,
} from '@interfaces/components-options/dropdown.options.interface';
import { environment } from '../../../environments/environment';
/******* */
import { PaymentProcessService } from '@services/payment-process/payment-process.service';
import { DropdownIconComponent } from '../dropdown-icon/dropdown-icon.component';
import { ProductService } from '../../services/product/product.service';
import { ToastComponent } from '../../modals/toast/toast.component';

/******* */
@Component({
  selector: 'app-sidebar-home',
  templateUrl: './sidebar-home.component.html',
  styleUrls: ['./sidebar-home.component.scss'],
})
export class SidebarHomeComponent implements OnInit {
  @ViewChild('menuContainerFixed') menuContainerFixed: ElementRef;
  @ViewChild('configurationMenu') configurationMenu: ElementRef;
  @ViewChild('toastRef') toastRef: ToastComponent;
  @Input() auth: boolean;
  @Input() storeAct: boolean | string;
  envApi = environment.url;
  userId: number | string;
  userImg: any;
  userName: string;
  userEmail: string;

  // Button DropDown - cart
  classIcon: ClassIcon = {
    class: 'fas fa-shopping-cart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323',
    },
  };
  // Button DropDown - favorite
  classIconFavorite: ClassIcon = {
    class: 'far fa-heart',
    color: '#F09207',
    extraButton: {
      name: 'delete',
      class: 'fas fa-trash',
      color: '#f32323',
    },
  };
  @Input() menuOptions: DropdownOption[] = [];
  @Input() menuOptionsFavorite: DropdownOption[] = [];
  constructor(
    public authService: StoreService,
    public userService: UsuarioService,
    public homeService: HomeServiceService,
    private modal: MatDialog,
    private paymentProcessService: PaymentProcessService,
    private dropdownIconComp: DropdownIconComponent,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.imgUser();
    this.auth = this.homeService.islog();
    this.storeAct = this.homeService.storeActive();
    // Carga items dropdown
    if (this.auth && !this.storeAct) {
      this.loadProductCart();
      this.loadFavoriteList();
    }
  }
  @HostListener('window:scroll', ['$event'])
  public fixedMenu($event: Event) {
    const menuContainerFixed = this.menuContainerFixed.nativeElement;
    const pxTopElement = menuContainerFixed.offsetTop;
    const pxTopDocument = document.documentElement.scrollTop;

    if (pxTopDocument > pxTopElement) {
      menuContainerFixed.classList.add('responsive-menu-container--fixed');
    } else {
      menuContainerFixed.classList.remove('responsive-menu-container--fixed');
    }
  }

  public toggleMenu() {
    this.configurationMenu.nativeElement.classList.toggle(
      'configuration-menu--responsive-expanded'
    );
  }
  imgUser() {
    if (this.auth) {
      this.userId = localStorage.getItem('id');
      this.homeService.obtUserData(this.userId).subscribe((data) => {
        this.userImg = data.image;
        this.userEmail = data.email;
        this.userName = data.name;
        console.log(data);
      });
    }
  }

  // BY: Christofer
  public loadProductCart() {
    this.paymentProcessService.getProductsFromCart().subscribe((resp) => {
      const products = resp.data;
      this.menuOptions = this.dropdownIconComp.loadOptionsWithProductsCartResp(
        products
      );
    });
  }

  public loadFavoriteList() {
    this.productService.getFavoriteProducts().subscribe((resp) => {
      // console.log('loadFavoriteList');
      // console.log(resp);
      this.menuOptionsFavorite = this.dropdownIconComp.loadOptionsWithFavoriteProductResp(
        resp
      );
    });
  }
  public deleteProductFromFavorite(data) {
    const idProductFav = data.option.data.productFavorite.id;

    // console.log('idUser');
    // console.log(idUser);

    // console.log('idProductFav');
    // console.log(idProductFav);

    this.productService.removeProductFromFavorite(idProductFav).subscribe(
      (resp) => {
        if (resp.deleted) {
          this.productService
            .getFavoriteProducts()
            .subscribe((favoriteProduct) => {
              this.menuOptionsFavorite = this.dropdownIconComp.loadOptionsWithFavoriteProductResp(
                favoriteProduct
              );
            });

          this.toastRef.open('Producto eliminado de favoritos');
        }
      },
      (error) => {
        console.log(error);
        this.toastRef.open('Producto no eliminado de favoritos');
      }
    );
  }

  public deleteProductFromCart(event: ExtraButtonEmitter) {
    const idProduct = event.option.data.id;

    this.paymentProcessService.deleteProductFromCart(idProduct).subscribe(
      (resp) => {
        this.menuOptions = [];

        if (resp.data) {
          if (resp.data.length > 0) {
            resp.data.forEach((product) => {
              let option;

              option = {
                title: product.name,
                typeEvent: 'routerLink',
                eventValue: ['/panel/shopping-cart'],
                data: product,
              };

              this.menuOptions.push(option);
            });
          }
        }

        this.toastRef.open('Producto eliminado del carrito');
      },
      (error) => {
        this.toastRef.open('Producto eliminado del carrito');
      }
    );
  }

  logout() {
    this.homeService.logout();
    // window.location.reload();
  }

  openDialog(): void {
    const dialogRef = this.modal.open(ModalRegisterComponent, {
      height: 'auto',
      panelClass: 'custom-modalbox',
    });
  }
}
