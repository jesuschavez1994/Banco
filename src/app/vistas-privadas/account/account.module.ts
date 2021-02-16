import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'

import { AccountRoutingModule } from './account-routing.module'
import { SettingsComponent } from './settings.component'

const components = [SettingsComponent]

const modules = [AccountRoutingModule, SharedModule]

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class AccountModule {}
