import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SettingsComponent } from './settings.component'

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/account-settings.module').then(
            (module) => module.AccountSettingsModule
          ),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
