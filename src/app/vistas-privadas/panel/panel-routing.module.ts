import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { EmptyShoppingCartGuard } from '@services/guards/empty-shopping-cart.guard';
import { VerifyTokenGuard } from '@services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shopping-cart',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'shopping-cart',
        loadChildren: () =>
          import('./pages/shopping-cart/shopping-cart.module').then(
            (module) => module.ShoppingCartModule
          ),
        canActivate: [VerifyTokenGuard],
        // component: ShoppingCartComponent,
        // canActivate: [EmptyShoppingCartGuard],
        // data: { title: 'Carrito de compras | Founduss' },
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./pages/sales/sales.module').then(
            (module) => module.SalesModule
          ),
        canActivate: [VerifyTokenGuard],
      },
      { path: '**', pathMatch: 'full', redirectTo: 'shopping-cart' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelRoutingModule {}
