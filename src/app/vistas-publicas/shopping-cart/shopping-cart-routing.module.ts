import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { HomeComponent } from '../home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'carrito-compras',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ShoppingCartComponent,
    children: [
      {
        path: 'carrito-compras',
        component: HomeComponent,
      },
      {path: '**', pathMatch: 'full', redirectTo: 'carrito-compras'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
