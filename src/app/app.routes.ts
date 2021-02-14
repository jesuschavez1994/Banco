import { RouterModule, Routes } from '@angular/router';
import { PublicViewsComponent } from './pages/components/public-views/public-views.component';
import { TerminosYCondicionesComponent } from './views/terminos-ycondiciones/terminos-ycondiciones.component';
import { FormDataNegocioComponent } from './form-register/form-data-negocio/form-data-negocio.component';

import { RutStoreComponent } from './form-register/rut-store/rut-store.component';
import { AccountComponent } from './vistas-privadas/account/pages/settings/views/my-account/account.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { ContactComponent } from './vistas-privadas/contact/contact.component';
import { ContactInformationEditComponent } from './vistas-privadas/components/contact-information-edit/contact-information-edit.component';
import { ProductLoadingComponent } from './vistas-privadas/product-loading/product-loading.component';
import { MyStoreComponent } from './vistas-privadas/pages/my-store/my-store.component';
import { ProductLoadingSmartComponent } from './vistas-privadas/product-loading/container/product-loading-smart/product-loading-smart.component';
import { LoadProductComponent } from './vistas-privadas/LoadProduct/load-product/load-product.component';
import { ViewProductsLoadsComponent } from './vistas-privadas/components/view-products-loads/view-products-loads.component';
import { ExportarListaExcelComponent } from './vistas-privadas/sincronizacion/pages/exportar-lista-excel/exportar-lista-excel.component';
import { SuggestedProductsComponent } from './vistas-privadas/sincronizacion/pages/suggested-products/suggested-products.component';
import { SincronizacionViewsComponent } from './vistas-privadas/sincronizacion/components/sincronizacion-views/sincronizacion-views.component';
// tslint:disable-next-line: max-line-length
import { SynchronizedProductsComponent } from './vistas-privadas/sincronizacion/pages/synchronized-products/synchronized-products.component';
import { BankProductComponent } from './vistas-privadas/sincronizacion/pages/bank-product/bank-product.component';

import { BusinessDetailComponent } from './vistas-publicas/business-detail/business-detail.component';
import { LoadBanckProductComponent } from './vistas-privadas/Admin/pages/load-banck-product/load-banck-product.component';
import { FormBanckProductSyncComponent } from './vistas-privadas/sincronizacion/components/form-banck-product-sync/form-banck-product-sync.component';
import { EditProdutcComponent } from './vistas-privadas/components/edit-produtc/edit-produtc.component';
import { EditSincronizacionComponent } from './vistas-privadas/sincronizacion/components/edit-sincronizacion/edit-sincronizacion.component';
import { EditProductNoDisponibleComponent } from './vistas-privadas/components/edit-product-no-disponible/edit-product-no-disponible.component';
import { DesincronizarComponent } from './vistas-privadas/sincronizacion/components/desincronizar/desincronizar.component';
import { LoginComponent } from './vistas-publicas/login/login/login.component';
import { EditProductBankComponent } from './vistas-privadas/Admin/pages/container/edit-product-bank/edit-product-bank.component';
import { SettingsComponent } from './vistas-privadas/account/settings.component';

// FORm USER //
import { ViewFormAccountUserComponent } from './vistas-privadas/AccountUser/pages/view-form-account-user.component';
import { FormAccountUserComponent } from './vistas-privadas/AccountUser/pages/settings/views/form-account-user/form-account-user.component';

export const APP_ROUTES: Routes = [
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
      import('./vistas-publicas/panel/panel.module').then((m) => m.PanelModule),
    // canLoad: [ LoginGuardGuard ],
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'business-detail/:idStore', // Se obtiene el id de la tienda para mostrar su listo productos
    component: BusinessDetailComponent,
  },

  // Christopher Views //

  { path: 'store-registration', component: FormDataNegocioComponent },

  { path: 'rut-store', component: RutStoreComponent },

  // STORE //
  {
    path: 'account',
    component: SettingsComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'settings',
        loadChildren: () =>
          import(
            './vistas-privadas/account/pages/settings/account-settings.module'
          ).then((module) => module.AccountSettingsModule),
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
    canActivate: [LoginGuardGuard],
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
    canActivate: [LoginGuardGuard],
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

      { path: '**', pathMatch: 'full', redirectTo: 'contact' },
    ],
  },

  { path: '**', pathMatch: 'full', redirectTo: 'page-under-construction' },
];
