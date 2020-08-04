import { RouterModule, Routes } from '@angular/router';
import { PublicViewsComponent } from './pages/components/public-views/public-views.component';
import { TerminosYCondicionesComponent } from './views/terminos-ycondiciones/terminos-ycondiciones.component';
import { DetalleProductoComponent } from './pages/components/detalle-producto/detalle-producto.component';
import { HomeComponent } from './pages/components/home/home.component';
import { LoginUsuarioComponent } from './pages/components/login-usuario/login-usuario.component';
import { RegisterComponent } from './pages/components/login-usuario/register-usuario/register/register.component';
import { FormDataNegocioComponent } from './pages/form/form-data-negocio/form-data-negocio.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';






const APP_ROUTES: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'register-negocio', component: FormDataNegocioComponent},
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
