import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { MyAccountComponent } from '../../views/private/my-account/my-account.component';
import { ShoppingCartComponent } from '../../views/private/shopping-cart/shopping-cart.component';
import { SalesComponent } from '../../views/private/sales/sales.component';
import { EmptyShoppingCartGuard } from '@services/guards/empty-shopping-cart.guard';


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
        canActivate: [EmptyShoppingCartGuard]
      },
      {
        path: 'cuenta',
        component: MyAccountComponent,
      },
      {
        path: 'ventas',
        component: SalesComponent,
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
