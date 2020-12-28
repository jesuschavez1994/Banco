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
import { AccountComponent } from './vistas-privadas/account/account.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { ContactComponent } from './vistas-privadas/contact/contact.component';
import { ContactInformationEditComponent } from './vistas-privadas/components/contact-information-edit/contact-information-edit.component';
import { ProductLoadingComponent } from './vistas-privadas/product-loading/product-loading.component';
import { MyStoreComponent } from './vistas-privadas/pages/my-store/my-store.component';
import { ProductLoadingSmartComponent } from './vistas-privadas/product-loading/container/product-loading-smart/product-loading-smart.component';
import { BusinessDetailComponent } from './vistas-publicas/business-detail/business-detail.component';


const APP_ROUTES: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},

    // Christopher Views
    {
      path: 'panel',
      loadChildren: () => import('./vistas-publicas/panel/panel.module').then( m => m.PanelModule)
    },
    {
      path: 'business-detail/:idStore', // Se obtiene el id de la tienda para mostrar su listo productos
      component: BusinessDetailComponent
    },
    {
      path: 'business-detail/:idStore/:show', // Se obtiene el id de la tienda para mostrar su listo productos
      component: BusinessDetailComponent,
    },
    {
      path: 'business-detail/:idStore/:show/:idProduct', // Se obtiene el id de la tienda para mostrar su listo productos
      component: BusinessDetailComponent,
    },

    // Christopher Views //

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

    // VISTAS ADMINISTRATIVAS DEL STORE //

    {
        path: 'my-store',
        component: MyStoreComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            {
                path: 'contact',
                component: ContactComponent,
            },
            {
                path: 'product-loading',
                component: ProductLoadingComponent
            },

            {path: '**', pathMatch: 'full', redirectTo: 'contact'},
        ]
    },

    // {   path: 'contact',
    //     component: ContactComponent,
    //     canActivate: [ LoginGuardGuard ],
    //     children: [
    //         { path: 'contact-information-edit', component: ContactInformationEditComponent},
    //     ]
    // },

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
