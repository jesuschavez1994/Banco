import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { MyAccountComponent } from '../my-account/my-account.component';
import { OrderProcessComponent } from '../order-process/order-process.component';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { PanelComponent } from './panel.component';


@NgModule({
  declarations: [
    PanelComponent,
    MyAccountComponent,
    OrderProcessComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    PipesModule,
    SharedModule,
  ]
})
export class PanelModule { }
