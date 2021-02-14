import { NgModule } from '@angular/core';

import { SincronizacionRoutingModule } from './sincronizacion-routing.module';
import { SharedModule } from '@shared/shared.module';

import { BankProductComponent } from './pages/bank-product/bank-product.component';
import { ExportarListaExcelComponent } from './pages/exportar-lista-excel/exportar-lista-excel.component';
import { SuggestedProductsComponent } from './pages/suggested-products/suggested-products.component';
import { SincronizacionViewsComponent } from './components/sincronizacion-views/sincronizacion-views.component';
import { SynchronizedProductsComponent } from './pages/synchronized-products/synchronized-products.component';
/* 
  Components go here.
*/
const components = [
  BankProductComponent,
  ExportarListaExcelComponent,
  SuggestedProductsComponent,
  SincronizacionViewsComponent,
  SynchronizedProductsComponent,
];
/* 
  Modules go here.
*/
const modules = [SincronizacionRoutingModule, SharedModule];
/* 
  If need that this module exports something, put those modules/components here.
*/
const exportStuff = [];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...exportStuff],
})
export class SincronizacionModule {}
