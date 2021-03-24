import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { BusinessDetailRoutingModule } from './business-detail-routing.module';
import { BusinessDetailComponent } from './business-detail.component';
import { BusinessProductsComponent } from './views/business-products/business-products.component';

@NgModule({
  declarations: [BusinessDetailComponent, BusinessProductsComponent],
  imports: [CommonModule, BusinessDetailRoutingModule, SharedModule],
})
export class BusinessDetailModule {}
