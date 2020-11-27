import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  // @ViewChild('menuContainerFixed') menuContainerFixed: ElementRef;
  // @ViewChild('configurationMenu') configurationMenu: ElementRef;

  constructor() {

  }

  ngOnInit(): void {

  }

  // @HostListener('window:scroll', ['$event'])
  // public activateMenu( $event: Event){

  //   const menuContainerFixed = this.menuContainerFixed.nativeElement;
  //   const pxTopElement = menuContainerFixed.offsetTop;
  //   const pxTopDocument = document.documentElement.scrollTop;

  //   if ( pxTopDocument > pxTopElement ) {
  //     menuContainerFixed.classList.add( 'responsive-menu-container--fixed' );
  //   } else {
  //     menuContainerFixed.classList.remove( 'responsive-menu-container--fixed' );
  //   }

  // }

  // public toggleMenu(){
  //   this.configurationMenu.nativeElement.classList.toggle( 'configuration-menu--responsive-expanded' );
  // }

}
