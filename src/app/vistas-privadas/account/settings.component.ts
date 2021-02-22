import { Component, OnInit } from '@angular/core'
import { SidebarMenuOptions } from '@interfaces/components-options/sidebar-menu.options.interface'
import { HomeServiceService } from '../../vistas-publicas/services/home-service.service'
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  userLog = false

  menuOptions: SidebarMenuOptions[] = [
    {
      label: 'Mi cuenta',
      iconClass: 'fas fa-cog',
      routerLink: ['/account/settings/form-account'],
      // isActive: false,
    },
    {
      label: 'Planes',
      iconClass: 'fas fa-handshake',
      routerLink: ['/account/settings/plans/choose-plan'],
      // isActive: false,
    },
  ]

  constructor(private homeService: HomeServiceService) {}

  ngOnInit(): void {
    this.userLog = this.homeService.islog()
  }
}
