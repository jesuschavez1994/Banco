import { Component, OnInit } from '@angular/core';
import { SidebarMenuOptions } from '@interfaces/components-options/sidebar-menu.option.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  orders = [
    {
      id: 1,
      business: {
        name: 'farmacia santa isabel',
        img: './assets/img/avatar.svg',
      },
      products: [''],
      hasPaid: false,
      countProduct: 25,
      totalToPay: 235.21,
    },
    {
      id: 1,
      business: {
        name: 'farmacia santa isabel',
        img: './assets/img/avatar.svg',
      },
      products: [''],
      hasPaid: true,
      countProduct: 25,
      totalToPay: 235.21,
    }
  ];

  tabSelected: 1 | 2 = 1;

  orderSelected = this.orders[0];

  menuOptions: SidebarMenuOptions[] = [
    {
      label: 'mi cuenta',
      iconClass: 'fas fa-user',
      routerLink: ['#'],
      // isActive: false,
    },
    {
      label: 'carrito de comprus',
      iconClass: 'fas fa-user',
      routerLink: ['#'],
      // isActive: false,
    },
  ];

  constructor() {

  }

  ngOnInit(): void {

  }

  public filterByTab(tabNumber){
    this.tabSelected = tabNumber;
  }

  public selectOrder(order){
    this.orderSelected = order;
  }

}
