import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { MyAccountComponent } from '../my-account/my-account.component';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { PanelComponent } from './panel.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { SalesComponent } from '../sales/sales.component';


@NgModule({
  declarations: [
    PanelComponent,
    MyAccountComponent,
    ShoppingCartComponent,
    SalesComponent,
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    PipesModule,
    SharedModule,
  ]
})
export class PanelModule { }
