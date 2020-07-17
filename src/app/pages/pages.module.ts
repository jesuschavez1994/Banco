import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading/loading.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { TerminosYCondicionesComponent } from '../views/terminos-ycondiciones/terminos-ycondiciones.component';
import { SearchComponent } from './components/search/SearchComponent';
import { HomeComponent } from './components/home/home.component';
import { BannerTiendaComponent } from './components/banner-tienda/banner-tienda.component';
import { APP_ROUTING } from '../app.routes';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { PipesModule } from '../pipes/pipes.module';
import { PublicViewsComponent } from './components/public-views/public-views.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { FormDataUsuarioComponent } from './form/form-data-usuario/form-data-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        LoadingComponent,
        TerminosCondicionesComponent,
        TerminosYCondicionesComponent,
        SearchComponent,
        HomeComponent,
        BannerTiendaComponent,
        DetalleProductoComponent,
        PublicViewsComponent,
        FormDataUsuarioComponent,
        LoginUsuarioComponent,
    ],
    exports: [],
    imports : [
        BrowserModule,
        APP_ROUTING,
        PipesModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})

export class PagesModule { }
