import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';

const ROUTES_VIEW_STORE: Routes = [
  // {   path: 'account',
  // component: AccountComponent,
  // },
];

export const ROUTING_VIEW_STORE = RouterModule.forChild(ROUTES_VIEW_STORE);
