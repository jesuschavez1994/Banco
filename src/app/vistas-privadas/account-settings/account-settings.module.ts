import { NgModule } from '@angular/core';

/* 
  Components 
*/
import { SettingsComponent } from '../account-settings/settings.component';
import { SidebarComponent } from '../account-settings/pages/plans/components/sidebar/sidebar.component';
import { PlanCardComponent } from '../account-settings/pages/plans/components/plan-card/plan-card.component';
import { PlanDetailsComponent } from '../account-settings/pages/plans/components/plan-details/plan-details.component';
import { PaymentDetailsComponent } from '../account-settings/pages/plans/components/payment-details/payment-details.component';
import { PlansComponent } from '../account-settings/pages/plans/plans.component';
import { RedirectionModalComponent } from '../account-settings/pages/plans/components/redirection-modal/redirection-modal.component';

/* 
  Modules 
*/
import { MaterialModule } from '@Angula-Material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AccountSettingsRoutingModule } from './routing/account-settings-routing.module';

const components = [
  SettingsComponent,
  SidebarComponent,
  PlanCardComponent,
  PlanDetailsComponent,
  PaymentDetailsComponent,
  PlansComponent,
  RedirectionModalComponent,
];

const modules = [AccountSettingsRoutingModule, MaterialModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class AccountSettingsModule {}
