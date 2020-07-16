import { RouterModule, Routes } from '@angular/router';
import { PublicViewsComponent } from './components/public-views/public-views.component';
import { ViewProductoComponent } from './components/public-views/view-producto.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { TerminosYCondicionesComponent } from './views/terminos-ycondiciones/terminos-ycondiciones.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { HomeComponent } from './components/home/home.component';



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
