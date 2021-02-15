import { Routes } from '@angular/router';
/* 
  Services
*/
import { LoginGuardGuard } from '@services/guards/login-guard.guard';
import { VerifyTokenGuard } from '@services/guards/verify-token.guard';
/* 
  Components used in the views.
*/
import { AccountComponent } from './account/pages/settings/views/my-account/account.component';
import { ContactComponent } from './contact/contact.component';
import { ContactInformationEditComponent } from './components/contact-information-edit/contact-information-edit.component';
import { RutStoreComponent } from '../form-register/rut-store/rut-store.component';
import { FormDataNegocioComponent } from '../form-register/form-data-negocio/form-data-negocio.component';
import { ProductLoadingComponent } from './product-loading/product-loading.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { ProductLoadingSmartComponent } from './product-loading/container/product-loading-smart/product-loading-smart.component';
import { LoadProductComponent } from './LoadProduct/load-product/load-product.component';
import { ViewProductsLoadsComponent } from './components/view-products-loads/view-products-loads.component';
import { ExportarListaExcelComponent } from './sincronizacion/pages/exportar-lista-excel/exportar-lista-excel.component';
import { SuggestedProductsComponent } from './sincronizacion/pages/suggested-products/suggested-products.component';
import { SincronizacionViewsComponent } from './sincronizacion/components/sincronizacion-views/sincronizacion-views.component';
// tslint:disable-next-line: max-line-length
import { SynchronizedProductsComponent } from './sincronizacion/pages/synchronized-products/synchronized-products.component';
import { BankProductComponent } from './sincronizacion/pages/bank-product/bank-product.component';
import { LoadBanckProductComponent } from './Admin/pages/load-banck-product/load-banck-product.component';
import { FormBanckProductSyncComponent } from './sincronizacion/components/form-banck-product-sync/form-banck-product-sync.component';
import { EditProdutcComponent } from './components/edit-produtc/edit-produtc.component';
import { EditSincronizacionComponent } from './sincronizacion/components/edit-sincronizacion/edit-sincronizacion.component';
import { EditProductNoDisponibleComponent } from './components/edit-product-no-disponible/edit-product-no-disponible.component';
import { DesincronizarComponent } from './sincronizacion/components/desincronizar/desincronizar.component';
import { EditProductBankComponent } from './Admin/pages/container/edit-product-bank/edit-product-bank.component';
import { SettingsComponent } from './account/settings.component';

// FORM USER //
import { ViewFormAccountUserComponent } from './AccountUser/pages/view-form-account-user.component';
import { FormAccountUserComponent } from './AccountUser/pages/settings/views/form-account-user/form-account-user.component';

export const ROUTES: Routes = [
  {
    path: 'admin',
    component: LoadBanckProductComponent,
    children: [
      {
        path: 'edit-bank-admin/:id',
        component: EditProductBankComponent,
      },
    ],
  },

  // Christopher Views
  {
    path: 'panel',
    loadChildren: () =>
      import('../vistas-publicas/panel/panel.module').then(
        (m) => m.PanelModule
      ),
    // canLoad: [ LoginGuardGuard ],
    canActivate: [LoginGuardGuard, VerifyTokenGuard],
  },

  // Christopher Views //
  { path: 'store-registration', component: FormDataNegocioComponent },
  { path: 'rut-store', component: RutStoreComponent },

  // STORE //
  {
    path: 'account',
    component: SettingsComponent,
    canActivate: [LoginGuardGuard, VerifyTokenGuard],
    children: [
      {
        path: 'settings',
        loadChildren: () =>
          import('./account/pages/settings/account-settings.module').then(
            (module) => module.AccountSettingsModule
          ),
      },
      {
        path: 'form-account',
        component: AccountComponent,
      },
    ],
  },

  // USER //
  {
    path: 'account',
    component: ViewFormAccountUserComponent,
    canActivate: [LoginGuardGuard, VerifyTokenGuard],
    children: [
      {
        path: 'setting-user',
        component: FormAccountUserComponent,
      },
    ],
  },

  // VISTAS ADMINISTRATIVAS DEL STORE //
  {
    path: 'my-store',
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
          import('./sincronizacion/sincronizacion.module').then(
            (module) => module.SincronizacionModule
          ),
        /*         component: SincronizacionViewsComponent,
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
        ], */
      },

      { path: '**', pathMatch: 'full', redirectTo: 'contact' },
    ],
  },
];
