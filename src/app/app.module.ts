import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicViewsComponent } from './components/public-views/public-views.component';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { SearchComponent } from './components/search/search.component';
import { LoadingComponent } from './components/loading/loading.component';
import { APP_ROUTING } from './app.routes';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { ViewProductoComponent } from './components/public-views/view-producto.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BannerTiendaComponent } from './components/banner-tienda/banner-tienda.component';
import { FormDataUsuarioComponent } from './components/form-data-usuario/form-data-usuario.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { TerminosYCondicionesComponent } from './views/terminos-ycondiciones/terminos-ycondiciones.component';
import { CategoriasComponent } from './components/categorias/categorias.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewProductoComponent,
    TerminosYCondicionesComponent,
    PublicViewsComponent,
    SearchComponent,
    LoadingComponent,
    DetalleProductoComponent,
    NavbarComponent,
    HomeComponent,
    BannerTiendaComponent,
    FormDataUsuarioComponent,
    LoginUsuarioComponent,
    TerminosCondicionesComponent,
    CategoriasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    APP_ROUTING,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
