import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../../../shared/vistas-privadas-shared.module';

import { DialogSynchronizedComponent } from './container/dialog-synchronized/dialog-synchronized.component';
import { NoSynchronizedProductsComponent } from './container/no-synchronized-products/no-synchronized-products.component';
import { SynchronizedProductsComponent } from './synchronized-products.component';
import { SynchronizedProductsTableComponent } from './container/synchronized-products-table/synchronized-products-table.component';
import { TableroDeSincronizacionComponent } from './container/tablero-de-sincronizacion/tablero-de-sincronizacion.component';
/* 
  Components go here.
*/
const components = [
  DialogSynchronizedComponent,
  NoSynchronizedProductsComponent,
  SynchronizedProductsComponent,
  SynchronizedProductsTableComponent,
  TableroDeSincronizacionComponent,
];
/* 
  Modules go here.
*/
const modules = [SharedModule, VistasPrivadasSharedModule];
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = [];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components],
})
export class SynchronizedProductsModule {}
