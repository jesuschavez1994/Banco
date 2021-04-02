import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';

import { ShoppingCartComponent } from './shopping-cart.component';
import { CartComponent } from './views/cart/cart.component';
import { PaymentComponent } from './views/payment/payment.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { VoucherComponent } from './views/voucher/voucher.component';
import { SkeletonListComponent } from './components/skeleton/skeleton-list/skeleton-list.component';
import { SkeletonEditorComponent } from './components/skeleton/skeleton-editor/skeleton-editor.component';

const modules = [ShoppingCartRoutingModule, SharedModule];

const components = [
  ShoppingCartComponent,
  CartComponent,
  PaymentComponent,
  PaymentFormComponent,
  VoucherComponent,
  SkeletonListComponent,
  SkeletonEditorComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class ShoppingCartModule {}
