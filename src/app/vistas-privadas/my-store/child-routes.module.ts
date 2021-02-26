import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from './pages/contact/contact.component';
import { ProductLoadingComponent } from '../product-loading/product-loading.component';
import { FormBanckProductSyncComponent } from './pages/sincronizacion/components/form-banck-product-sync/form-banck-product-sync.component';
import { EditProdutcComponent } from '../components/edit-produtc/edit-produtc.component';
import { EditSincronizacionComponent } from './pages/sincronizacion/components/edit-sincronizacion/edit-sincronizacion.component';
import { EditProductNoDisponibleComponent } from '../components/edit-product-no-disponible/edit-product-no-disponible.component';
import { DesincronizarComponent } from './pages/sincronizacion/components/desincronizar/desincronizar.component';

const childRoutes: Routes = [
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'product-catalogue', // Se obtiene el id de la tienda para mostrar su listo productos
    loadChildren: () =>
      import('./pages/load-product/load-product.module').then(
        (module) => module.LoadProductModule
      ),
  },
  {
    path: 'load-product',
    component: ProductLoadingComponent,
    data: { title: 'Cargar producto | Founduss' },
  },
  {
    path: 'sync-this-product/:id',
    component: FormBanckProductSyncComponent,
    data: { title: 'Sincronizar producto | Founduss' },
  },
  {
    path: 'edit-product-sync/:id',
    component: EditSincronizacionComponent,
    data: { title: 'Editar sincronización | Founduss' },
  },
  {
    path: 'desincronizar/:id',
    component: DesincronizarComponent,
  },
  {
    path: 'edit/:id',
    component: EditProdutcComponent,
  },
  {
    path: 'edit-product/:id',
    component: EditProductNoDisponibleComponent,
  },
  {
    path: 'sincronizacion',
    loadChildren: () =>
      import('./pages/sincronizacion/sincronizacion.module').then(
        (module) => module.SincronizacionModule
      ),
  },

  { path: '**', pathMatch: 'full', redirectTo: 'contact' },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
