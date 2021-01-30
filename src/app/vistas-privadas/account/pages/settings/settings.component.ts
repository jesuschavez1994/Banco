import { Component, OnInit } from '@angular/core';
import { SidebarMenuOptions } from '@interfaces/components-options/sidebar-menu.option.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  menuOptions: SidebarMenuOptions[] = [
    {
      label: 'Configuración',
      iconClass: 'fas fa-cog',
      routerLink: ['/account'],
      // isActive: false,
    },
    {
      label: 'planes',
      iconClass: 'fas fa-handshake',
      routerLink: ['/settings/plans'],
      // isActive: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
