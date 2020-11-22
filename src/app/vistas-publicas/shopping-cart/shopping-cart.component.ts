import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @ViewChild('menuContainerFixed') menuContainerFixed: ElementRef;

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    console.warn('<!-- Component Code --!>');

    console.warn('<!-- End Component Code --!>');

  }

  @HostListener('window:scroll', ['$event'])
  public activateMenu( $event: Event){

    const menuContainerFixed = this.menuContainerFixed.nativeElement;
    const pxTopElement = menuContainerFixed.offsetTop;
    const pxTopDocument = document.documentElement.scrollTop;

    console.log(pxTopElement);

    console.log('target');
    console.log(pxTopDocument);

    if ( pxTopDocument > pxTopElement ) {
      menuContainerFixed.classList.add( 'responsive-menu-container--fixed' );
    } else {
      menuContainerFixed.classList.remove( 'responsive-menu-container--fixed' );
    }


    // if($event.srcElement.children[0].scrollTop){


    // }

  }

}
