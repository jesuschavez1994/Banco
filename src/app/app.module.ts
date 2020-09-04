import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios //
import { HttpClientModule  } from '@angular/common/http';
// Rutas //
import { APP_ROUTING } from './app.routes';

// Modulos Personalizados//
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './pipes/pipes.module';

import { ServiceModule } from './services/service.module';
import { FormularioRegisterModule } from './form-register/formulario-register.module';
import { VistasPublicasModule } from './vistas-publicas/vistas-publicas.module';
import { LoginModule } from './Login/login.module';

// ngrx => PATRÓN REDUX//
import { StoreModule } from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers } from './app.reducer';
import { AccountComponent } from './vistas-privadas/account/account.component';
import { VIEW_ROUTING } from './vistas-privadas/view.routes';
import { InterceptorService } from './services/Interceotores/interceptor.service';
import { PrivateviewModule } from './vistas-privadas/privateview.module';

// Angular material //
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PipesModule,
    APP_ROUTING,
    VIEW_ROUTING,
    PagesModule,
    SharedModule,
    ServiceModule,
    FormularioRegisterModule,
    VistasPublicasModule,
    PrivateviewModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14'
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
