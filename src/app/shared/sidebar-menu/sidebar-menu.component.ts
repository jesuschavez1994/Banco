import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { SidebarMenuOptions } from '@interfaces/components-options/sidebar-menu.options.interface';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  @ViewChild('menuContainerFixed') menuContainerFixed: ElementRef;
  @ViewChild('configurationMenu') configurationMenu: ElementRef;

  @Input() menuOptions: SidebarMenuOptions[];

  constructor() {

  }

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
