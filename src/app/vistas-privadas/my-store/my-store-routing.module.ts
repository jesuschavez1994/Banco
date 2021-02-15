import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* 
  Services
*/
import { LoginGuardGuard } from '@services/guards/login-guard.guard';
import { VerifyTokenGuard } from '@services/guards/verify-token.guard';
/* 
  Components used in the views.
*/
import { ContactComponent } from '../contact/contact.component';
import { ProductLoadingComponent } from '../product-loading/product-loading.component';
import { MyStoreComponent } from './my-store.component';
import { LoadProductComponent } from '../LoadProduct/load-product/load-product.component';
import { FormBanckProductSyncComponent } from '../sincronizacion/components/form-banck-product-sync/form-banck-product-sync.component';
import { EditProdutcComponent } from '../components/edit-produtc/edit-produtc.component';
import { EditSincronizacionComponent } from '../sincronizacion/components/edit-sincronizacion/edit-sincronizacion.component';
import { EditProductNoDisponibleComponent } from '../components/edit-product-no-disponible/edit-product-no-disponible.component';
import { DesincronizarComponent } from '../sincronizacion/components/desincronizar/desincronizar.component';

const routes: Routes = [
  // VISTAS ADMINISTRATIVAS DEL STORE //
  {
    path: '',
    component: MyStoreComponent,
    canActivate: [LoginGuardGuard, VerifyTokenGuard],
    children: [
      {
        path: 'contact',
        component: ContactComponent,
      },
      { path: 'product-catalogue', component: LoadProductComponent },
      {
        path: 'load-product',
        component: ProductLoadingComponent,
      },
      {
        path: 'sync-this-product/:id',
        component: FormBanckProductSyncComponent,
      },
      {
        path: 'edit-product-sync/:id',
        component: EditSincronizacionComponent,
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
          import('../sincronizacion/sincronizacion.module').then(
            (module) => module.SincronizacionModule
          ),
      },

      { path: '**', pathMatch: 'full', redirectTo: 'contact' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoreRoutingModule {}
