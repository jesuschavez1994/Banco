import { NgModule } from '@angular/core';

import { SincronizacionRoutingModule } from './sincronizacion-routing.module';
import { SharedModule } from '@shared/shared.module';
import { VistasPrivadasSharedModule } from '../shared/vistas-privadas-shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SuggestedProductsModule } from './pages/suggested-products/suggested-products.module';

import { BankProductComponent } from './pages/bank-product/bank-product.component';
import { DesincronizarComponent } from './components/desincronizar/desincronizar.component';
import { EditSincronizacionComponent } from './components/edit-sincronizacion/edit-sincronizacion.component';
import { ExportarListaExcelComponent } from './pages/exportar-lista-excel/exportar-lista-excel.component';
import { FormBanckProductSyncComponent } from './components/form-banck-product-sync/form-banck-product-sync.component';
import { SearchModule } from './components/search/search.module';
import { SuggestedProductsComponent } from './pages/suggested-products/suggested-products.component';
import { SincronizacionViewsComponent } from './components/sincronizacion-views/sincronizacion-views.component';
import { SynchronizedProductsComponent } from './pages/synchronized-products/synchronized-products.component';
/* 
  Components go here.
*/
const components = [
  BankProductComponent,
  DesincronizarComponent,
  EditSincronizacionComponent,
  ExportarListaExcelComponent,
  FormBanckProductSyncComponent,
  SincronizacionViewsComponent,
  SynchronizedProductsComponent,
];
/* 
  Modules go here.
*/
const modules = [
  NgxSpinnerModule,
  SincronizacionRoutingModule,
  SearchModule,
  SharedModule,
  SuggestedProductsModule,
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
