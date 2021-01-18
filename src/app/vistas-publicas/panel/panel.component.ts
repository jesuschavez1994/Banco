import { Component, OnInit } from '@angular/core';
import { SidebarMenuOptions } from '@interfaces/components-options/sidebar-menu.options.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  menuOptions: SidebarMenuOptions[] = [
    {
      label: 'mi cuenta',
      iconClass: 'fas fa-user',
      routerLink: ['cuenta'],
      // isActive: false,
    },
    {
      label: 'carrito de compras',
      iconClass: 'fas fa-user',
      routerLink: ['carrito-compras'],
      // isActive: false,
    },
    {
      label: 'ventas',
      iconClass: 'fas fa-user',
      routerLink: ['ventas'],
      // isActive: false,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
