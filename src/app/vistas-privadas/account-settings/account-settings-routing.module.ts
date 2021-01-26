import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlansComponent } from '../account-settings/pages/plans/plans.component';
import { SettingsComponent } from '../account-settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'plans',
        component: PlansComponent,
        data: { title: 'Founduss | Plans' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingsRoutingModule {}
