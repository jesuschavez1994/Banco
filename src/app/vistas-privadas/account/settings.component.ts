import { Component, OnInit } from '@angular/core';
import { SidebarMenuOptions } from '../../interfaces/components-options/sidebar-menu.options.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  menuOptions: SidebarMenuOptions[] = [
    {
      label: 'Mi cuenta',
      iconClass: 'fas fa-cog',
      routerLink: ['/account/form-account'],
      // isActive: false,
    },
    {
      label: 'planes',
      iconClass: 'fas fa-handshake',
      routerLink: ['/account/settings/plans/choose-plan'],
      // isActive: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
