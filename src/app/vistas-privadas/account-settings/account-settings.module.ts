import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* 
  Components
*/
import { PlanCardComponent } from '../account-settings/pages/plans/components/plan-card/plan-card.component';
import { PlanDetailsComponent } from '../account-settings/pages/plans/components/plan-details/plan-details.component';
import { PaymentDetailsComponent } from '../account-settings/pages/plans/components/payment-details/payment-details.component';
import { PlansComponent } from '../account-settings/pages/plans/plans.component';
import { RedirectionModalComponent } from '../account-settings/pages/plans/components/redirection-modal/redirection-modal.component';
import { SettingsComponent } from '../account-settings/settings.component';
import { SidebarComponent } from '../account-settings/pages/plans/components/sidebar/sidebar.component';
/* 
  Modules
*/
import { AccountSettingsRoutingModule } from './account-settings-routing.module';

const components = [
  SidebarComponent,
  SettingsComponent,
  PlanCardComponent,
  PlanDetailsComponent,
  PaymentDetailsComponent,
  PlansComponent,
];

const modules = [AccountSettingsRoutingModule, CommonModule];

@NgModule({
  entryComponents: [RedirectionModalComponent],
  declarations: [...components],
  imports: [...modules],
})
export class AccountSettingsModule {}
