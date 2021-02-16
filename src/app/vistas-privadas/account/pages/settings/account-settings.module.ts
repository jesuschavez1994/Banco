import { NgModule } from '@angular/core'
/*
  Components
*/
import { AccountComponent } from './views/my-account/account.component'
import { SettingsComponent } from './settings.component'
import { SidebarComponent } from './views/plans/components/sidebar/sidebar.component'
/*
  Modules
*/
import { AccountSettingsRoutingModule } from './account-settings-routing.module'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'

const components = [AccountComponent, SidebarComponent, SettingsComponent]

const modules = [AccountSettingsRoutingModule, FormsModule, SharedModule]

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class AccountSettingsModule {}
