import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

import { PanelComponent } from './panel.component';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';
import { SalesComponent } from './views/sales/sales.component';
// import { MyAccountComponent } from '../../views/my-account/my-account.component';

const modules = [CommonModule, PanelRoutingModule, PipesModule, SharedModule];

const components = [
  PanelComponent,
  // MyAccountComponent,
  ShoppingCartComponent,
  SalesComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class PanelModule {}
