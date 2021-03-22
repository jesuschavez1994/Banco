import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingCartComponent } from './shopping-cart.component';
import { CartComponent } from './views/cart/cart.component';
import { PaymentComponent } from './views/payment/payment.component';
import { VoucherComponent } from './views/voucher/voucher.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shopping-cart',
  },
  {
    path: '',
    component: ShoppingCartComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
        data: { title: 'Carrito de compras | Founduss' },
      },
      {
        path: 'payment-process',
        component: PaymentComponent,
        data: { title: 'Proceso de pago | Founduss' },
      },
      {
        path: 'voucher',
        component: VoucherComponent,
        data: { title: 'Comprobante de pago | Founduss' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
