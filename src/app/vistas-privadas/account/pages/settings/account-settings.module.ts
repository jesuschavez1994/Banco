import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*
  Components
*/
import { PlanCardComponent } from './views/plans/components/plan-card/plan-card.component';
import { PlanDetailsComponent } from './views/plans/components/plan-details/plan-details.component';
import { PaymentDetailsComponent } from './views/plans/components/payment-details/payment-details.component';
import { PlansComponent } from './views/plans/plans.component';
import { RedirectionModalComponent } from './views/plans/components/redirection-modal/redirection-modal.component';
import { SettingsComponent } from './settings.component';
import { SidebarComponent } from './views/plans/components/sidebar/sidebar.component';
/*
  Modules
*/
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@Angula-Material/material.module';
import { SharedModule } from '@shared/shared.module';

const components = [
  SidebarComponent,
  SettingsComponent,
  PlanCardComponent,
  PlanDetailsComponent,
  PaymentDetailsComponent,
  PlansComponent,
  RedirectionModalComponent,
];

const modules = [
  AccountSettingsRoutingModule,
  CommonModule,
  FormsModule,
  MaterialModule,
  SharedModule,
];

@NgModule({
  entryComponents: [RedirectionModalComponent],
  declarations: [...components],
  imports: [...modules],
})
export class AccountSettingsModule {}
