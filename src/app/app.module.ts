import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Servicios //
import { HttpClientModule } from '@angular/common/http';
// Rutas //
import { APP_ROUTING } from './app.routes';
// Modulos Personalizados//
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    APP_ROUTING,
    PagesModule,
    SharedModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
