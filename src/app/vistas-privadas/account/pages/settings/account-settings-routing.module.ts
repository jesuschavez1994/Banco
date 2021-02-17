import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AccountComponent } from './views/my-account/account.component'
import { PlansComponent } from './views/plans/plans.component'
import { PlansShowcaseComponent } from './views/plans/components/plans-showcase/plans-showcase.component'
import { PlanDetailsComponent } from './views/plans/components/plan-details/plan-details.component'
import { PaymentDetailsComponent } from './views/plans/components/payment-details/payment-details.component'
import { SettingsComponent } from './settings.component'

const routes: Routes = [
  {
    path: 'plans',
    loadChildren: () =>
      import('./views/plans/plans.module').then((module) => module.PlansModule),
  },
  {
    path: 'form-account',
    component: AccountComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingsRoutingModule {}
