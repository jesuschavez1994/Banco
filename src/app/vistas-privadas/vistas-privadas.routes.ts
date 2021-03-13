import { Routes } from '@angular/router';
/* 
  Services
*/
import { LoginGuardGuard } from '@services/guards/login-guard.guard';
import { VerifyTokenGuard } from '@services/guards/verify-token.guard';
/* 
  Components used in the views.
*/
import { RutStoreComponent } from '../form-register/rut-store/rut-store.component';
import { FormDataNegocioComponent } from '../form-register/form-data-negocio/form-data-negocio.component';

// FORM USER //
import { ViewFormAccountUserComponent } from './AccountUser/pages/view-form-account-user.component';
import { FormAccountUserComponent } from './AccountUser/pages/settings/views/form-account-user/form-account-user.component';

export const ROUTES: Routes = [
  {
    path: 'admin',
    pathMatch: 'full',
    loadChildren: () =>
      import('./Admin/admin.module').then((module) => module.AdminModule),
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
    loadChildren: () =>
      import('./account/account.module').then((module) => module.AccountModule),
    canActivate: [LoginGuardGuard, VerifyTokenGuard],
  },

  // USER //
  {
    path: 'account',
    component: ViewFormAccountUserComponent,
    canActivate: [LoginGuardGuard, VerifyTokenGuard],

    children: [
      {
        path: 'settings-user',
        component: FormAccountUserComponent,
        data: { title: 'Mi cuenta | Founduss' },
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
