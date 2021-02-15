import { NgModule } from '@angular/core';

import { MyStoreRoutingModule } from './my-store-routing.module';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../shared/vistas-privadas-shared.module';

import { MyStoreComponent } from './my-store.component';
/* 
  Components go here.
*/
const components = [MyStoreComponent];
/* 
  Modules go here.
*/
const modules = [
  MyStoreRoutingModule,
  SharedModule,
  VistasPrivadasSharedModule,
];
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = [];
@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [],
})
export class MyStoreModule {}
