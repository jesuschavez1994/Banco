import { RouterModule, Routes } from '@angular/router';
import { PublicViewsComponent } from './pages/components/public-views/public-views.component';
import { LoginUsuarioComponent } from './pages/components/login-usuario/login-usuario.component';
import { TerminosYCondicionesComponent } from './views/terminos-ycondiciones/terminos-ycondiciones.component';
import { DetalleProductoComponent } from './pages/components/detalle-producto/detalle-producto.component';
import { HomeComponent } from './pages/components/home/home.component';



const APP_ROUTES: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'login-usuario', component: LoginUsuarioComponent},
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
