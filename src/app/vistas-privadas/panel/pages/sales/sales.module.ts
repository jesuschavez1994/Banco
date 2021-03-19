import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SalesRoutingModule } from './sales-routing.module';

import { SalesComponent } from './sales.component';
import { SalesDetailsComponent } from './views/sales-details/sales-details.component';
import { DeliveriesComponent } from './views/deliveries/deliveries.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { SkeletonListComponent } from './components/skeleton-screens/skeleton-list/skeleton-list.component';
import { SkeletonDetailsComponent } from './components/skeleton-screens/skeleton-details/skeleton-details.component';

const modules = [SharedModule, SalesRoutingModule];

const components = [DeliveriesComponent, SalesComponent, SalesDetailsComponent];

@NgModule({
  declarations: [...components, OrdersListComponent, OrderDetailsComponent, SkeletonListComponent, SkeletonDetailsComponent],
  imports: [...modules],
})
export class SalesModule {}
