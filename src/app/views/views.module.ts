import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './private/shopping-cart/shopping-cart.component';
import { SalesComponent } from './private/sales/sales.component';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { BusinessDetailComponent } from './business-detail/business-detail.component';

const componentsExports = [
  ShoppingCartComponent,
  SalesComponent,
  BusinessDetailComponent,
];

@NgModule({
  declarations: [...componentsExports],
  imports: [CommonModule, PipesModule, SharedModule],
  exports: [...componentsExports],
})
export class ViewsModule {}
