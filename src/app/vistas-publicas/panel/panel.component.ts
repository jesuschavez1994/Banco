import { Component, OnInit } from '@angular/core';
import { SidebarMenuOptions } from '@interfaces/components-options/sidebar-menu.options.interface';
import {HomeServiceService} from '../services/home-service.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  userLog: boolean;
  storeLog: boolean | string;
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
      iconClass: 'fab fa-sellsy',
      routerLink: ['ventas'],
      // isActive: false,
    },
  ];

  constructor(private homeService: HomeServiceService,) { }

  ngOnInit(): void {
    this.userLog = this.homeService.islog();
    this.storeLog= this.homeService.storeActive();
  }

}
