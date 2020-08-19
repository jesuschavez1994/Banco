import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';


const VIEW_ROUTES: Routes = [

    // {   path: 'account',
    // component: AccountComponent,
    // },

];

export const VIEW_ROUTING = RouterModule.forRoot(VIEW_ROUTES, {useHash: true});
