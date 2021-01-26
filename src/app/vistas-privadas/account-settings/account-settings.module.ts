import { NgModule } from '@angular/core';
<<<<<<< HEAD

/* 
  Components 
*/
import { SettingsComponent } from '../account-settings/settings.component';
import { SidebarComponent } from '../account-settings/pages/plans/components/sidebar/sidebar.component';
=======
import { CommonModule } from '@angular/common';
/* 
  Components
*/
>>>>>>> origin/feature/settings-page
import { PlanCardComponent } from '../account-settings/pages/plans/components/plan-card/plan-card.component';
import { PlanDetailsComponent } from '../account-settings/pages/plans/components/plan-details/plan-details.component';
import { PaymentDetailsComponent } from '../account-settings/pages/plans/components/payment-details/payment-details.component';
import { PlansComponent } from '../account-settings/pages/plans/plans.component';
import { RedirectionModalComponent } from '../account-settings/pages/plans/components/redirection-modal/redirection-modal.component';
<<<<<<< HEAD

/* 
  Modules 
*/
import { MaterialModule } from '@Angula-Material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AccountSettingsRoutingModule } from './routing/account-settings-routing.module';

const components = [
  SettingsComponent,
  SidebarComponent,
=======
import { SettingsComponent } from '../account-settings/settings.component';
import { SidebarComponent } from '../account-settings/pages/plans/components/sidebar/sidebar.component';
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
>>>>>>> origin/feature/settings-page
  PlanCardComponent,
  PlanDetailsComponent,
  PaymentDetailsComponent,
  PlansComponent,
<<<<<<< HEAD
  RedirectionModalComponent,
];

const modules = [AccountSettingsRoutingModule, MaterialModule, SharedModule];

@NgModule({
=======
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
>>>>>>> origin/feature/settings-page
  declarations: [...components],
  imports: [...modules],
})
export class AccountSettingsModule {}
