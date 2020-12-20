import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
/// IMPORTACIONES VISTAS PRIVADAS ////
import { MyStoreComponent } from './pages/my-store/my-store.component';
import { ContactComponent } from './contact/contact.component';
import { LoadProductComponent } from './LoadProduct/load-product/load-product.component';
import { ProductLoadingComponent } from './product-loading/product-loading.component';
import { FormBanckProductSyncComponent } from './sincronizacion/components/form-banck-product-sync/form-banck-product-sync.component';
import { EditSincronizacionComponent } from './sincronizacion/components/edit-sincronizacion/edit-sincronizacion.component';
import { DesincronizarComponent } from './sincronizacion/components/desincronizar/desincronizar.component';
import { EditProdutcComponent } from './components/edit-produtc/edit-produtc.component';
import { EditProductNoDisponibleComponent } from './components/edit-product-no-disponible/edit-product-no-disponible.component';
import { SincronizacionViewsComponent } from './sincronizacion/components/sincronizacion-views/sincronizacion-views.component';
import { ExportarListaExcelComponent } from './sincronizacion/pages/exportar-lista-excel/exportar-lista-excel.component';
import { SuggestedProductsComponent } from './sincronizacion/pages/suggested-products/suggested-products.component';
import { SynchronizedProductsComponent } from './sincronizacion/pages/synchronized-products/synchronized-products.component';
import { BankProductComponent } from './sincronizacion/pages/bank-product/bank-product.component';





const ROUTES_VIEW_STORE: Routes = [

    // {   path: 'account',
    //     component: AccountComponent,
    //     canActivate: [ LoginGuardGuard ],
    // },

    // {
    //     path: 'my-store',
    //     component: MyStoreComponent,
    //     canActivate: [ LoginGuardGuard ],
    //     children: [
    //         {
    //             path: 'contact',
    //             component: ContactComponent,
    //         },
    //         {   path: 'product-catalogue',
    //             component: LoadProductComponent,
    //         },
    //         {
    //             path: 'load-product',
    //             component: ProductLoadingComponent
    //         },
    //         {
    //             path: 'sync-this-product/:id',
    //             component: FormBanckProductSyncComponent
    //         },
    //         {
    //             path: 'edit-product-sync/:id',
    //             component: EditSincronizacionComponent
    //         },
    //         {
    //             path: 'desincronizar/:id',
    //             component: DesincronizarComponent
    //         },
    //         {
    //             path: 'edit/:id',
    //             component: EditProdutcComponent
    //         },
    //         {
    //             path: 'edit-product/:id',
    //             component: EditProductNoDisponibleComponent
    //         },
    //         {
    //             path: 'sincronizacion',
    //             component: SincronizacionViewsComponent,
    //             children: [
    //                 {
    //                     path: 'exportar-lista-excel',
    //                     component: ExportarListaExcelComponent
    //                },
    //                {
    //                 path: 'suggested-products',
    //                 component: SuggestedProductsComponent
    //                 },
    //                {
    //                 path: 'suggested-products-list/:id/:list',
    //                 component: SuggestedProductsComponent
    //                 },
    //                 {
    //                     path: 'synchronized-products',
    //                     component: SynchronizedProductsComponent
    //                 },
    //                 {
    //                     path: 'bank-product',
    //                     component: BankProductComponent
    //                 }
    //             ]
    //         },

    //         {path: '**', pathMatch: 'full', redirectTo: 'contact'},
    //     ]
    // },

];

export const ROUTING_VIEW_PRIVATE_STORE = RouterModule.forRoot(ROUTES_VIEW_STORE);
