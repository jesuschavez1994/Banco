import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessProductsComponent } from './public/business-products/business-products.component';
import { MyAccountComponent } from './private/my-account/my-account.component';
import { ShoppingCartComponent } from './private/shopping-cart/shopping-cart.component';
import { SalesComponent } from './private/sales/sales.component';
import { BusinessContactComponent } from './public/business-contact/business-contact.component';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { BusinessDetailComponent } from './business-detail/business-detail.component';

const componentsExports = [
  BusinessProductsComponent,
  MyAccountComponent,
  ShoppingCartComponent,
  SalesComponent,
  BusinessContactComponent,
  BusinessDetailComponent,
];

@NgModule({
  declarations: [
    ...componentsExports,
  ],
  imports: [
    CommonModule,
    PipesModule,
    SharedModule,
  ],
  exports: [
    ...componentsExports,
  ]
})
export class ViewsModule { }
