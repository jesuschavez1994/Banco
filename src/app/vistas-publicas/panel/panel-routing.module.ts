import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { MyAccountComponent } from '../my-account/my-account.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'carrito-compras',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'carrito-compras',
        component: ShoppingCartComponent,
      },
      {
        path: 'cuenta',
        component: MyAccountComponent,
      },
      {path: '**', pathMatch: 'full', redirectTo: 'carrito-compras'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
