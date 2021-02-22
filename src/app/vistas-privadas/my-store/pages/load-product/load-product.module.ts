import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadProductRoutingModule } from './load-product-routing.module';
import { SharedModule } from '@shared/shared.module'
import { VistasPrivadasSharedModule } from '../../../shared/vistas-privadas-shared.module'
import {SearchModule} from '../../pages/sincronizacion/components/search/search.module'

import { LoadProductComponent } from './load-product.component'
/* 
  Components go here.
*/
const components = [
 LoadProductComponent
]
/* 
  Modules go here.
*/
const modules = [
  LoadProductRoutingModule,
  SharedModule ,
  SearchModule,
  VistasPrivadasSharedModule
]
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = []

@NgModule({
  declarations: [...components],
  imports: [
    ...modules
  
  ]
})
export class LoadProductModule { }
