import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { UsuarioService } from "@services/usuario/usuario.service";
import { HomeServiceService } from "../../vistas-publicas/services/home-service.service";
import {ModalRegisterComponent} from '@shared/modal-register/modal-register.component';
import {MatDialog, MatDialogRef ,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownOption, ClassIcon, ExtraButtonEmitter } from '@interfaces/components-options/dropdown.options.interface';

@Component({
  selector: 'app-sidebar-home',
  templateUrl: './sidebar-home.component.html',
  styleUrls: ['./sidebar-home.component.scss']
})
export class SidebarHomeComponent implements OnInit {
 @ViewChild('menuContainerFixed') menuContainerFixed: ElementRef;
 @ViewChild('configurationMenu') configurationMenu: ElementRef;
 @Input() auth: boolean;
 @Input() storeAct: boolean | string;

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
  constructor( public authService: StoreService,
                public userService: UsuarioService,
                public homeService: HomeServiceService,
                private modal : MatDialog) { }

  ngOnInit(): void {
    this.imgUser();
}
  @HostListener('window:scroll', ['$event'])
  public fixedMenu( $event: Event){

    const menuContainerFixed = this.menuContainerFixed.nativeElement;
    const pxTopElement = menuContainerFixed.offsetTop;
    const pxTopDocument = document.documentElement.scrollTop;

    if ( pxTopDocument > pxTopElement ) {
      menuContainerFixed.classList.add( 'responsive-menu-container--fixed' );
    } else {
      menuContainerFixed.classList.remove( 'responsive-menu-container--fixed' );
    }

  } 

  public toggleMenu(){
    this.configurationMenu.nativeElement.classList.toggle( 'configuration-menu--responsive-expanded' );
  }
  imgUser(){
    if(this.auth){
      this.userId= localStorage.getItem('id');
      this.homeService.obtUserData(this.userId).subscribe(
        data=>{

           this.userImg=data.image;
           this.userEmail= data.email;
           this.userName= data.name;
          console.log(data);
        }
      );
    }
  }
  logout(){
    this.homeService.logout();
    // window.location.reload();
  }
  
  openDialog(): void {
    const dialogRef = this.modal.open(ModalRegisterComponent,{ height: 'auto', panelClass: 'custom-modalbox'} );
  }
}
