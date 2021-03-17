import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';

import { SalesComponent } from './sales.component';
import { SalesDetailsComponent } from './views/sales-details/sales-details.component';
import { DeliveriesComponent } from './views/deliveries/deliveries.component';

const modules = [SharedModule, SalesRoutingModule];

const components = [DeliveriesComponent, SalesComponent, SalesDetailsComponent];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class SalesModule {}
