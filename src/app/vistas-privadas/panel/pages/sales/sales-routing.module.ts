import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales.component';
import { SalesDetailsComponent } from './views/sales-details/sales-details.component';
import { DeliveriesComponent } from './views/deliveries/deliveries.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sales-details' },
  {
    path: '',
    component: SalesComponent,
    data: { title: 'Ventas | Founduss' },
    children: [
      {
        path: 'sales-details',
        component: SalesDetailsComponent,
        data: { title: 'Detalles de ventas | Founduss' },
      },
      {
        path: 'deliveries',
        component: DeliveriesComponent,
        data: { title: 'Deliveries | Founduss' },
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'sales-details' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
