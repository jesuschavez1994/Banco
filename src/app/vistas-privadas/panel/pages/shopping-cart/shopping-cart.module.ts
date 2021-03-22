import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';

import { ShoppingCartComponent } from './shopping-cart.component';
import { CartComponent } from './views/cart/cart.component';
import { PaymentComponent } from './views/payment/payment.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { VoucherComponent } from './views/voucher/voucher.component';

const modules = [ShoppingCartRoutingModule, SharedModule];

const components = [
  ShoppingCartComponent,
  CartComponent,
  PaymentComponent,
  PaymentFormComponent,
  VoucherComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class ShoppingCartModule {}
