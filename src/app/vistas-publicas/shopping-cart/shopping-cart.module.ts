import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [
    ShoppingCartComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    SharedModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule { }
