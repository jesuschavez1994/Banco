import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { OrderProcessComponent } from '../order-process/order-process.component';
import { MyAccountComponent } from '../my-account/my-account.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'proceso-compra',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'proceso-compra',
        component: OrderProcessComponent,
      },
      {
        path: 'cuenta',
        component: MyAccountComponent,
      },
      {path: '**', pathMatch: 'full', redirectTo: 'proceso-compra'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
