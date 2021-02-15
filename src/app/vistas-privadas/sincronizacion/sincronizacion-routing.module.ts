import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* 
  Components used in the routes.
*/
import { BankProductComponent } from './pages/bank-product/bank-product.component';
import { ExportarListaExcelComponent } from './pages/exportar-lista-excel/exportar-lista-excel.component';
import { SuggestedProductsComponent } from './pages/suggested-products/suggested-products.component';
import { SincronizacionViewsComponent } from './components/sincronizacion-views/sincronizacion-views.component';
import { SynchronizedProductsComponent } from './pages/synchronized-products/synchronized-products.component';

const routes: Routes = [
  {
    path: '',
    component: SincronizacionViewsComponent,
    children: [
      {
        path: 'exportar-lista-excel',
        component: ExportarListaExcelComponent,
      },
      {
        path: 'suggested-products',
        component: SuggestedProductsComponent,
      },
      {
        path: 'suggested-products-list/:id/:list',
        component: SuggestedProductsComponent,
      },
      {
        path: 'synchronized-products',
        component: SynchronizedProductsComponent,
      },
      {
        path: 'bank-product',
        component: BankProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SincronizacionRoutingModule {}
