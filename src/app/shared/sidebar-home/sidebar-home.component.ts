import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar-home',
  templateUrl: './sidebar-home.component.html',
  styleUrls: ['./sidebar-home.component.scss']
})
export class SidebarHomeComponent implements OnInit {
 @ViewChild('menuContainerFixed') menuContainerFixed: ElementRef;
 @ViewChild('configurationMenu') configurationMenu: ElementRef;

        auth = false;
  constructor() { }

  ngOnInit(): void {
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

}
