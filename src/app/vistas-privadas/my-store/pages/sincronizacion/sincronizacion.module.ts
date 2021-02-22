import { NgModule } from '@angular/core';

import { SincronizacionRoutingModule } from './sincronizacion-routing.module';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../../../shared/vistas-privadas-shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BankProductModule } from './pages/bank-product/bank-product.module';
import { ExportarListaExcelModule } from './pages/exportar-lista-excel/exportar-lista-excel.module';
import { SearchModule } from './components/search/search.module';
import { SuggestedProductsModule } from './pages/suggested-products/suggested-products.module';
import { SynchronizedProductsModule } from './pages/synchronized-products/synchronized-products.module';
import { SincronizacionViewsComponent } from './components/sincronizacion-views/sincronizacion-views.component';
import { DesincronizarComponent } from './components/desincronizar/desincronizar.component';
import { EditSincronizacionComponent } from './components/edit-sincronizacion/edit-sincronizacion.component';
import { FormBanckProductSyncComponent } from './components/form-banck-product-sync/form-banck-product-sync.component';
/* 
  Components go here.
*/
const components = [
  DesincronizarComponent,
  EditSincronizacionComponent,
  FormBanckProductSyncComponent,
  SincronizacionViewsComponent,
];
/* 
  Modules go here.
*/
const modules = [
  BankProductModule,
  ExportarListaExcelModule,
  NgxSpinnerModule,
  SincronizacionRoutingModule,
  SearchModule,
  SharedModule,
  SuggestedProductsModule,
  SynchronizedProductsModule,
  VistasPrivadasSharedModule,
];
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
