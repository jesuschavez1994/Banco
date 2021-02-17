import { NgModule } from '@angular/core'

import { HomeRoutingModule } from './home-routing.module'
import { SharedModule } from '../Module.index'

import { HomeComponent } from './home.component'
import { SliderCategoryComponent } from './slider-category/slider-category.component'
/* 
  Components go here.
*/
const components = [HomeComponent, SliderCategoryComponent]
/* 
  Modules go here.
*/
const modules = [HomeRoutingModule, SharedModule]

@NgModule({
  declarations: [...components],
  imports: [...modules],
})
export class HomeModule {}
