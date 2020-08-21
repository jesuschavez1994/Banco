import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormAccountComponent } from './form-account/form-account.component';




@NgModule({
    declarations: [DashboardComponent, FormAccountComponent],
    imports: [CommonModule, SharedModule],

    exports: []
  })
  export class PrivateviewModule { }
