import { NgModule } from '@angular/core';
import { PanelRoutingModule } from './panel-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';

import { PanelComponent } from './panel.component';
import { ShoppingCartComponent } from './views/shopping-cart/shopping-cart.component';
// import { MyAccountComponent } from '../../views/my-account/my-account.component';

const modules = [PanelRoutingModule, PipesModule, SharedModule];

const components = [
  PanelComponent,
  // MyAccountComponent,
  ShoppingCartComponent,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class PanelModule {}