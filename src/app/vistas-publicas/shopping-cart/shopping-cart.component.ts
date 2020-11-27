import { Component, OnInit } from '@angular/core';
import { SidebarMenuOptions } from '@interfaces/componentsOptions/sidebar-menu.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  menuOptions: SidebarMenuOptions[] = [
    {
      label: 'mi cuenta',
      iconClass: 'fas fa-user',
      routerLink: '#',
      isActive: false,
    },
    {
      label: 'carrito de comprus',
      iconClass: 'fas fa-user',
      routerLink: '#',
      isActive: false,
    },
    {
      label: 'carrito de compras',
      iconClass: 'fas fa-user',
      routerLink: '#',
      isActive: false,
    },
    {
      label: 'carrito de compras',
      iconClass: 'fas fa-user',
      routerLink: '#',
      isActive: true,
    },
    {
      label: 'carrito de compras',
      iconClass: 'fas fa-user',
      routerLink: '#',
      isActive: false,
    }
  ];


  constructor() {

  }

  ngOnInit(): void {

  }



}
