import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './views/my-account/account.component';
import { PlansComponent } from './views/plans/plans.component';
import { PlansShowcaseComponent } from './views/plans/components/plans-showcase/plans-showcase.component';
import { PlanDetailsComponent } from './views/plans/components/plan-details/plan-details.component';
import { PaymentDetailsComponent } from './views/plans/components/payment-details/payment-details.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'plans',
        component: PlansComponent,
        data: { title: 'Founduss | Planes' },
        children: [
          {
            path: 'choose-plan',
            component: PlansShowcaseComponent,
            data: { animation: 'isLeft', title: 'Founduss | Planes' },
          },
          {
            path: 'plan-details',
            component: PlanDetailsComponent,
            data: { animation: 'isLeft', title: 'Founduss | Planes' },
          },
          {
            path: 'voucher',
            component: PaymentDetailsComponent,
            data: { animation: 'isLeft', title: 'Founduss | Planes' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSettingsRoutingModule {}
