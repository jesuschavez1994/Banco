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
import { LoadProductComponent } from './vistas-privadas/LoadProduct/load-product/load-product.component';
import { ViewProductsLoadsComponent } from './vistas-privadas/components/view-products-loads/view-products-loads.component';
import { ExportarListaExcelComponent } from './vistas-privadas/sincronizacion/pages/exportar-lista-excel/exportar-lista-excel.component';
import { SuggestedProductsComponent } from './vistas-privadas/sincronizacion/pages/suggested-products/suggested-products.component';
import { SincronizacionViewsComponent } from './vistas-privadas/sincronizacion/components/sincronizacion-views/sincronizacion-views.component';
// tslint:disable-next-line: max-line-length
import { SynchronizedProductsComponent } from './vistas-privadas/sincronizacion/pages/synchronized-products/synchronized-products.component';
import { BankProductComponent } from './vistas-privadas/sincronizacion/pages/bank-product/bank-product.component';

import { ShoppingCartComponent } from './vistas-publicas/shopping-cart/shopping-cart.component';
import { BusinessDetailComponent } from './vistas-publicas/business-detail/business-detail.component';
import { LoadBanckProductComponent } from './vistas-privadas/Admin/pages/load-banck-product/load-banck-product.component';
import { FormBanckProductSyncComponent } from './vistas-privadas/sincronizacion/components/form-banck-product-sync/form-banck-product-sync.component';
import { EditProdutcComponent } from './vistas-privadas/components/edit-produtc/edit-produtc.component';
import { EditSincronizacionComponent } from './vistas-privadas/sincronizacion/components/edit-sincronizacion/edit-sincronizacion.component';
import { EditProductNoDisponibleComponent } from './vistas-privadas/components/edit-product-no-disponible/edit-product-no-disponible.component';
import { DesincronizarComponent } from './vistas-privadas/sincronizacion/components/desincronizar/desincronizar.component';



const APP_ROUTES: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'admin', component: LoadBanckProductComponent},

    // Christopher Views
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'business-detail', component: BusinessDetailComponent},

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
            {   path: 'product-catalogue',
                component: LoadProductComponent,
            },
            {
                path: 'load-product',
                component: ProductLoadingComponent
            },
            {
                path: 'sync-this-product/:id',
                component: FormBanckProductSyncComponent
            },
            {
                path: 'edit-product-sync/:id',
                component: EditSincronizacionComponent
            },
            {
                path: 'desincronizar/:id',
                component: DesincronizarComponent
            },
            {
                path: 'edit/:id',
                component: EditProdutcComponent
            },
            {
                path: 'edit-product/:id',
                component: EditProductNoDisponibleComponent
            },
            {
                path: 'sincronizacion',
                component: SincronizacionViewsComponent,
                children: [
                    {
                        path: 'exportar-lista-excel',
                        component: ExportarListaExcelComponent
                   },
                   {
                    path: 'suggested-products',
                    component: SuggestedProductsComponent
                    },
                   {
                    path: 'suggested-products-list/:id/:list',
                    component: SuggestedProductsComponent
                    },
                    {
                        path: 'synchronized-products',
                        component: SynchronizedProductsComponent
                    },
                    {
                        path: 'bank-product',
                        component: BankProductComponent
                    }
                ]
            },

            {path: '**', pathMatch: 'full', redirectTo: 'contact'},
        ]
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
