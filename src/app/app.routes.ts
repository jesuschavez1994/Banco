import { RouterModule, Routes } from '@angular/router';
import { PublicViewsComponent } from './pages/components/public-views/public-views.component';
import { TerminosYCondicionesComponent } from './views/terminos-ycondiciones/terminos-ycondiciones.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { LoginUsuarioComponent } from './Login/Logins/login-usuario.component';
// import { RegisterComponent } from './vistas-publicas/Registers/Usuario/register-usuario/register/register.component';
import { FormDataNegocioComponent } from './form-register/form-data-negocio/form-data-negocio.component';
import { DashboardComponent } from './vistas-privadas/dashboard/dashboard.component';
import { HomeComponent } from './vistas-publicas/home/home.component';
import { RegisterComponent } from './vistas-publicas/Registers/Usuario/register.component';
import { RutStoreComponent } from './form-register/rut-store/rut-store.component';
import { RutStoreGoogleComponent } from './form-register/rut-store-google/rut-store-google.component';
import { AccountComponent } from './vistas-privadas/account/account.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';


const APP_ROUTES: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},

    {   path: 'register-negocio',
        component: FormDataNegocioComponent,
    },

    {   path: 'rut-store',
        component: RutStoreComponent,
    },

    {   path: 'account',
        component: AccountComponent,
        canActivate: [ LoginGuardGuard ],
    },

    {   path: 'rut-store-google',
        component: RutStoreGoogleComponent,
    },


    {path: 'login-usuario', component: LoginUsuarioComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'terminos-ycondiciones', component: TerminosYCondicionesComponent},
    {
        path: 'public-views',
        component: PublicViewsComponent,
        children: [
            { path: 'detalle-producto/:id', component: DetalleProductoComponent},
        ]
    },
    // { path: 'detalle-producto/:id', component: ViewProductoComponent},

    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
