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
import { RutStoreComponent } from '../form-register/rut-store/rut-store.component';
import { FormDataNegocioComponent } from '../form-register/form-data-negocio/form-data-negocio.component';
import { LoadBanckProductComponent } from './Admin/pages/load-banck-product/load-banck-product.component';
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
    loadChildren: () =>
      import('./my-store/my-store.module').then(
        (module) => module.MyStoreModule
      ),
    canActivate: [LoginGuardGuard, VerifyTokenGuard],
  },
];
