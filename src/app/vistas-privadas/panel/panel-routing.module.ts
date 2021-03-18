import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel.component';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';
import { EmptyShoppingCartGuard } from '@services/guards/empty-shopping-cart.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'carrito-compras',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'carrito-compras',
        component: ShoppingCartComponent,
        canActivate: [EmptyShoppingCartGuard],
        data: { title: 'Carrito de compras | Founduss' },
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./views/sales/sales.module').then(
            (module) => module.SalesModule
          ),
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