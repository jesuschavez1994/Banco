import { NgModule } from '@angular/core'

import { PlanCardComponent } from './components/plan-card/plan-card.component'
import { PlanDetailsComponent } from './components/plan-details/plan-details.component'
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component'
import { PlansComponent } from './plans.component'
import { PlansShowcaseComponent } from './components/plans-showcase/plans-showcase.component'
import { RedirectionModalComponent } from './components/redirection-modal/redirection-modal.component'

import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { PlansRoutingModule } from './plans-routing.module'

const components = [
  PlanCardComponent,
  PlanDetailsComponent,
  PaymentDetailsComponent,
  PlansComponent,
  PlansShowcaseComponent,
  RedirectionModalComponent,
]

const modules = [PlansRoutingModule, FormsModule, SharedModule]

@NgModule({
  entryComponents: [RedirectionModalComponent],
  declarations: [...components],
  imports: [...modules],
})
export class PlansModule {}
