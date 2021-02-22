import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
/* 
  Components used in the routes.
*/
import { BankProductComponent } from './pages/bank-product/bank-product.component'
import { ExportarListaExcelComponent } from './pages/exportar-lista-excel/exportar-lista-excel.component'
import { SuggestedProductsComponent } from './pages/suggested-products/suggested-products.component'
import { SincronizacionViewsComponent } from './components/sincronizacion-views/sincronizacion-views.component'
import { SynchronizedProductsComponent } from './pages/synchronized-products/synchronized-products.component'

const routes: Routes = [
  {
    path: '',
    component: SincronizacionViewsComponent,
    children: [
      {
        path: 'exportar-lista-excel',
        data: { title: 'Exportar Excel | Founduss' },
        component: ExportarListaExcelComponent,
        data: { title: 'Founduss | Stock de productos' } 
      },
      {
        path: 'suggested-products',
        data: { title: 'Productos sugeridos | Founduss' },
        component: SuggestedProductsComponent,
        data: { title: 'Founduss | Productos sugeridos' } 
      },
      {
        path: 'suggested-products-list/:id/:list',
        component: SuggestedProductsComponent,
      },
      {
        path: 'synchronized-products',
        data: { title: 'Sincronizaciones | Founduss' },
        component: SynchronizedProductsComponent,
        data: { title: 'Founduss | Productos sincronizados' } 
      },
      {
        path: 'bank-product',
        data: { title: 'Banco de productos | Founduss' },
        component: BankProductComponent,
        data: { title: 'Founduss | Banco de productos' } 
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SincronizacionRoutingModule {}
