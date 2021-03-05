import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessDetailRoutingModule } from './business-detail-routing.module';
import { BusinessDetailComponent } from './business-detail.component';


@NgModule({
  declarations: [BusinessDetailComponent],
  imports: [
    CommonModule,
    BusinessDetailRoutingModule
  ]
})
export class BusinessDetailModule { }
