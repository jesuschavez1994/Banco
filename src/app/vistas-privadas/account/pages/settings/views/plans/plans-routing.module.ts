import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { PlansComponent } from './plans.component'
import { PlansShowcaseComponent } from './components/plans-showcase/plans-showcase.component'
import { PlanDetailsComponent } from './components/plan-details/plan-details.component'
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component'

const routes: Routes = [
  {
    path: '',
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlansRoutingModule {}
